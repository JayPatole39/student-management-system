import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Sparkles, 
  CreditCard, 
  User, 
  GraduationCap, 
  LogOut, 
  Award, 
  CheckCircle2, 
  BookOpen, 
  ArrowLeft, 
  Printer, 
  Mail, 
  Phone, 
  Calendar, 
  Clock, 
  ShieldCheck,
  Code2,
  FileText
} from 'lucide-react';
import api from '../api/api';

const StudentPortal = ({ currentUser, onLogout, onGoHome }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [profile, setProfile] = useState(currentUser?.studentProfile || null);
  const [aiData, setAiData] = useState(null);
  const [loadingAI, setLoadingAI] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await api.get('/auth/me');
        if (res.data.success && res.data.user?.studentProfile) {
          setProfile(res.data.user.studentProfile);
          runAIAnalysis(res.data.user.studentProfile.id);
        } else if (profile?.id) {
          runAIAnalysis(profile.id);
        }
      } catch (err) {
        console.error(err);
      }
    };
    loadProfile();
  }, []);

  const runAIAnalysis = async (studentId) => {
    try {
      setLoadingAI(true);
      const res = await api.post('/ai/analyze', { studentId });
      if (res.data.success) {
        setAiData(res.data.data);
      }
    } catch (err) {
      console.error('AI Error:', err);
    } finally {
      setLoadingAI(false);
    }
  };

  const currentProfile = profile || {
    roll_no: 'CO301',
    full_name: currentUser?.name || 'Rahul Sharma',
    email: currentUser?.email || 'rahul@sms.com',
    phone: '9876543210',
    department: 'Computer Engineering',
    semester: '6th Sem',
    attendance_percentage: 88.5,
    cgpa_marks: 8.75,
    fees_total: 45000,
    fees_paid: 45000,
    fees_status: 'Paid',
    status: 'Active'
  };

  const menuItems = [
    { id: 'dashboard', label: 'My Dashboard', icon: LayoutDashboard },
    { id: 'ai-coach', label: 'AI Academic Coach', icon: Sparkles, badge: 'AI' },
    { id: 'fees', label: 'My Fees & Receipts', icon: CreditCard },
    { id: 'profile', label: 'Profile & Digital ID', icon: User },
  ];

  return (
    <div className="app-container">
      {/* 1. STUDENT LEFT SIDEBAR */}
      <aside style={{
        width: '275px',
        background: 'linear-gradient(180deg, #064e3b 0%, #022c22 100%)',
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
          borderBottom: '1px solid rgba(255, 255, 255, 0.12)'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 14px rgba(16, 185, 129, 0.4)'
          }}>
            <GraduationCap size={24} color="#ffffff" />
          </div>
          <div>
            <h2 style={{ fontSize: '17px', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.3px' }}>
              Student Portal
            </h2>
            <p style={{ fontSize: '11px', color: '#a7f3d0', marginTop: '2px' }}>EduManage Pro</p>
          </div>
        </div>

        {/* Student Navigation Menu */}
        <nav style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
          <p style={{ fontSize: '11px', textTransform: 'uppercase', color: '#6ee7b7', fontWeight: 800, padding: '0 12px 6px', letterSpacing: '0.8px' }}>
            My Workspace
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
                    ? 'linear-gradient(90deg, rgba(16, 185, 129, 0.95) 0%, rgba(5, 150, 105, 0.8) 100%)' 
                    : 'transparent',
                  color: isActive ? '#ffffff' : '#a7f3d0',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '14px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  textAlign: 'left',
                  outline: 'none',
                  boxShadow: isActive ? '0 4px 14px rgba(16, 185, 129, 0.3)' : 'none'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Icon size={19} color={isActive ? '#ffffff' : '#6ee7b7'} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span style={{
                    background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
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

        {/* Developer Attribution Card */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.06)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '12px',
          padding: '14px',
          marginTop: 'auto'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <Code2 size={15} color="#34d399" />
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#e2e8f0' }}>Developed by Jay Patole</span>
          </div>
          <p style={{ fontSize: '11px', color: '#a7f3d0' }}>
            Diploma Final Year Project
          </p>
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA (RIGHT SIDE) */}
      <div className="main-content">
        {/* Top Navbar */}
        <header className="glass-nav" style={{
          height: '74px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 36px',
          position: 'sticky',
          top: 0,
          zIndex: 5
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span className="badge badge-success" style={{ fontSize: '12px', padding: '6px 12px' }}>
              Roll No: {currentProfile.roll_no}
            </span>
            <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>
              {currentProfile.department} ({currentProfile.semester})
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <button
              onClick={onGoHome}
              className="btn btn-secondary"
              style={{ fontSize: '13px', padding: '8px 14px' }}
            >
              <ArrowLeft size={16} />
              <span>Back to Home</span>
            </button>

            <button
              onClick={onLogout}
              className="btn btn-danger"
              style={{ fontSize: '13px', padding: '8px 18px', fontWeight: 700 }}
            >
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        </header>

        {/* Dynamic Content Body */}
        <main className="content-body">
          {/* TAB 1: MY DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div>
              {/* Welcome Banner */}
              <div style={{
                background: 'linear-gradient(135deg, #064e3b 0%, #047857 60%, #10b981 100%)',
                borderRadius: '18px',
                padding: '30px 36px',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '28px',
                boxShadow: '0 12px 28px rgba(4, 120, 87, 0.2)',
                flexWrap: 'wrap',
                gap: '20px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
                  <div style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #34d399 0%, #10b981 100%)',
                    border: '3px solid rgba(255, 255, 255, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '26px',
                    fontWeight: 900,
                    color: '#ffffff'
                  }}>
                    {currentProfile.full_name?.charAt(0)}
                  </div>
                  <div>
                    <h1 style={{ fontSize: '24px', fontWeight: 900, color: '#ffffff' }}>
                      Welcome back, {currentProfile.full_name}!
                    </h1>
                    <p style={{ fontSize: '13px', color: '#a7f3d0', marginTop: '3px' }}>
                      Your academic record is up to date for Academic Year 2026-27
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('ai-coach')}
                  className="btn btn-ai"
                  style={{ padding: '10px 20px', fontSize: '13px' }}
                >
                  <Sparkles size={16} />
                  <span>View AI Insights</span>
                </button>
              </div>

              {/* 4 Scorecards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '28px' }}>
                <div className="card" style={{ borderLeft: '4px solid #4f46e5' }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#64748b' }}>MY CGPA</span>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '6px' }}>
                    <h2 style={{ fontSize: '32px', fontWeight: 900, color: '#4f46e5' }}>{currentProfile.cgpa_marks}</h2>
                    <div style={{ background: '#eef2ff', padding: '10px', borderRadius: '12px', color: '#4f46e5' }}><Award size={24} /></div>
                  </div>
                  <p style={{ fontSize: '12px', color: '#059669', fontWeight: 700, marginTop: '6px' }}>
                    {Number(currentProfile.cgpa_marks) >= 8.5 ? '⭐ Distinction' : 'First Class'}
                  </p>
                </div>

                <div className="card" style={{ borderLeft: '4px solid #059669' }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#64748b' }}>MY ATTENDANCE</span>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '6px' }}>
                    <h2 style={{ fontSize: '32px', fontWeight: 900, color: '#059669' }}>{currentProfile.attendance_percentage}%</h2>
                    <div style={{ background: '#ecfdf5', padding: '10px', borderRadius: '12px', color: '#059669' }}><CheckCircle2 size={24} /></div>
                  </div>
                  <p style={{ fontSize: '12px', color: '#059669', fontWeight: 700, marginTop: '6px' }}>
                    {Number(currentProfile.attendance_percentage) >= 75 ? '✅ >75% Compliant' : '⚠️ Low Attendance'}
                  </p>
                </div>

                <div className="card" style={{ borderLeft: '4px solid #f59e0b' }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#64748b' }}>FEES STATUS</span>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '6px' }}>
                    <h2 style={{ fontSize: '26px', fontWeight: 900, color: '#0f172a' }}>₹{Number(currentProfile.fees_paid).toLocaleString('en-IN')}</h2>
                    <span className={currentProfile.fees_status === 'Paid' ? 'badge badge-success' : 'badge badge-warning'}>
                      {currentProfile.fees_status}
                    </span>
                  </div>
                  <p style={{ fontSize: '12px', color: '#64748b', marginTop: '6px' }}>
                    Total: ₹{Number(currentProfile.fees_total).toLocaleString('en-IN')}
                  </p>
                </div>

                <div className="card" style={{ borderLeft: '4px solid #8b5cf6' }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#64748b' }}>SEMESTER & BRANCH</span>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '6px' }}>
                    <h2 style={{ fontSize: '22px', fontWeight: 900, color: '#0f172a' }}>{currentProfile.semester}</h2>
                    <div style={{ background: '#f5f3ff', padding: '10px', borderRadius: '12px', color: '#8b5cf6' }}><BookOpen size={24} /></div>
                  </div>
                  <p style={{ fontSize: '12px', color: '#64748b', marginTop: '6px' }}>{currentProfile.department}</p>
                </div>
              </div>

              {/* Quick Profile Summary Card */}
              <div className="card">
                <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', marginBottom: '16px' }}>Academic Summary</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', fontSize: '13px' }}>
                  <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                    <span style={{ color: '#64748b' }}>Full Name:</span>
                    <p style={{ fontWeight: 700, color: '#0f172a', marginTop: '2px' }}>{currentProfile.full_name}</p>
                  </div>
                  <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                    <span style={{ color: '#64748b' }}>Roll Number:</span>
                    <p style={{ fontWeight: 700, color: '#4f46e5', marginTop: '2px' }}>{currentProfile.roll_no}</p>
                  </div>
                  <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                    <span style={{ color: '#64748b' }}>Email:</span>
                    <p style={{ fontWeight: 700, color: '#0f172a', marginTop: '2px' }}>{currentProfile.email}</p>
                  </div>
                  <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                    <span style={{ color: '#64748b' }}>Phone:</span>
                    <p style={{ fontWeight: 700, color: '#0f172a', marginTop: '2px' }}>{currentProfile.phone}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: AI ACADEMIC COACH */}
          {activeTab === 'ai-coach' && (
            <div className="card" style={{ padding: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ background: '#8b5cf6', padding: '10px', borderRadius: '12px', color: '#fff' }}>
                    <Sparkles size={24} />
                  </div>
                  <div>
                    <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a' }}>My Personal AI Study Coach</h2>
                    <p style={{ fontSize: '13px', color: '#64748b' }}>Automated Performance Diagnostics & Study Roadmap</p>
                  </div>
                </div>

                {aiData && (
                  <span style={{
                    background: aiData.riskLevel === 'High' ? '#fee2e2' : (aiData.riskLevel === 'Moderate' ? '#fef3c7' : '#dcfce7'),
                    color: aiData.riskLevel === 'High' ? '#dc2626' : (aiData.riskLevel === 'Moderate' ? '#d97706' : '#15803d'),
                    padding: '6px 14px',
                    borderRadius: '20px',
                    fontWeight: 800,
                    fontSize: '12px'
                  }}>
                    {aiData.riskLevel} Academic Risk
                  </span>
                )}
              </div>

              {loadingAI ? (
                <div style={{ textAlign: 'center', padding: '60px' }}>
                  <Sparkles size={40} color="#8b5cf6" style={{ animation: 'spin 2s linear infinite' }} />
                  <p style={{ marginTop: '16px', fontSize: '14px', fontWeight: 600, color: '#475569' }}>
                    Generating customized recommendations with AI...
                  </p>
                </div>
              ) : aiData ? (
                <div>
                  <div style={{ background: '#f8fafc', padding: '18px', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '24px' }}>
                    <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>💡 AI Diagnostic Summary</h4>
                    <p style={{ fontSize: '14px', color: '#334155', lineHeight: '1.6' }}>{aiData.aiInsight}</p>
                  </div>

                  <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', marginBottom: '14px' }}>
                    🎯 Actionable Study & Career Plan:
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {aiData.recommendations?.map((rec, idx) => (
                      <div key={idx} style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '12px',
                        padding: '14px 16px',
                        borderRadius: '10px',
                        background: '#ffffff',
                        border: '1px solid #e2e8f0'
                      }}>
                        <div style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          background: '#e0e7ff',
                          color: '#4f46e5',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 800,
                          fontSize: '12px',
                          flexShrink: 0
                        }}>
                          {idx + 1}
                        </div>
                        <p style={{ fontSize: '13px', color: '#334155', lineHeight: '1.5', margin: 0 }}>{rec}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '40px' }}>
                  <button onClick={() => runAIAnalysis(currentProfile.id)} className="btn btn-ai" style={{ padding: '12px 24px' }}>
                    <Sparkles size={16} />
                    <span>Run AI Performance Analysis</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: FEES & TRANSACTIONS */}
          {activeTab === 'fees' && (
            <div className="card" style={{ padding: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                <div>
                  <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a' }}>College Tuition & Fees</h2>
                  <p style={{ fontSize: '13px', color: '#64748b' }}>Fee ledger and payment verification</p>
                </div>
                <span className={currentProfile.fees_status === 'Paid' ? 'badge badge-success' : 'badge badge-warning'}>
                  {currentProfile.fees_status}
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                  <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>TOTAL FEES</span>
                  <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', marginTop: '4px' }}>
                    ₹{Number(currentProfile.fees_total).toLocaleString('en-IN')}
                  </h3>
                </div>

                <div style={{ background: '#ecfdf5', padding: '16px', borderRadius: '12px', border: '1px solid #bbf7d0' }}>
                  <span style={{ fontSize: '12px', color: '#059669', fontWeight: 600 }}>FEES PAID</span>
                  <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#059669', marginTop: '4px' }}>
                    ₹{Number(currentProfile.fees_paid).toLocaleString('en-IN')}
                  </h3>
                </div>

                <div style={{ background: '#fef2f2', padding: '16px', borderRadius: '12px', border: '1px solid #fecaca' }}>
                  <span style={{ fontSize: '12px', color: '#dc2626', fontWeight: 600 }}>PENDING DUES</span>
                  <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#dc2626', marginTop: '4px' }}>
                    ₹{Number(currentProfile.fees_total - currentProfile.fees_paid).toLocaleString('en-IN')}
                  </h3>
                </div>
              </div>

              <button onClick={() => window.print()} className="btn btn-secondary" style={{ padding: '10px 18px' }}>
                <Printer size={16} />
                <span>Print Official Fee Receipt</span>
              </button>
            </div>
          )}

          {/* TAB 4: PROFILE & DIGITAL ID */}
          {activeTab === 'profile' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              {/* Profile Details */}
              <div className="card" style={{ padding: '28px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', marginBottom: '18px' }}>Personal Profile</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '10px', borderBottom: '1px solid #f1f5f9' }}>
                    <span style={{ color: '#64748b' }}>Full Name:</span>
                    <strong style={{ color: '#0f172a' }}>{currentProfile.full_name}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '10px', borderBottom: '1px solid #f1f5f9' }}>
                    <span style={{ color: '#64748b' }}>Roll Number:</span>
                    <strong style={{ color: '#4f46e5' }}>{currentProfile.roll_no}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '10px', borderBottom: '1px solid #f1f5f9' }}>
                    <span style={{ color: '#64748b' }}>Email:</span>
                    <span>{currentProfile.email}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '10px', borderBottom: '1px solid #f1f5f9' }}>
                    <span style={{ color: '#64748b' }}>Phone:</span>
                    <span>{currentProfile.phone}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '10px', borderBottom: '1px solid #f1f5f9' }}>
                    <span style={{ color: '#64748b' }}>Department:</span>
                    <span>{currentProfile.department}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '10px', borderBottom: '1px solid #f1f5f9' }}>
                    <span style={{ color: '#64748b' }}>Semester:</span>
                    <span>{currentProfile.semester}</span>
                  </div>
                </div>
              </div>

              {/* Digital Student ID Card */}
              <div className="card" style={{
                background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
                color: '#ffffff',
                padding: '28px',
                borderRadius: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 12px 30px rgba(30, 27, 75, 0.3)'
              }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.15)', paddingBottom: '14px' }}>
                    <div>
                      <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#ffffff' }}>EduManage Institute</h4>
                      <p style={{ fontSize: '10px', color: '#c7d2fe' }}>Student Identity Card</p>
                    </div>
                    <GraduationCap size={28} color="#818cf8" />
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '20px' }}>
                    <div style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                      border: '2px solid #fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '24px',
                      fontWeight: 900
                    }}>
                      {currentProfile.full_name?.charAt(0)}
                    </div>
                    <div>
                      <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff' }}>{currentProfile.full_name}</h3>
                      <p style={{ fontSize: '12px', color: '#a5b4fc', marginTop: '2px' }}>Roll No: <strong>{currentProfile.roll_no}</strong></p>
                      <p style={{ fontSize: '11px', color: '#cbd5e1' }}>{currentProfile.department}</p>
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: '24px', paddingTop: '14px', borderTop: '1px solid rgba(255,255,255,0.15)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '11px', color: '#94a3b8' }}>Valid Thru: 2026-2027</span>
                  <button onClick={() => window.print()} className="btn btn-emerald" style={{ padding: '6px 12px', fontSize: '11px' }}>
                    <Printer size={12} />
                    <span>Print ID Card</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default StudentPortal;
