const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

async function updateAdmin() {
  try {
    const conn = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 3307,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'root',
      database: process.env.DB_NAME || 'student_management_db'
    });

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash('123456', salt);

    await conn.query(
      `INSERT INTO users (name, email, password, role) 
       VALUES ('Jay Patole', 'jaymaheshpatole@gmail.com', ?, 'admin') 
       ON DUPLICATE KEY UPDATE name='Jay Patole', password=?, role='admin'`,
      [hashed, hashed]
    );

    console.log('✅ Admin Jay Patole (jaymaheshpatole@gmail.com) created/updated successfully in database!');
    await conn.end();
  } catch (err) {
    console.error('Error updating admin:', err.message);
  }
}

updateAdmin();
