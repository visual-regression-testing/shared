import {query} from "../../config/db";
import {Project} from "./listProjectsOfUser";

export async function getProjectyId(projectId: number): Promise<Project[] | undefined> {
    try {
        return query<Project[]>(
            `SELECT name FROM projects WHERE id = ?`,
            [projectId]
        )
    } catch(e) {
        // todo
    }
}
