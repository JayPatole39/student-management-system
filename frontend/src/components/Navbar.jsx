import React from 'react';
import { User, LogIn, LogOut, PlusCircle, Search, ShieldCheck } from 'lucide-react';

const Navbar = ({ currentUser, onOpenLogin, onLogout, onOpenAddStudent, searchQuery, setSearchQuery }) => {
  return (
    <header style={{
      height: '72px',
      background: '#ffffff',
      borderBottom: '1px solid #e2e8f0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 32px',
      position: 'sticky',
      top: 0,
      zIndex: 5,
      boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
    }}>
      {/* Search Input */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        background: '#f1f5f9',
        borderRadius: '10px',
        padding: '8px 14px',
        width: '340px',
        border: '1px solid #e2e8f0',
        transition: 'all 0.2s ease'
      }}>
        <Search size={17} color="#64748b" style={{ marginRight: '10px' }} />
        <input
          type="text"
          placeholder="Search by name, roll no, email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            border: 'none',
            background: 'transparent',
            outline: 'none',
            fontSize: '13px',
            color: '#1e293b',
            width: '100%'
          }}
        />
      </div>

      {/* Right Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {/* Quick Add Student Action */}
        <button
          onClick={onOpenAddStudent}
          className="btn btn-primary"
          style={{ padding: '8px 16px', fontSize: '13px' }}
        >
          <PlusCircle size={17} />
          <span>Add Student</span>
        </button>

        {/* User Auth Profile Status */}
        {currentUser ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '6px 12px',
              background: '#f8fafc',
              borderRadius: '24px',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '13px'
              }}>
                {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <div style={{ textAlign: 'left' }}>
                <p style={{ fontSize: '13px', fontWeight: 600, color: '#1e293b', lineHeight: 1.1 }}>
                  {currentUser.name}
                </p>
                <span style={{
                  fontSize: '10px',
                  textTransform: 'uppercase',
                  color: currentUser.role === 'admin' ? '#4f46e5' : '#059669',
                  fontWeight: 700
                }}>
                  {currentUser.role}
                </span>
              </div>
            </div>

            <button
              onClick={onLogout}
              className="btn btn-secondary"
              title="Logout"
              style={{ padding: '8px 12px', borderRadius: '8px' }}
            >
              <LogOut size={16} color="#64748b" />
            </button>
          </div>
        ) : (
          <button
            onClick={onOpenLogin}
            className="btn btn-secondary"
            style={{ padding: '8px 16px', fontSize: '13px' }}
          >
            <LogIn size={16} />
            <span>Login / Demo</span>
          </button>
        )}
      </div>
    </header>
  );
};

export default Navbar;
