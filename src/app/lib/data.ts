import { Generated, Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';

const pool = new Pool({
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  database: process.env.DATABASE_NAME,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
});

interface Database {
  gallery: {
    id: string;
    title: string;
    category: string;
    location: string;
    time: string;
    size: string;
    base64: string;
    tags: string[]
  };
  downloads: {
    id: Generated<number>;
    image_id: string;
    user_ip: string;
    country: string
    downloaded_at: Generated<Date>;
  }
}

const db = new Kysely<Database>({
  dialect: new PostgresDialect({
    pool,
  }),
});

export default db;
