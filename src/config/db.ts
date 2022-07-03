import mysql, {OkPacket, RowDataPacket} from 'mysql2'

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

type dbDefaults = RowDataPacket[] | RowDataPacket[][] | OkPacket[] | OkPacket;
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
