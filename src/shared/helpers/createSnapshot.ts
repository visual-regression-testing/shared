import {InsertResponse, query} from "../../config/db";

export async function createSnapshot(metadata: Object): Promise<InsertResponse> {
    return query(
        `INSERT INTO snapshots (metadata) VALUES (?)`,
        [JSON.stringify(metadata)]
    )
}
