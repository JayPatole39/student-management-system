import React from 'react';
import StatsCards from '../components/StatsCards';
import AnalyticsCharts from '../components/AnalyticsCharts';
import { Sparkles, PlusCircle, ArrowUpRight, GraduationCap } from 'lucide-react';

const Dashboard = ({ stats, students, onOpenAddStudent, onSelectStudent, onTriggerAI }) => {
  const recentStudents = students.slice(0, 5);

  return (
    <div>
      {/* Welcome Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%)',
        borderRadius: '16px',
        padding: '28px 32px',
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '28px',
        boxShadow: '0 10px 25px -5px rgba(49, 46, 129, 0.3)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ zIndex: 2 }}>
          <span style={{
            background: 'rgba(255, 255, 255, 0.15)',
            padding: '4px 12px',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: 700,
            letterSpacing: '0.5px'
          }}>
            ACADEMIC YEAR 2026-27
          </span>
          <h1 style={{ fontSize: '26px', fontWeight: 800, marginTop: '10px', color: '#ffffff' }}>
            Welcome to Student Management Portal
          </h1>
          <p style={{ fontSize: '13px', color: '#c7d2fe', marginTop: '6px', maxWidth: '560px', lineHeight: '1.5' }}>
            A fullstack academic management and data analytics platform integrated with AI-driven student performance evaluation.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px', zIndex: 2 }}>
          <button
            onClick={onOpenAddStudent}
            className="btn"
            style={{ background: '#ffffff', color: '#1e1b4b', fontWeight: 700 }}
          >
            <PlusCircle size={17} color="#4f46e5" />
            <span>Add Student</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Overview Cards */}
      <StatsCards stats={stats} />

      {/* Analytics & Graphs */}
      <AnalyticsCharts stats={stats} />

      {/* Recent Enrolled Students Mini Table */}
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>
              Recently Enrolled Students
            </h3>
            <p style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
              Latest active records from MySQL database
            </p>
          </div>
        </div>

        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Roll No</th>
                <th>Student Name</th>
                <th>Department</th>
                <th>Semester</th>
                <th>Attendance</th>
                <th>CGPA</th>
                <th>Fees Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentStudents.map((s) => (
                <tr key={s.id}>
                  <td style={{ fontWeight: 700, color: '#4f46e5' }}>{s.roll_no}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: '#e0e7ff',
                        color: '#4f46e5',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                        fontSize: '12px'
                      }}>
                        {s.full_name?.charAt(0)}
                      </div>
                      <div>
                        <span style={{ fontWeight: 600, color: '#1e293b' }}>{s.full_name}</span>
                        <p style={{ fontSize: '11px', color: '#64748b' }}>{s.email}</p>
                      </div>
                    </div>
                  </td>
                  <td>{s.department}</td>
                  <td><span className="badge badge-purple">{s.semester}</span></td>
                  <td>
                    <span style={{
                      fontWeight: 700,
                      color: Number(s.attendance_percentage) >= 75 ? '#059669' : '#dc2626'
                    }}>
                      {s.attendance_percentage}%
                    </span>
                  </td>
                  <td><strong style={{ color: '#4f46e5' }}>{s.cgpa_marks}</strong></td>
                  <td>
                    <span className={
                      s.fees_status === 'Paid' ? 'badge badge-success' :
                      s.fees_status === 'Partial' ? 'badge badge-warning' : 'badge badge-danger'
                    }>
                      {s.fees_status}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button
                        onClick={() => onSelectStudent(s)}
                        className="btn btn-secondary"
                        style={{ padding: '4px 10px', fontSize: '11px' }}
                      >
                        Profile
                      </button>
                      <button
                        onClick={() => onTriggerAI(s)}
                        className="btn btn-ai"
                        style={{ padding: '4px 10px', fontSize: '11px' }}
                      >
                        <Sparkles size={13} />
                        <span>AI</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
