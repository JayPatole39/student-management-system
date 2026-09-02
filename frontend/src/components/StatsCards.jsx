import React from 'react';
import { Users, Award, CheckCircle2, TrendingUp, IndianRupee, Clock } from 'lucide-react';

const StatsCards = ({ stats }) => {
  const summary = stats?.summary || {
    totalStudents: 0,
    activeStudents: 0,
    avgAttendance: 0,
    avgCGPA: 0,
    totalFeesExpected: 0,
    totalFeesCollected: 0,
    totalFeesPending: 0
  };

  const cards = [
    {
      title: 'Total Enrolled Students',
      value: summary.totalStudents || 0,
      subValue: `${summary.activeStudents || 0} Active Currently`,
      icon: Users,
      color: '#4f46e5',
      bgLight: '#eef2ff',
      gradient: 'linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)'
    },
    {
      title: 'Average Attendance',
      value: `${summary.avgAttendance || 0}%`,
      subValue: Number(summary.avgAttendance) >= 75 ? 'Optimal compliance' : 'Action needed',
      icon: CheckCircle2,
      color: '#059669',
      bgLight: '#ecfdf5',
      gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
    },
    {
      title: 'Average Academic CGPA',
      value: `${summary.avgCGPA || 0}`,
      subValue: 'Scale of 10.0',
      icon: Award,
      color: '#8b5cf6',
      bgLight: '#f5f3ff',
      gradient: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)'
    },
    {
      title: 'Fees Collection',
      value: `₹${Number(summary.totalFeesCollected || 0).toLocaleString('en-IN')}`,
      subValue: `Pending: ₹${Number(summary.totalFeesPending || 0).toLocaleString('en-IN')}`,
      icon: IndianRupee,
      color: '#d97706',
      bgLight: '#fffbeb',
      gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
    }
  ];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
      gap: '20px',
      marginBottom: '28px'
    }}>
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div key={idx} className="card" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '20px 24px',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div>
              <p style={{ fontSize: '13px', fontWeight: 600, color: '#64748b', marginBottom: '6px' }}>
                {card.title}
              </p>
              <h3 style={{ fontSize: '26px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.5px' }}>
                {card.value}
              </h3>
              <p style={{ fontSize: '12px', color: '#64748b', marginTop: '6px', fontWeight: 500 }}>
                {card.subValue}
              </p>
            </div>
            
            <div style={{
              width: '52px',
              height: '52px',
              borderRadius: '14px',
              background: card.bgLight,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: card.color
            }}>
              <Icon size={26} color={card.color} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsCards;
