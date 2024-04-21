import { User } from "@/types/user";
import { getDb } from "@/models/db";
import { genSnowId } from "@/lib/utils";

export async function insertUser(user: User) {
  const now: string = new Date().toISOString();

  const db = await getDb();
  const res = await db.query(
    `INSERT INTO users 
      (public_id, email, nickname, avatar_url, created_at, updated_at) 
      VALUES 
      ($1, $2, $3, $4, $5, $6)
    `,
    [ genSnowId(), user.email, user.nickname, user.avatar_url, now, now]
  );

  return res;
}

export async function findUserByEmail(
  email: string
): Promise<User | undefined> {
  const db = getDb();
  const res = await db.query(`SELECT * FROM users WHERE email = $1 LIMIT 1`, [
    email,
  ]);
  if (res.rowCount === 0) {
    return undefined;
  }

  const { rows } = res;
  const row = rows[0];
  const user: User = {
    publicId: row.public_id,
    email: row.email,
    nickname: row.nickname,
    avatar_url: row.avatar_url,
    created_at: row.created_at,
  };

  return user;
}
