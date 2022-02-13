import mysql from 'serverless-mysql'

export const db = mysql({
    config: {
        host: process.env.MYSQL_HOST,
        database: process.env.MYSQL_DATABASE,
        user: process.env.MYSQL_USERNAME,
        password: process.env.MYSQL_PASSWORD,
        port: parseInt(process.env.MYSQL_PORT as string, 10),
    },
});

export interface InsertResponse {
    fieldCount: number; // 0
    affectedRows: number; // 1
    insertId: number; // 18
    serverStatus: number; // 2
    warningCount: number; // 0
    message: string; // ''
    protocol41: boolean; // true
    changedRows: number; // 0
}

export async function query<T>(
    q: string,
    values: (string | number)[] | string | number = []
) {
    try {
        const results = await db.query<T>(q, values);
        await db.end();
        return results;
    } catch (e) {
        throw Error((e as any).message)
    }
}
