import mysql, {RowDataPacket} from 'mysql2'

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

type Row = import("mysql2").RowDataPacket;
type Ok = import("mysql2").OkPacket;
type dbDefaults = Row[] | Row[][] | Ok[] | Ok;
type dbQuery<T> = T & dbDefaults;

export async function query<T>(
    q: string,
    values: (string | number)[] | string | number = []
): Promise<[T, any]> {
    try {
        return promisePool.query<dbQuery<T>>(q, values);
    } catch(e) {
        throw new Error(e as any).message;
    }
}
