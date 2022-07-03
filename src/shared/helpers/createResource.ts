import {query} from '../../config/db';
import {ResultSetHeader} from 'mysql2';

// todo what's the response of an already existing resource? (for not undefined)
export async function createResource(hashId: string, base64Content: string): Promise<[ResultSetHeader, any] | undefined> {
    // it's possible this resource exists therefore we just ignore and move on
    return query(
        'INSERT INTO resources (hash_id, base64_content) VALUES (?, ?) ON DUPLICATE KEY UPDATE base64_content=base64_content',
        [hashId, base64Content]
    );
}
