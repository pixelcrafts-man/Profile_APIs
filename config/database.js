import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    require: true,
    rejectUnauthorized: false,
  },
  connectionTimeoutMillis: 5000
});

// Try connecting once so we know it's working
pool.connect()
  .then(client => {
    console.log("✅ Database Connected Successfully!");
    client.release();
  })
  .catch(err => {
    console.error("❌ Database Connection Failed!");
    console.error("Error Message:", err.message);
    console.error("Error Stack:", err.stack);
  });

export default pool;




