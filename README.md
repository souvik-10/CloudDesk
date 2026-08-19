# ☁️ CloudDesk Serverless Support System

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![AWS](https://img.shields.io/badge/AWS-Serverless-FF9900.svg)
![React](https://img.shields.io/badge/React-18.x-61DAFB.svg)
![Node.js](https://img.shields.io/badge/Node.js-20.x-339933.svg)

CloudDesk is a modern, enterprise-grade customer support ticketing system built with a **100% Serverless Architecture** on Amazon Web Services (AWS). It provides a fast, secure, and highly scalable platform for users to submit, track, and resolve support tickets, complete with secure cloud file uploads.

## 🌟 Key Features

- **Stateless Authentication:** Custom JWT-based authentication system with secure route protection.
- **Direct-to-Cloud Uploads:** Implements the **S3 Pre-Signed URL** architecture pattern. Clients bypass the Node.js backend entirely and securely upload heavy image files directly to an AWS S3 bucket.
- **Serverless Compute:** The Express backend is fully wrapped using `serverless-http` and deployed to AWS Lambda, ensuring zero idle server costs and massive scalability.
- **NoSQL Persistence:** Fast, flexible data storage using AWS DynamoDB.
- **Modern UI/UX:** A responsive, premium white-themed frontend built with React (Vite) and modern CSS techniques.

## 🏗️ System Architecture

- **Frontend Hosting:** AWS Amplify (Global CDN)
- **API Gateway:** AWS HTTP API Gateway (Greedy Proxy configuration)
- **Compute:** AWS Lambda (Node.js 20.x runtime)
- **Database:** Amazon DynamoDB (`CloudDeskTickets` table)
- **Object Storage:** Amazon S3 (Configured with strict CORS policies for client-side uploads)

## 🚀 Live Demo

- **Frontend:** *(Replace with your live AWS Amplify URL)*
- **API Base URL:** `https://xc94sskd0j.execute-api.eu-north-1.amazonaws.com`

---

## 💻 Local Development Setup

### Prerequisites
- Node.js (v18+)
- An AWS Account with configured IAM credentials (`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`)

### 1. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:
```env
PORT=3000
AWS_REGION=eu-north-1
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_S3_BUCKET_NAME=your_s3_bucket_name
ADMIN_USERNAME=admin
ADMIN_PASSWORD=supersecretpassword
JWT_SECRET=your_secure_jwt_secret
```

Start the backend:
```bash
npm run dev
# Server runs on http://localhost:3000
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
# Frontend runs on http://localhost:5173
```

---

## 🛠️ Security Implementations
- **Environment Isolation:** Secrets are isolated to the Lambda environment and completely excluded from version control.
- **Pre-Signed URLs:** S3 buckets are restricted from public write access. Uploads require a mathematically signed, time-limited URL (60-second expiration) generated securely by the backend using IAM roles.
- **CORS Protection:** Enforced at both the Express middleware layer and the S3 bucket configuration layer to prevent Cross-Site Scripting (XSS) payload attacks.

---
*Built as a demonstration of modern Serverless Web Application architecture.*
