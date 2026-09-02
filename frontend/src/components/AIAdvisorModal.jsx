import React, { useState, useEffect } from 'react';
import { X, Sparkles, CheckCircle2, AlertTriangle, Lightbulb, GraduationCap } from 'lucide-react';
import api from '../api/api';

const AIAdvisorModal = ({ isOpen, onClose, student }) => {
  const [aiData, setAiData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen && student) {
      fetchAIAnalysis();
    } else {
      setAiData(null);
      setError('');
    }
  }, [isOpen, student]);

  const fetchAIAnalysis = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await api.post('/ai/analyze', { studentId: student.id });
      if (res.data.success) {
        setAiData(res.data.data);
      }
    } catch (err) {
      console.error('AI error:', err);
      setError('Could not run AI analysis at this moment.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !student) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '620px' }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #4f46e5 0%, #a855f7 100%)',
          padding: '20px 24px',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '10px',
              padding: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Sparkles size={22} color="#ffffff" />
            </div>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff' }}>
                AI Academic Smart Advisor
              </h3>
              <p style={{ fontSize: '12px', color: '#e0e7ff' }}>
                Automated Performance Analysis for {student.full_name}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#ffffff' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '24px' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <Sparkles size={36} color="#8b5cf6" style={{ animation: 'spin 2s linear infinite' }} />
              <p style={{ marginTop: '16px', fontSize: '14px', fontWeight: 600, color: '#475569' }}>
                Analyzing academic telemetry & attendance patterns...
              </p>
            </div>
          ) : error ? (
            <div style={{ background: '#fee2e2', color: '#dc2626', padding: '14px', borderRadius: '8px', fontSize: '13px' }}>
              {error}
            </div>
          ) : aiData ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {/* Risk Level Badge & Score */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 18px',
                background: aiData.riskLevel === 'High' ? '#fef2f2' : (aiData.riskLevel === 'Moderate' ? '#fffbeb' : '#f0fdf4'),
                borderRadius: '10px',
                border: `1px solid ${aiData.riskLevel === 'High' ? '#fecaca' : (aiData.riskLevel === 'Moderate' ? '#fde68a' : '#bbf7d0')}`
              }}>
                <div>
                  <span style={{ fontSize: '11px', textTransform: 'uppercase', fontWeight: 700, color: '#64748b' }}>
                    Academic Risk Assessment
                  </span>
                  <h4 style={{
                    fontSize: '16px',
                    fontWeight: 800,
                    color: aiData.riskLevel === 'High' ? '#dc2626' : (aiData.riskLevel === 'Moderate' ? '#d97706' : '#15803d')
                  }}>
                    {aiData.riskLevel} Academic Risk
                  </h4>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '11px', color: '#64748b' }}>Current Standing</span>
                  <p style={{ fontSize: '15px', fontWeight: 700, color: '#1e293b' }}>
                    {aiData.cgpa} CGPA • {aiData.attendance}% Att.
                  </p>
                </div>
              </div>

              {/* AI Summary Insight */}
              <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <Lightbulb size={18} color="#f59e0b" />
                  <strong style={{ fontSize: '14px', color: '#0f172a' }}>AI Insight & Evaluation:</strong>
                </div>
                <p style={{ fontSize: '13px', color: '#334155', lineHeight: '1.5' }}>
                  {aiData.aiInsight}
                </p>
              </div>

              {/* Tailored Recommendations */}
              <div>
                <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#1e293b', marginBottom: '12px' }}>
                  Actionable Recommendations:
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {aiData.recommendations?.map((rec, idx) => (
                    <div key={idx} style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '10px',
                      padding: '10px 14px',
                      background: '#ffffff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      fontSize: '13px',
                      color: '#334155'
                    }}>
                      <CheckCircle2 size={16} color="#4f46e5" style={{ marginTop: '2px', flexShrink: 0 }} />
                      <span>{rec}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button onClick={onClose} className="btn btn-secondary" style={{ padding: '8px 20px' }}>
                  Done
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default AIAdvisorModal;
