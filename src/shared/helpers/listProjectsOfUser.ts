import {query} from '../../config/db';

export interface Project {
    id: string;
    name: string;
}

export async function listProjectsOfUser(userEmail: string): Promise<Project[] | undefined> {
    try {
        return query<Project[]>(
            `SELECT projects.id, projects.name FROM projects INNER JOIN \`groups\` ON projects.group_id = \`groups\`.id
                    INNER JOIN groups_users ON groups_users.group_id = \`groups\`.id 
                    INNER JOIN users ON groups_users.user_id = users.id WHERE users.email = ?`,
            [userEmail]
        );
    } catch(e) {
        // todo
    }
}
