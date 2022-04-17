// @ts-ignore
import {AWSError} from 'aws-sdk';
import {s3PutObjects} from './s3PutObject';
const sizeOf = require('buffer-image-size');

const AWS = require('aws-sdk');
const config = require('../../config/config').default;

const PNG = require('pngjs').PNG;
const pixelmatch = require('pixelmatch');

async function compareImages(filename: string, pathToBaselineImage: string, pathtoNewImage: string, baseDiffFolder: string) {
    const s3 = new AWS.S3();

    const params = {
        Bucket: config.bucket,
        Key: pathToBaselineImage + '/' + filename,
    };

    const params2 = {
        Bucket: config.bucket,
        Key: pathtoNewImage + '/' + filename,
    };

    const imageBaseline: any = await new Promise((resolve, reject) => {
        s3.getObject(params, (err: AWSError, data: any) => {
            if (err) {
                reject(err);
            }

            if (data) {
                console.log('got data', data);
                resolve(data);
            }
        });
    });

    const imageNewBranch: any = await new Promise((resolve, reject) => {
        s3.getObject(params2, (err: AWSError, data: any) => {
            if (err) {
                reject(err);
            }

            if (data) {
                console.log('got data', data);
                resolve(data);
            }
        });
    });

    const {width, height} = sizeOf(imageBaseline.Body) as {width: number, height: number};
    const img1 = PNG.sync.read(imageBaseline.Body);
    const img2 = PNG.sync.read(imageNewBranch.Body);
    const diff = new PNG({width, height});

    pixelmatch(img1.data, img2.data, diff.data, width, height, {threshold: 0.1});

    // writes the file locally
    // fs.writeFileSync('diff.png', PNG.sync.write(diff));

    await s3PutObjects(config.bucket, `${baseDiffFolder}/diff/${filename}`, PNG.sync.write(diff));
    return diff;
}

// (async() => {
//     // todo this is test code
//     await compareImages('unknown.png', `mike/master`, `mike/master/testBranch`, 'mike/master/testBranch');
// })();

