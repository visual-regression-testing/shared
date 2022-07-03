import {query} from '../../config/db';
import {Project} from './listProjectsOfUser';

interface Resource {
    id: string;
    hash_id: string;
    base64_content: string;
}

export async function getResources(resourceHashIds: string[]): Promise<Resource[]> {
    const parameterizedQuery = new Array(resourceHashIds.length).fill('?').join(', ');

    return query<Resource[]>(
        `SELECT * FROM resources WHERE hash_id IN (${parameterizedQuery})`,
        resourceHashIds
    );
}
