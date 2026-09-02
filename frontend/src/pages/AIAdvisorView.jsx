import React, { useState } from 'react';
import { Sparkles, Brain, CheckCircle2, User, Award, ShieldAlert, ArrowRight } from 'lucide-react';
import api from '../api/api';

const AIAdvisorView = ({ students }) => {
  const [selectedStudentId, setSelectedStudentId] = useState(students[0]?.id || '');
  const [aiReport, setAiReport] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleRunAI = async (studentId) => {
    const id = studentId || selectedStudentId;
    if (!id) return;
    try {
      setLoading(true);
      const res = await api.post('/ai/analyze', { studentId: id });
      if (res.data.success) {
        setAiReport(res.data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const currentStudent = students.find(s => String(s.id) === String(selectedStudentId));

  return (
    <div>
      {/* Header Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #db2777 100%)',
        borderRadius: '16px',
        padding: '28px 32px',
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '28px',
        boxShadow: '0 10px 25px rgba(124, 58, 237, 0.25)'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <Sparkles size={22} color="#fde047" />
            <span style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.8px', background: 'rgba(255,255,255,0.2)', padding: '3px 10px', borderRadius: '20px' }}>
              Fullstack AI Module
            </span>
          </div>
          <h1 style={{ fontSize: '26px', fontWeight: 800, color: '#ffffff' }}>
            AI Student Performance & Mentorship Engine
          </h1>
          <p style={{ fontSize: '13px', color: '#f3e8ff', marginTop: '6px', maxWidth: '540px' }}>
            Automated intelligence predicting student learning curves, analyzing attendance risk levels, and generating tailored study roadmaps.
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '24px' }}>
        {/* Left Column: Student Selector */}
        <div className="card" style={{ height: 'fit-content' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#1e293b', marginBottom: '16px' }}>
            Select Student to Analyze
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '420px', overflowY: 'auto' }}>
            {students.map((s) => {
              const isSelected = String(s.id) === String(selectedStudentId);
              return (
                <div
                  key={s.id}
                  onClick={() => {
                    setSelectedStudentId(s.id);
                    handleRunAI(s.id);
                  }}
                  style={{
                    padding: '12px 14px',
                    borderRadius: '10px',
                    border: isSelected ? '2px solid #6366f1' : '1px solid #e2e8f0',
                    background: isSelected ? '#eef2ff' : '#f8fafc',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <strong style={{ fontSize: '13px', color: '#1e293b', display: 'block' }}>{s.full_name}</strong>
                    <span style={{ fontSize: '11px', color: '#64748b' }}>{s.roll_no} • {s.department.slice(0, 15)}...</span>
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#4f46e5' }}>
                    {s.cgpa_marks} CGPA
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: AI Analysis Report Display */}
        <div className="card">
          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <Brain size={44} color="#8b5cf6" style={{ animation: 'spin 3s linear infinite' }} />
              <h4 style={{ marginTop: '16px', fontSize: '16px', fontWeight: 700, color: '#1e293b' }}>
                AI Model is evaluating student academic attributes...
              </h4>
              <p style={{ fontSize: '13px', color: '#64748b', marginTop: '6px' }}>
                Calculating attendance correlation and score distributions
              </p>
            </div>
          ) : aiReport ? (
            <div>
              {/* Report Header */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: '20px',
                borderBottom: '1px solid #e2e8f0',
                marginBottom: '20px'
              }}>
                <div>
                  <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>ANALYSIS REPORT FOR</span>
                  <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a' }}>{aiReport.studentName}</h2>
                </div>
                <div style={{
                  padding: '6px 14px',
                  borderRadius: '20px',
                  background: aiReport.riskLevel === 'High' ? '#fee2e2' : (aiReport.riskLevel === 'Moderate' ? '#fef3c7' : '#dcfce7'),
                  color: aiReport.riskLevel === 'High' ? '#dc2626' : (aiReport.riskLevel === 'Moderate' ? '#d97706' : '#15803d'),
                  fontWeight: 700,
                  fontSize: '13px'
                }}>
                  {aiReport.riskLevel} Academic Risk
                </div>
              </div>

              {/* Summary telemetry */}
              <div style={{ background: '#f8fafc', padding: '18px', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '24px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>
                  💡 Diagnostic Summary
                </h4>
                <p style={{ fontSize: '14px', color: '#334155', lineHeight: '1.6' }}>
                  {aiReport.aiInsight}
                </p>
              </div>

              {/* Recommendations Roadmap */}
              <div>
                <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', marginBottom: '14px' }}>
                  🎯 AI Smart Mentorship Plan & Recommendations:
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {aiReport.recommendations?.map((item, index) => (
                    <div key={index} style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px',
                      padding: '14px 16px',
                      borderRadius: '10px',
                      background: '#ffffff',
                      border: '1px solid #e2e8f0',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
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
                        {index + 1}
                      </div>
                      <p style={{ fontSize: '13px', color: '#334155', lineHeight: '1.5', margin: 0 }}>
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <Brain size={48} color="#cbd5e1" />
              <h4 style={{ marginTop: '16px', fontSize: '16px', fontWeight: 600, color: '#475569' }}>
                Select a student on the left or click below to launch AI analysis
              </h4>
              <button
                onClick={() => handleRunAI()}
                className="btn btn-ai"
                style={{ marginTop: '16px' }}
              >
                <Sparkles size={16} />
                <span>Run Analysis</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIAdvisorView;
