import { RowDataPacket } from 'mysql2';
import { query } from '../../config/db';

export interface PercyBuild extends RowDataPacket {
  id: number;
}

export async function createBuildByPercyToken(
  percyToken: string,
  branch: string,
  targetBranch: string | null,
): Promise<PercyBuild[] | undefined> {
  let projectId: { id: number | null }[] = [{ id: null }];
  try {
    projectId = await query<{ id: number }[]>(
      'SELECT id from projects WHERE percy_token = ? LIMIT 1',
      [percyToken],
    );
  } catch (e) {
    // todo
    throw new Error('could not query for project');
  }

  if (projectId[0].id) {
    try {
      await query<unknown>(
        'INSERT into builds (project_id, baseline_branch, branch) VALUES (?, ?, ?)',
        [projectId[0].id, targetBranch as string, branch],
      );

      return query<PercyBuild[]>('SELECT LAST_INSERT_ID() as id');
    } catch (e) {
      // todo
    }
  } else {
    throw new Error('could not create build');
  }
}
