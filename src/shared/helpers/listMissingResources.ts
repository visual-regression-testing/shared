import {query} from '../../config/db';

export async function listMissingResources(resourceHashIds: string[]): Promise<string[]> {
    const parameterizedQuery = new Array(resourceHashIds.length).fill('?').join(', ');

    const response: { hash_id: string }[] = await query(
        `SELECT hash_id FROM resources WHERE hash_id IN (${parameterizedQuery})`,
        resourceHashIds
    );
    const formattedResponse: string[] = response.map(i => i.hash_id);

    return resourceHashIds.filter((hashId)=> !formattedResponse.includes(hashId));
}


