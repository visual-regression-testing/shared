import { query } from '../../config/db';
import { ResultSetHeader } from 'mysql2';

export async function createSnapshot(metadata: string): Promise<[ResultSetHeader, any] | undefined> {
  return query('INSERT INTO snapshots (metadata) VALUES (?)', [metadata]);
}
