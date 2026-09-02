const db = require('../config/db');

// AI Smart Performance Analyzer & Study Advice Engine
exports.analyzeStudent = async (req, res) => {
  try {
    const { studentId } = req.body;

    let studentData;
    if (studentId) {
      const [rows] = await db.query('SELECT * FROM students WHERE id = ?', [studentId]);
      if (rows.length > 0) studentData = rows[0];
    }

    if (!studentData) {
      return res.status(400).json({ success: false, message: 'Student data required for AI analysis' });
    }

    const { full_name, attendance_percentage, cgpa_marks, department, semester } = studentData;

    // AI rule-based intelligent analysis with personalized insights
    let academicRisk = 'Low';
    let summary = '';
    const recommendations = [];

    if (cgpa_marks >= 9.0) {
      summary = `${full_name} is an Outstanding performer in ${department} (${semester}). Demonstrates exceptional mastery of core technical subjects.`;
      recommendations.push('Encourage participation in National Hackathons & Technical Paper presentations.');
      recommendations.push('Recommend advanced electives like Cloud Architecture, AI/ML or Fullstack System Design.');
      recommendations.push('Eligible for peer-tutoring and placement leadership.');
    } else if (cgpa_marks >= 7.5) {
      summary = `${full_name} is performing consistently well with a solid CGPA of ${cgpa_marks}. Showing strong potential across major engineering coursework.`;
      recommendations.push('Focus on hands-on practical project development and coding platforms (LeetCode/GitHub).');
      recommendations.push('Improve unit test scores and attend weekly problem-solving labs.');
    } else if (cgpa_marks >= 6.0) {
      academicRisk = 'Moderate';
      summary = `${full_name} maintains an average standing (${cgpa_marks} CGPA). Requires targeted academic intervention in challenging subjects.`;
      recommendations.push('Schedule 1-on-1 faculty mentoring sessions for difficult syllabus modules.');
      recommendations.push('Follow a structured 30-day revision timetable before semester finals.');
    } else {
      academicRisk = 'High';
      summary = `Attention needed: ${full_name}'s current CGPA is ${cgpa_marks}. Immediate remedial coaching recommended.`;
      recommendations.push('Mandatory remedial classes and weekly progress tracking with class advisor.');
      recommendations.push('Parent-teacher meeting to align support and study habits.');
    }

    if (attendance_percentage < 75.0) {
      recommendations.push(`⚠️ Attendance Warning: Current attendance is ${attendance_percentage}%. Must maintain at least 75% as per MSBTE/University norms.`);
    } else {
      recommendations.push(`✅ Attendance Compliance: Good attendance record (${attendance_percentage}%).`);
    }

    res.json({
      success: true,
      data: {
        studentName: full_name,
        cgpa: cgpa_marks,
        attendance: attendance_percentage,
        riskLevel: academicRisk,
        aiInsight: summary,
        recommendations,
        analyzedAt: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('AI Analysis Error:', error);
    res.status(500).json({ success: false, message: 'AI Analysis engine error', error: error.message });
  }
};
