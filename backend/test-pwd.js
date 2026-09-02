const mysql = require('mysql2/promise');

async function test() {
  const pwds = ['root', '1234', '123456', '12345678', 'admin', 'password', 'Shree', 'shree', 'root123', ''];
  for (const p of pwds) {
    try {
      const conn = await mysql.createConnection({ host: '127.0.0.1', port: 3307, user: 'root', password: p });
      console.log('🎉 SUCCESS on port 3307! Working MySQL Password is:', JSON.stringify(p));
      await conn.end();
      return;
    } catch (e) {
      console.log(`Port 3307 - Password [${p}] failed: code=${e.code}, sqlMessage=${e.sqlMessage}`);
    }
  }
}
test();
