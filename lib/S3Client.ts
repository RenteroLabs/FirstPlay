import { S3Client } from "@aws-sdk/client-s3";

// Create an Amazon S3 service client object.
const s3Client = new S3Client({
  region: `${process.env.NEXT_PUBLIC_REGION}`,
  apiVersion: "2006-03-01",
  credentials: {
    accessKeyId: `${process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID}`,
    secretAccessKey: `${process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY}`
  }
});

export { s3Client };