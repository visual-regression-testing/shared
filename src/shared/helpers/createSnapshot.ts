import {InsertResponse, query} from '../../config/db';

export async function createSnapshot(metadata: string): Promise<InsertResponse> {
    return query(
        'INSERT INTO snapshots (metadata) VALUES (?)',
        [metadata]
    );
}
