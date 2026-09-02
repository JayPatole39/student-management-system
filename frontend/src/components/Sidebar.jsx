import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Sparkles, 
  CreditCard, 
  GraduationCap, 
  Database,
  BarChart3,
  Code2
} from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard & Overview', icon: LayoutDashboard },
    { id: 'students', label: 'Students Directory', icon: Users },
    { id: 'ai-advisor', label: 'AI Smart Advisor', icon: Sparkles, badge: 'AI' },
    { id: 'fees', label: 'Fees & Finance', icon: CreditCard },
    { id: 'analytics', label: 'Academic Analytics', icon: BarChart3 },
  ];

  return (
    <aside style={{
      width: '275px',
      background: 'linear-gradient(180deg, #1e1b4b 0%, #0f172a 100%)',
      color: '#f8fafc',
      display: 'flex',
      flexDirection: 'column',
      padding: '24px 16px',
      boxShadow: '4px 0 24px rgba(0, 0, 0, 0.15)',
      zIndex: 10
    }}>
      {/* Brand Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '0 12px 24px 12px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
          width: '42px',
          height: '42px',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 14px rgba(99, 102, 241, 0.4)'
        }}>
          <GraduationCap size={24} color="#ffffff" />
        </div>
        <div>
          <h2 style={{ fontSize: '17px', fontWeight: 800, letterSpacing: '-0.3px', color: '#ffffff' }}>
            EduManage <span style={{ color: '#818cf8', fontWeight: 600 }}>Pro</span>
          </h2>
          <p style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>Admin Management Hub</p>
        </div>
      </div>

      {/* Navigation List */}
      <nav style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
        <p style={{ fontSize: '11px', textTransform: 'uppercase', color: '#64748b', fontWeight: 700, padding: '0 12px 6px', letterSpacing: '0.8px' }}>
          Admin Controls
        </p>

        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                padding: '12px 14px',
                borderRadius: '10px',
                border: 'none',
                background: isActive 
                  ? 'linear-gradient(90deg, rgba(79, 70, 229, 0.95) 0%, rgba(99, 102, 241, 0.8) 100%)' 
                  : 'transparent',
                color: isActive ? '#ffffff' : '#94a3b8',
                fontWeight: isActive ? 700 : 500,
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                textAlign: 'left',
                outline: 'none',
                boxShadow: isActive ? '0 4px 14px rgba(79, 70, 229, 0.35)' : 'none'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Icon size={19} color={isActive ? '#ffffff' : '#94a3b8'} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span style={{
                  background: 'linear-gradient(135deg, #ec4899 0%, #a855f7 100%)',
                  color: '#ffffff',
                  fontSize: '10px',
                  fontWeight: 800,
                  padding: '2px 7px',
                  borderRadius: '12px'
                }}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Developer Card & Stack Info */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.04)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '12px',
        padding: '14px',
        marginTop: 'auto'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <Code2 size={15} color="#38bdf8" />
          <span style={{ fontSize: '12px', fontWeight: 700, color: '#e2e8f0' }}>Developed by Jay Patole</span>
        </div>
        <p style={{ fontSize: '11px', color: '#94a3b8', lineHeight: '1.4' }}>
          React + Node.js + MySQL + AI
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
