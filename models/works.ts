import { QueryResult, QueryResultRow } from "pg";

import { Works } from "@/types/works";
import { getDb } from "./db";
import { generatePresignedUrl } from "@/lib/s3";

export async function insertWorks(works: Works) {
  const db = getDb();
  const res = await db.query(
    `INSERT INTO works 
        (public_id, user_id, remote_task_id, img_description, resolution, image_url, created_at, updated_at) 
        VALUES 
        ($1, $2, $3, $4, $5, $6, $7, $8)
    `,
    [
      works.publicId,
      works.user_id,
      works.remote_taskId,
      works.img_description,
      works.resolution,
      works.image_url,
      works.created_at,
      works.updated_at,
    ]
  );

  return res;
}

export async function getWallpapersCount(): Promise<number> {
  const db = getDb();
  const res = await db.query(`SELECT count(1) as count FROM works`);
  if (res.rowCount === 0) {
    return 0;
  }

  const { rows } = res;
  const row = rows[0];

  return row.count;
}

export async function getUserWallpapersCount(
  user_email: string
): Promise<number> {
  const db = getDb();
  const res = await db.query(
    `SELECT count(1) as count FROM works WHERE user_email = $1`,
    [user_email]
  );
  if (res.rowCount === 0) {
    return 0;
  }

  const { rows } = res;
  const row = rows[0];

  return row.count;
}

export async function listWorks(
  page: number,
  limit: number
): Promise<Works[] | undefined> {
  if (page < 1) {
    page = 1;
  }
  if (limit <= 0) {
    limit = 50;
  }
  const offset = (page - 1) * limit;

  const db = getDb();
  const res = await db.query(
    `select w.*, u.email as user_email, u.nickname as user_name, u.avatar_url as user_avatar from works as w left join users as u on w.user_id = u.public_id order by w.created_at desc limit $1 offset $2`,
    [limit, offset]
  );
  if (res.rowCount === 0) {
    return undefined;
  }

  return await listWorksFromSqlResult(res);

}

export async function listWorksFromSqlResult(
  res: QueryResult<QueryResultRow>
): Promise<Works[]> {
  if (!res.rowCount || res.rowCount === 0) {
    return [];
  }

  const results: Works[] = [];
  const { rows } = res;
  await Promise.all(rows.map(async (row) => {
    const works = await formatWorks(row);
    if (works) {
      results.push(works);
    }
  }));

  return results;
}

export async function formatWorks(row: QueryResultRow): Promise<Works | undefined> {
  console.log('row: ', row);
  let works: Works = {
    id: row.id,
    publicId: row.public_id,
    user_id: row.user_id,
    remote_taskId: row.remote_task_id,
    img_description: row.img_description,
    resolution: row.resolution,
    image_url: row.image_url,
    created_at: row.created_at,
    updated_at: row.updated_at,
  };

  if (row.user_name || row.user_avatar) {
    works.created_user = {
      email: row.email,
      nickname: row.nickname,
      avatar_url: row.user_avatar,
    };
  }

  if (works.image_url) {
    works.image_url = await generatePresignedUrl(
      process.env.AWS_BUCKET || "malette",
      works.image_url,
      60 * 60 * 24
    );
  }

  return works;
}
