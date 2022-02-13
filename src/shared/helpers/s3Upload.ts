import {ManagedUpload} from "aws-sdk/clients/s3";
import AWS from "aws-sdk";
import {PassThrough} from "stream";

/**
 * Used for stream upload when someone makes a POST request
 * @param bucket
 * @param path
 * @param pass
 */
export function s3Upload(bucket: string, path: string, pass: PassThrough) {
    const s3Client = new AWS.S3();

    return new Promise((resolve, reject) => {
        s3Client.upload(
            {
                Bucket: bucket,
                Key: path,
                Body: pass,
                ACL: 'public-read'
            },
            (err: Error | null, data: ManagedUpload.SendData) => {
                if (err !== null) {
                    // todo
                    console.error('error occurred on push to S3');
                    reject();
                }

                if (data) {
                    // todo success!
                    console.log('success!')
                    resolve(pass);
                }
            },
        );
    });
}
