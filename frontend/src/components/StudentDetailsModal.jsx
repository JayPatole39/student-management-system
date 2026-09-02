import React from 'react';
import { X, Sparkles, Phone, Mail, Calendar, BookOpen, User, CheckCircle, AlertCircle } from 'lucide-react';

const StudentDetailsModal = ({ isOpen, onClose, student, onTriggerAI }) => {
  if (!isOpen || !student) return null;

  const getStatusBadge = (status) => {
    return status === 'Active' ? 'badge badge-success' : 'badge badge-danger';
  };

  const getFeeBadge = (status) => {
    switch (status) {
      case 'Paid': return 'badge badge-success';
      case 'Partial': return 'badge badge-warning';
      default: return 'badge badge-danger';
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '580px', overflow: 'hidden' }}>
        {/* Banner Header */}
        <div style={{
          background: 'linear-gradient(135deg, #1e1b4b 0%, #4338ca 100%)',
          padding: '24px 28px',
          color: '#ffffff',
          position: 'relative'
        }}>
          <button 
            onClick={onClose} 
            style={{ position: 'absolute', top: '18px', right: '18px', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: '32px', height: '32px', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
          >
            <X size={18} />
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
              border: '3px solid rgba(255, 255, 255, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              fontWeight: 800
            }}>
              {student.full_name?.charAt(0)}
            </div>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#ffffff' }}>{student.full_name}</h2>
              <p style={{ fontSize: '13px', color: '#c7d2fe', marginTop: '2px' }}>
                Roll No: <span style={{ fontWeight: 700, color: '#ffffff' }}>{student.roll_no}</span> • {student.department}
              </p>
              <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                <span className={getStatusBadge(student.status)}>{student.status}</span>
                <span className="badge badge-purple">{student.semester}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div style={{ padding: '24px' }}>
          {/* Key Metrics Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '20px' }}>
            <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>ACADEMIC CGPA</span>
              <h4 style={{ fontSize: '22px', fontWeight: 800, color: '#4f46e5', marginTop: '4px' }}>
                {student.cgpa_marks} <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 500 }}>/ 10</span>
              </h4>
            </div>

            <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>ATTENDANCE RATE</span>
              <h4 style={{ fontSize: '22px', fontWeight: 800, color: Number(student.attendance_percentage) >= 75 ? '#059669' : '#dc2626', marginTop: '4px' }}>
                {student.attendance_percentage}%
              </h4>
            </div>
          </div>

          {/* Contact & Personal Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px', color: '#334155', borderTop: '1px solid #f1f5f9', paddingTop: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Mail size={16} color="#64748b" />
              <span><strong>Email:</strong> {student.email}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Phone size={16} color="#64748b" />
              <span><strong>Phone:</strong> {student.phone}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Calendar size={16} color="#64748b" />
              <span><strong>Date of Birth:</strong> {student.dob ? new Date(student.dob).toLocaleDateString() : 'N/A'}</span>
            </div>
          </div>

          {/* Financial Breakdown */}
          <div style={{ background: '#f8fafc', borderRadius: '10px', padding: '14px', marginTop: '18px', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#1e293b' }}>Fee Statement</span>
              <span className={getFeeBadge(student.fees_status)}>{student.fees_status}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#64748b', marginTop: '6px' }}>
              <span>Total Fees: ₹{Number(student.fees_total).toLocaleString('en-IN')}</span>
              <span>Paid: <strong style={{ color: '#059669' }}>₹{Number(student.fees_paid).toLocaleString('en-IN')}</strong></span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#64748b', marginTop: '4px' }}>
              <span>Pending Dues:</span>
              <strong style={{ color: '#dc2626' }}>₹{Number(student.fees_total - student.fees_paid).toLocaleString('en-IN')}</strong>
            </div>
          </div>

          {/* AI Trigger Action */}
          <div style={{ marginTop: '20px' }}>
            <button
              onClick={() => {
                onClose();
                onTriggerAI(student);
              }}
              className="btn btn-ai"
              style={{ width: '100%', justifyContent: 'center', padding: '12px' }}
            >
              <Sparkles size={18} />
              <span>Analyze with AI Performance Engine</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetailsModal;
