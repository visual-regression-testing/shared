import {PutObjectOutput} from '@aws-sdk/client-s3';

import AWS from 'aws-sdk';
import {Readable} from 'stream';

/**
 * Used for stream upload when someone makes a POST request
 * @param bucket
 * @param path
 * @param body
 */
export function s3PutObjects(bucket: string, path: string, body: Buffer|Uint8Array|Blob|string|Readable) {
    const s3Client = new AWS.S3();

    return new Promise((resolve, reject) => {
        s3Client.putObject({
                Bucket: bucket,
                Key: path,
                Body: body,
                ACL: 'public-read'
            },
            (err: Error | null, data: PutObjectOutput) => {
                if (err !== null) {
                    // todo
                    console.error('error occurred on push to S3');
                    reject();
                }

                if (data) {
                    // todo success!
                    console.log('success!');
                    resolve(body);
                }
            },
        );
    });
}

