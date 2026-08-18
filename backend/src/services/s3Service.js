const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

const s3Client = new S3Client({ region: process.env.AWS_REGION });
const BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;

const generateUploadUrl = async (fileName, fileType) => {
    // Generate a unique file name so users don't overwrite each other's files
    const uniqueFileName = `${Date.now()}-${fileName}`;

    const command = new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: uniqueFileName,
        ContentType: fileType
    });

    // The URL is only valid for 60 seconds!
    const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 60 });

    return {
        uploadUrl,
        fileKey: uniqueFileName,
        fileUrl: `https://${BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${uniqueFileName}`
    };
};

module.exports = {
    generateUploadUrl
};
