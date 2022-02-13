import AWS from "aws-sdk";
import {PassThrough} from "stream";
import formidable from "formidable";
import {NextApiRequest} from "next";
import {ManagedUpload} from "aws-sdk/clients/s3";
import {s3Upload} from "./s3Upload";

// todo can we do better than https://github.com/node-formidable/formidable/blob/master/examples/store-files-on-s3.js
// todo this is not a very good implementation but it's semi functional
export function uploadToS3(req: NextApiRequest, bucket: string): Promise<void> {
    if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
        throw new Error('AWS params not set');
    }

    const { 'x-test-name': testName, 'x-project': project, 'x-branch': branch, 'x-branch-to-compare-against': branchToCompareAgainst } = req.headers;

    if (!testName || testName.includes('/' || !project || !branch || !branchToCompareAgainst)) {
        throw new Error('Required header missing or bad variable');
    }

    const s3Client = new AWS.S3();
    const acceptableMimeTypes = ['image/jpeg', 'image/png'];

    function uploadStream (file: any) {
        if (!file.mimetype || !acceptableMimeTypes.includes(file?.mimetype)) {
            throw new Error('File does not have correct Mime Type')
        }

        const pass = new PassThrough();


        s3Upload(bucket, `${project}/${branchToCompareAgainst}/${branch}/${testName}.jpg`, pass);

        return pass;
    };

    return new Promise((resolve, reject) => {
        const form = formidable({
            filter: function ({name, originalFilename, mimetype}) {
                // keep only images
                return !!mimetype && mimetype.includes("image");
            },
            fileWriteStreamHandler: uploadStream as any,
            maxFileSize: 5 * 1024 * 1024 // 5mb
        });

        (form as any).parse(req);
        form.on('error',  (message) => reject(message));
        form.once('end', () => resolve());
    })
}
