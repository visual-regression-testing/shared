import AWS from 'aws-sdk';
import {ListObjectsOutput, ListObjectsRequest} from '@aws-sdk/client-s3';

export async function s3ListObjects(bucket: string, folder = '', otherParams?: Partial<ListObjectsRequest>): Promise<ListObjectsOutput> {
    const s3 = new AWS.S3();
    const params = Object.assign({
        Bucket: bucket,
        Prefix: folder,
    }, otherParams);

    return new Promise((resolve, reject) => {
        s3.listObjects(params, (err, data) => {
            if (err) {
                reject(err);
            }

            if (data) {
                resolve(data);
            }
        });
    });
}
