import {query} from "../../config/db";

export interface Build {
    id: number;
    branch: string;
    baseline_branch: string;
}

export async function listBuildsOfProject(projectId: number): Promise<Build[] | undefined> {
    try {
        return query<Build[]>(
            `SELECT id, branch, baseline_branch, date_created FROM builds WHERE project_id = ? ORDER BY date_created DESC`,
            [projectId]
        )
    } catch(e) {
        // todo
    }
}
