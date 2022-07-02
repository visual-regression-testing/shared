import mysql from 'mysql2'

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const promisePool = pool.promise();

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
        const [rows, /*fields*/] = await promisePool.query(q, values);
        return rows;
    } catch(e) {
        throw new Error(e as any).message;
    }
}
