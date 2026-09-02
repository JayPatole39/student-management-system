import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend 
} from 'recharts';
import { PieChart as PieIcon, BarChart2, Trophy } from 'lucide-react';

const COLORS = ['#4f46e5', '#06b6d4', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6'];
const FEE_COLORS = {
  'Paid': '#10b981',
  'Partial': '#f59e0b',
  'Pending': '#ef4444'
};

const AnalyticsCharts = ({ stats }) => {
  const deptData = stats?.departmentDistribution?.map(d => ({
    name: d.department.replace('Engineering', 'Engg'),
    students: Number(d.studentCount)
  })) || [];

  const feeData = stats?.feesDistribution?.map(f => ({
    name: f.fees_status,
    value: Number(f.count)
  })) || [];

  const topStudents = stats?.topPerformers || [];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
      gap: '24px',
      marginBottom: '32px'
    }}>
      {/* 1. Department Enrollment Bar Chart */}
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BarChart2 size={20} color="#4f46e5" />
            <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#1e293b' }}>
              Department-wise Enrollment
            </h4>
          </div>
          <span className="badge badge-purple">Branch Breakdown</span>
        </div>

        <div style={{ width: '100%', height: '240px' }}>
          <ResponsiveContainer>
            <BarChart data={deptData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} interval={0} angle={-15} textAnchor="end" />
              <YAxis stroke="#94a3b8" fontSize={12} allowDecimals={false} />
              <Tooltip 
                contentStyle={{ background: '#0f172a', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                itemStyle={{ color: '#818cf8' }}
              />
              <Bar dataKey="students" fill="#4f46e5" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 2. Fee Status Distribution Pie Chart */}
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <PieIcon size={20} color="#06b6d4" />
            <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#1e293b' }}>
              Fee Collection Status
            </h4>
          </div>
          <span className="badge badge-info">Finance Share</span>
        </div>

        <div style={{ width: '100%', height: '240px' }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={feeData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={5}
              >
                {feeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={FEE_COLORS[entry.name] || COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ background: '#0f172a', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
              />
              <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 3. Top Academic Performers Leaderboard */}
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Trophy size={20} color="#f59e0b" />
            <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#1e293b' }}>
              Top CGPA Performers
            </h4>
          </div>
          <span className="badge badge-warning">Dean's List</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {topStudents.length === 0 ? (
            <p style={{ fontSize: '13px', color: '#94a3b8', textAlign: 'center', padding: '20px' }}>No records found</p>
          ) : (
            topStudents.map((s, idx) => (
              <div key={s.id || idx} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 14px',
                background: idx === 0 ? '#fffbeb' : '#f8fafc',
                borderRadius: '10px',
                border: idx === 0 ? '1px solid #fde68a' : '1px solid #e2e8f0'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: idx === 0 ? '#f59e0b' : '#cbd5e1',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '11px',
                    fontWeight: 800
                  }}>
                    {idx + 1}
                  </span>
                  <div>
                    <p style={{ fontSize: '13px', fontWeight: 600, color: '#1e293b' }}>{s.full_name}</p>
                    <p style={{ fontSize: '11px', color: '#64748b' }}>{s.roll_no} • {s.department}</p>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '14px', fontWeight: 800, color: '#4f46e5' }}>
                    {s.cgpa_marks} CGPA
                  </span>
                  <p style={{ fontSize: '11px', color: '#059669', fontWeight: 600 }}>{s.attendance_percentage}% Att.</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsCharts;
