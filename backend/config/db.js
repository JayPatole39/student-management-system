const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const pool = process.env.DATABASE_URL
  ? mysql.createPool({ 
      uri: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
      multipleStatements: true
    })
  : mysql.createPool({
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3307,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'root',
      database: process.env.DB_NAME || 'student_management_db',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });

const promisePool = pool.promise();

pool.getConnection((err, connection) => {
  if (err) {
    console.error('❌ Database Connection Error:', err.message);
  } else {
    console.log('✅ Connected to MySQL Database (student_management_db) successfully!');
    connection.release();
  }
});

module.exports = promisePool;
