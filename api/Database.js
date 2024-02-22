import pg from "pg";
import dot from "dotenv";
dot.config();
const POSTGRES_URL = process.env.POSTGRES_URL;

export const db = new pg.Client({
  connectionString: POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

db.connect()
  .then(() => console.log("connected to database"))
  .catch((err) => console.error(err));
