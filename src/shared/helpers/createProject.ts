import { query } from '../../config/db';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import crypto from 'crypto';

export interface PercyProject extends RowDataPacket {
  id: number;
}

const generateProjectId = () => crypto.randomBytes(30).toString('hex');

export async function createProject(
  projectName: string,
  groupId: number,
  baseBranch = 'master',
): Promise<[ResultSetHeader, any] | undefined> {
  let uniqueId: string | false = false;

  for (let i = 0; i < 10; i++) {
    const unId = generateProjectId();

    const response: PercyProject[] = await query<PercyProject[]>(
      'SELECT id FROM projects WHERE percy_token = ?',
      [unId],
    );

    if (!response) {
      uniqueId = unId;
      break;
    }
  }

  return query(
    'INSERT INTO projects (name, group_id, percy_token, default_base_branch) VALUES (?, ?, ?, ?)',
    [projectName, groupId, uniqueId as string, baseBranch],
  );
}
