const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

/**
 * Send Welcome & Registration Success Email
 * - If SMTP_USER + SMTP_PASS are set in .env → sends real Gmail
 * - Otherwise → creates a free Ethereal test account and prints a preview URL in backend console
 */
exports.sendRegistrationEmail = async ({ toEmail, studentName, rollNo, department, semester }) => {
  try {
    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #f1f5f9; margin: 0; padding: 24px; }
        .box { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.08); border: 1px solid #e2e8f0; }
        .head { background: linear-gradient(135deg, #1e1b4b 0%, #4f46e5 100%); padding: 36px 30px; text-align: center; color: #ffffff; }
        .head h1 { margin: 0; font-size: 26px; font-weight: 800; letter-spacing: -0.5px; }
        .head p { margin: 6px 0 0 0; font-size: 13px; color: #c7d2fe; }
        .body { padding: 32px 30px; color: #334155; line-height: 1.6; font-size: 14px; }
        .badge { display: inline-block; background: #ecfdf5; color: #059669; font-weight: 700; font-size: 12px; padding: 6px 14px; border-radius: 20px; margin-bottom: 16px; border: 1px solid #a7f3d0; }
        .table-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 18px 20px; margin: 20px 0; }
        .row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #edf2f7; font-size: 13px; }
        .row:last-child { border-bottom: none; }
        .foot { background: #f8fafc; border-top: 1px solid #e2e8f0; padding: 20px; text-align: center; font-size: 12px; color: #94a3b8; }
      </style>
    </head>
    <body>
      <div class="box">
        <div class="head">
          <h1>🎓 EduManage Pro</h1>
          <p>Student Academic Portal & AI System</p>
        </div>
        <div class="body">
          <span class="badge">✅ Registration Confirmed</span>
          <h2 style="color: #0f172a; margin-top: 0;">Welcome, ${studentName}!</h2>
          <p>Your student profile has been successfully created in the <strong>Student Management System</strong>. You can now log in to your Student Portal to view your semester attendance, CGPA, fees details, and AI study coach.</p>
          
          <div class="table-box">
            <div class="row"><strong>Student Name:</strong> <span>${studentName}</span></div>
            <div class="row"><strong>Roll Number:</strong> <span style="color: #4f46e5; font-weight: 800;">${rollNo}</span></div>
            <div class="row"><strong>Department:</strong> <span>${department}</span></div>
            <div class="row"><strong>Semester:</strong> <span>${semester}</span></div>
            <div class="row"><strong>Email:</strong> <span>${toEmail}</span></div>
          </div>

          <p>Use your registered email and password to sign in anytime at your Student Portal.</p>
        </div>
        <div class="foot">
          <p><strong>EduManage Pro</strong> • Developed by <strong>Jay Patole</strong> • Diploma Final Year Project</p>
        </div>
      </div>
    </body>
    </html>
    `;

    console.log(`\n======================================================`);
    console.log(`📧 [STUDENT REGISTRATION EMAIL]`);
    console.log(`📬 Sending to: ${toEmail}`);
    console.log(`🎓 Student: ${studentName} | Roll: ${rollNo} | Dept: ${department}`);
    console.log(`======================================================\n`);

    let transporter;

    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      // Real Gmail sending
      transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      });

      await transporter.sendMail({
        from: `"EduManage Pro" <${process.env.SMTP_USER}>`,
        to: toEmail,
        subject: `🎓 Registration Successful - EduManage Pro (${rollNo})`,
        html: htmlContent
      });
      console.log(`✅ Real email successfully delivered to: ${toEmail}`);

    } else {
      // Ethereal auto test account - no config needed, works immediately
      const testAccount = await nodemailer.createTestAccount();

      transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass
        }
      });

      const info = await transporter.sendMail({
        from: `"EduManage Pro" <${testAccount.user}>`,
        to: toEmail,
        subject: `🎓 Registration Successful - EduManage Pro (${rollNo})`,
        html: htmlContent
      });

      const previewUrl = nodemailer.getTestMessageUrl(info);
      console.log(`\n🔗 ========================================`);
      console.log(`✅ EMAIL PREVIEW (click to see the full email):`);
      console.log(`👉 ${previewUrl}`);
      console.log(`==========================================\n`);
    }

  } catch (error) {
    console.error('⚠️ Email sending error:', error.message);
  }
};

/**
 * Send Login Alert Email
 */
exports.sendLoginAlertEmail = async ({ toEmail, userName, role }) => {
  try {
    const timeString = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      });

      await transporter.sendMail({
        from: `"EduManage Pro" <${process.env.SMTP_USER}>`,
        to: toEmail,
        subject: `🔐 Login Alert - EduManage Pro`,
        html: `<p>Hello <strong>${userName}</strong>, your account was accessed on ${timeString}.</p>`
      });
      console.log(`📧 Login alert sent to: ${toEmail}`);
    } else {
      console.log(`📧 [LOGIN] User: ${userName} (${toEmail}) | Role: ${role} | Time: ${timeString}`);
    }
  } catch (error) {
    console.error('⚠️ Login email error:', error.message);
  }
};
