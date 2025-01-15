import { S3 } from "aws-sdk";
import fs from "fs";

const s3 = new S3({
  region: process.env.REGION, // Replace with your region
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_KEY,
});

export const uploadFile = async (filename: string, localFilePath: string) => {
  console.log("Called");
  const bucketName = process.env.S3_BUCKET_NAME;
  const fileContent = fs.readFileSync(localFilePath);
  const response = await s3
    .upload({
      Body: fileContent,
      Bucket: `${bucketName}`,
      Key: filename,
    })
    .promise();
  console.log(response);
};
