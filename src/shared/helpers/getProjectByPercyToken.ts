import {query} from '../../config/db';
import {Project} from './listProjectsOfUser';

export async function getProjectByPercytToken(percyToken: string): Promise<[Project] | undefined> {
    try {
        return query<[Project]>(
            'SELECT id, name FROM projects WHERE percy_token = ?',
            [percyToken]
        );
    } catch(e) {
        // todo
    }
}
