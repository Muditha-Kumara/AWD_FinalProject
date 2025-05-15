const { Pool } = require("pg");
const fs = require("fs");
const path = require("path");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Function to initialize the database schema
async function initializeSchema() {
  const schemaPath = path.join(__dirname, "../schema.sql");
  const schema = fs.readFileSync(schemaPath, "utf-8");

  try {
    await pool.query(schema);
    console.log("Database schema initialized successfully.");
  } catch (error) {
    console.error("Error initializing database schema:", error);
  }
}

module.exports = { pool, initializeSchema };
