const db = require('../config/db');

// 1. Get All Students with Search & Filter
exports.getAllStudents = async (req, res) => {
  try {
    const { search, department, status, sortBy, order } = req.query;

    let query = 'SELECT * FROM students WHERE 1=1';
    const params = [];

    if (search) {
      query += ' AND (full_name LIKE ? OR roll_no LIKE ? OR email LIKE ?)';
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    if (department && department !== 'All') {
      query += ' AND department = ?';
      params.push(department);
    }

    if (status && status !== 'All') {
      query += ' AND status = ?';
      params.push(status);
    }

    const sortField = ['roll_no', 'full_name', 'attendance_percentage', 'cgpa_marks', 'created_at'].includes(sortBy)
      ? sortBy
      : 'id';
    const sortOrder = order === 'ASC' ? 'ASC' : 'DESC';

    query += ` ORDER BY ${sortField} ${sortOrder}`;

    const [students] = await db.query(query, params);
    res.json({ success: true, count: students.length, data: students });
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// 2. Get Analytics & Statistics for Dashboard & Charts
exports.getStudentStats = async (req, res) => {
  try {
    // Basic Totals & Averages
    const [summary] = await db.query(`
      SELECT 
        COUNT(*) as totalStudents,
        SUM(CASE WHEN status = 'Active' THEN 1 ELSE 0 END) as activeStudents,
        ROUND(AVG(attendance_percentage), 2) as avgAttendance,
        ROUND(AVG(cgpa_marks), 2) as avgCGPA,
        SUM(fees_total) as totalFeesExpected,
        SUM(fees_paid) as totalFeesCollected,
        SUM(fees_total - fees_paid) as totalFeesPending
      FROM students
    `);

    // Department-wise Student Count for Pie/Bar Chart
    const [deptStats] = await db.query(`
      SELECT department, COUNT(*) as studentCount 
      FROM students 
      GROUP BY department
    `);

    // Fees Status Breakdown
    const [feesStats] = await db.query(`
      SELECT fees_status, COUNT(*) as count 
      FROM students 
      GROUP BY fees_status
    `);

    // Top Performing Students
    const [topStudents] = await db.query(`
      SELECT id, roll_no, full_name, department, cgpa_marks, attendance_percentage 
      FROM students 
      ORDER BY cgpa_marks DESC 
      LIMIT 5
    `);

    res.json({
      success: true,
      data: {
        summary: summary[0],
        departmentDistribution: deptStats,
        feesDistribution: feesStats,
        topPerformers: topStudents
      }
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ success: false, message: 'Server error fetching analytics', error: error.message });
  }
};

// 3. Get Single Student by ID
exports.getStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    const [students] = await db.query('SELECT * FROM students WHERE id = ?', [id]);

    if (students.length === 0) {
      return res.status(404).json({ success: false, message: 'Student not found.' });
    }

    res.json({ success: true, data: students[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// 4. Create New Student
exports.createStudent = async (req, res) => {
  try {
    const {
      roll_no,
      full_name,
      email,
      phone,
      gender,
      dob,
      department,
      semester,
      attendance_percentage,
      cgpa_marks,
      fees_total,
      fees_paid,
      fees_status,
      status
    } = req.body;

    if (!roll_no || !full_name || !email || !phone || !department || !semester) {
      return res.status(400).json({ success: false, message: 'Please provide all mandatory fields.' });
    }

    // Check duplicate roll number or email
    const [exists] = await db.query('SELECT id FROM students WHERE roll_no = ? OR email = ?', [roll_no, email]);
    if (exists.length > 0) {
      return res.status(400).json({ success: false, message: 'Student with this Roll No or Email already exists.' });
    }

    const calculatedFeeStatus = fees_status || (
      Number(fees_paid) >= Number(fees_total) ? 'Paid' : (Number(fees_paid) > 0 ? 'Partial' : 'Pending')
    );

    const [result] = await db.query(
      `INSERT INTO students (
        roll_no, full_name, email, phone, gender, dob, department, semester,
        attendance_percentage, cgpa_marks, fees_total, fees_paid, fees_status, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        roll_no,
        full_name,
        email,
        phone,
        gender || 'Male',
        dob || null,
        department,
        semester,
        attendance_percentage || 0.0,
        cgpa_marks || 0.0,
        fees_total || 45000.0,
        fees_paid || 0.0,
        calculatedFeeStatus,
        status || 'Active'
      ]
    );

    res.status(201).json({
      success: true,
      message: 'Student added successfully!',
      studentId: result.insertId
    });
  } catch (error) {
    console.error('Create student error:', error);
    res.status(500).json({ success: false, message: 'Error adding student', error: error.message });
  }
};

// 5. Update Student
exports.updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      roll_no,
      full_name,
      email,
      phone,
      gender,
      dob,
      department,
      semester,
      attendance_percentage,
      cgpa_marks,
      fees_total,
      fees_paid,
      fees_status,
      status
    } = req.body;

    const calculatedFeeStatus = fees_status || (
      Number(fees_paid) >= Number(fees_total) ? 'Paid' : (Number(fees_paid) > 0 ? 'Partial' : 'Pending')
    );

    const [result] = await db.query(
      `UPDATE students SET
        roll_no = ?, full_name = ?, email = ?, phone = ?, gender = ?, dob = ?,
        department = ?, semester = ?, attendance_percentage = ?, cgpa_marks = ?,
        fees_total = ?, fees_paid = ?, fees_status = ?, status = ?
      WHERE id = ?`,
      [
        roll_no,
        full_name,
        email,
        phone,
        gender,
        dob,
        department,
        semester,
        attendance_percentage,
        cgpa_marks,
        fees_total,
        fees_paid,
        calculatedFeeStatus,
        status,
        id
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Student not found.' });
    }

    res.json({ success: true, message: 'Student updated successfully!' });
  } catch (error) {
    console.error('Update student error:', error);
    res.status(500).json({ success: false, message: 'Error updating student', error: error.message });
  }
};

// 6. Delete Student
exports.deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.query('DELETE FROM students WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Student not found.' });
    }

    res.json({ success: true, message: 'Student deleted successfully!' });
  } catch (error) {
    console.error('Delete student error:', error);
    res.status(500).json({ success: false, message: 'Error deleting student', error: error.message });
  }
};
