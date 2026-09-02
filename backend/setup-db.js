const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

async function initDatabase() {
  console.log('🔄 Initializing MySQL Database (student_management_db) on port 3307...');

  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 3307,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'root',
      multipleStatements: true
    });

    console.log('✅ Connected to MySQL Server!');

    const sqlPath = path.join(__dirname, 'database.sql');
    const sqlContent = fs.readFileSync(sqlPath, 'utf8');

    console.log('📦 Executing database schema from database.sql...');
    await connection.query(sqlContent);
    console.log('🎉 Database and sample records created successfully in MySQL!');

    await connection.end();
  } catch (error) {
    console.error('❌ Error executing database script:', error.message);
    process.exit(1);
  }
}

initDatabase();
