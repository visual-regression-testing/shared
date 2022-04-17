import {query} from '../../config/db';


export async function createBuildByPercyToken(percyToken: string): Promise<any> {
    let projectId: [{ id: number | null }] = [{ id: null }];
    try {
        projectId = await query<[{ id: number }]>(
            'SELECT id from projects WHERE percy_token = ? LIMIT 1', [percyToken]);
    } catch(e) {
        // todo
        throw new Error('could not query for project');
    }

    if (projectId[0].id) {
        try {
            await query<any>(
                'INSERT into builds (project_id) VALUES (?)',
                [projectId[0].id as number]
            );

            // todo not tested
            return query<[{  id: number }]>('SELECT LAST_INSERT_ID() as id');
        } catch(e) {
            // todo
        }
    } else {
        throw new Error('could not create build');
    }
}
