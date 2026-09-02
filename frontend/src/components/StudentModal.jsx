import React, { useState, useEffect } from 'react';
import { X, Save, UserPlus, Edit3 } from 'lucide-react';

const StudentModal = ({ isOpen, onClose, onSave, studentToEdit }) => {
  const [formData, setFormData] = useState({
    roll_no: '',
    full_name: '',
    email: '',
    phone: '',
    gender: 'Male',
    dob: '2004-01-01',
    department: 'Computer Engineering',
    semester: '6th Sem',
    attendance_percentage: 85,
    cgpa_marks: 8.5,
    fees_total: 45000,
    fees_paid: 45000,
    fees_status: 'Paid',
    status: 'Active'
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (studentToEdit) {
      setFormData({
        ...studentToEdit,
        dob: studentToEdit.dob ? studentToEdit.dob.split('T')[0] : '2004-01-01'
      });
    } else {
      setFormData({
        roll_no: '',
        full_name: '',
        email: '',
        phone: '',
        gender: 'Male',
        dob: '2004-01-01',
        department: 'Computer Engineering',
        semester: '6th Sem',
        attendance_percentage: 85,
        cgpa_marks: 8.5,
        fees_total: 45000,
        fees_paid: 45000,
        fees_status: 'Paid',
        status: 'Active'
      });
    }
    setError('');
  }, [studentToEdit, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      
      // Auto compute fee status when fees_paid or fees_total change
      if (name === 'fees_paid' || name === 'fees_total') {
        const total = Number(name === 'fees_total' ? value : prev.fees_total);
        const paid = Number(name === 'fees_paid' ? value : prev.fees_paid);
        if (paid >= total && total > 0) {
          updated.fees_status = 'Paid';
        } else if (paid > 0) {
          updated.fees_status = 'Partial';
        } else {
          updated.fees_status = 'Pending';
        }
      }
      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.roll_no || !formData.full_name || !formData.email || !formData.phone) {
      setError('Please fill in all mandatory fields.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      await onSave(formData, studentToEdit?.id);
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Error saving student information');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '640px' }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px 24px',
          borderBottom: '1px solid #e2e8f0'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {studentToEdit ? <Edit3 size={20} color="#4f46e5" /> : <UserPlus size={20} color="#4f46e5" />}
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a' }}>
              {studentToEdit ? 'Edit Student Record' : 'Register New Student'}
            </h3>
          </div>
          <button 
            onClick={onClose} 
            style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#64748b' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} style={{ padding: '24px' }}>
          {error && (
            <div style={{
              background: '#fee2e2',
              border: '1px solid #fecaca',
              color: '#dc2626',
              padding: '10px 14px',
              borderRadius: '8px',
              fontSize: '13px',
              marginBottom: '18px'
            }}>
              {error}
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {/* Roll No */}
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>
                Roll Number *
              </label>
              <input
                type="text"
                name="roll_no"
                required
                placeholder="e.g. CO301"
                value={formData.roll_no}
                onChange={handleChange}
                style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', outline: 'none' }}
              />
            </div>

            {/* Full Name */}
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>
                Full Name *
              </label>
              <input
                type="text"
                name="full_name"
                required
                placeholder="e.g. Rahul Sharma"
                value={formData.full_name}
                onChange={handleChange}
                style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', outline: 'none' }}
              />
            </div>

            {/* Email */}
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="rahul@example.com"
                value={formData.email}
                onChange={handleChange}
                style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', outline: 'none' }}
              />
            </div>

            {/* Phone */}
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>
                Phone Number *
              </label>
              <input
                type="text"
                name="phone"
                required
                placeholder="9876543210"
                value={formData.phone}
                onChange={handleChange}
                style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', outline: 'none' }}
              />
            </div>

            {/* Department */}
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>
                Department *
              </label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', outline: 'none', background: '#fff' }}
              >
                <option value="Computer Engineering">Computer Engineering</option>
                <option value="Information Technology">Information Technology</option>
                <option value="Mechanical Engineering">Mechanical Engineering</option>
                <option value="Civil Engineering">Civil Engineering</option>
                <option value="Electronics & Telecomm">Electronics & Telecomm</option>
                <option value="Artificial Intelligence & DS">Artificial Intelligence & DS</option>
              </select>
            </div>

            {/* Semester */}
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>
                Semester *
              </label>
              <select
                name="semester"
                value={formData.semester}
                onChange={handleChange}
                style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', outline: 'none', background: '#fff' }}
              >
                <option value="1st Sem">1st Sem (1st Year)</option>
                <option value="2nd Sem">2nd Sem (1st Year)</option>
                <option value="3rd Sem">3rd Sem (2nd Year)</option>
                <option value="4th Sem">4th Sem (2nd Year)</option>
                <option value="5th Sem">5th Sem (3rd Year)</option>
                <option value="6th Sem">6th Sem (3rd Year)</option>
              </select>
            </div>

            {/* Attendance % */}
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>
                Attendance % (0 - 100)
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="100"
                name="attendance_percentage"
                value={formData.attendance_percentage}
                onChange={handleChange}
                style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', outline: 'none' }}
              />
            </div>

            {/* CGPA Marks */}
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>
                CGPA / Marks (0.0 - 10.0)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="10"
                name="cgpa_marks"
                value={formData.cgpa_marks}
                onChange={handleChange}
                style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', outline: 'none' }}
              />
            </div>

            {/* Fees Total */}
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>
                Total Fees (₹)
              </label>
              <input
                type="number"
                name="fees_total"
                value={formData.fees_total}
                onChange={handleChange}
                style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', outline: 'none' }}
              />
            </div>

            {/* Fees Paid */}
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>
                Fees Paid (₹)
              </label>
              <input
                type="number"
                name="fees_paid"
                value={formData.fees_paid}
                onChange={handleChange}
                style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', outline: 'none' }}
              />
            </div>

            {/* Status */}
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', outline: 'none', background: '#fff' }}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            {/* Gender */}
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', outline: 'none', background: '#fff' }}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Footer Actions */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: '12px',
            marginTop: '24px',
            paddingTop: '16px',
            borderTop: '1px solid #e2e8f0'
          }}>
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
            >
              <Save size={16} />
              <span>{loading ? 'Saving...' : (studentToEdit ? 'Update Student' : 'Save Student')}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentModal;
