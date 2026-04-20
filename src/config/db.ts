import { Pool } from 'pg';

export const pool = new Pool({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "070323",
  database: "test",
});
    





