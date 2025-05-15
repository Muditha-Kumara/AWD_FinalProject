const app = require("./index");
const { initializeSchema } = require("./models/db");

// Initialize the database schema
initializeSchema();

app.listen(3000, "0.0.0.0");
