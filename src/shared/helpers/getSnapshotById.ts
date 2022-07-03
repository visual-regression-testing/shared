import {query} from '../../config/db';

interface Snapshot {
    metadata: string;
}

export async function getSnapshotById(buildId: number): Promise<[Snapshot, any] | undefined> {
    return query<Snapshot>(
        'SELECT * FROM snapshots WHERE id = ? LIMIT 1',
        [buildId]
    );
}
