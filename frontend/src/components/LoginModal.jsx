import React, { useState, useEffect } from 'react';
import { X, Lock, Mail, User, Phone, CheckCircle2, AlertCircle, Eye, EyeOff } from 'lucide-react';
import api from '../api/api';

/* ── small inline helpers ── */
const FieldError = ({ msg }) =>
  msg ? (
    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#dc2626', fontSize: '11px', marginTop: '4px' }}>
      <AlertCircle size={12} />
      <span>{msg}</span>
    </div>
  ) : null;

const FieldOk = ({ show }) =>
  show ? (
    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#059669', fontSize: '11px', marginTop: '4px' }}>
      <CheckCircle2 size={12} />
      <span>Looks good!</span>
    </div>
  ) : null;

/* ── validation helpers ── */
const validators = {
  name:       v => v.trim().length < 3 ? 'Full name must be at least 3 characters.' : '',
  roll_no:    v => v.trim().length < 2 ? 'Roll number is required (e.g. CO308).' : '',
  phone:      v => /^\d{10}$/.test(v.trim()) ? '' : 'Enter a valid 10-digit phone number.',
  email:      v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? '' : 'Enter a valid email address.',
  password:   v => v.length < 6 ? 'Password must be at least 6 characters.' : '',
};

const LoginModal = ({ isOpen, onClose, initialMode = 'login', onLoginSuccess }) => {
  const [isRegister, setIsRegister] = useState(initialMode === 'register');
  const [showPass, setShowPass]   = useState(false);
  const [loading, setLoading]     = useState(false);
  const [serverError, setServerError] = useState('');
  const [successMsg, setSuccessMsg]   = useState('');

  const [formData, setFormData] = useState({
    name: '', email: '', password: '', roll_no: '',
    department: 'Computer Engineering', semester: '6th Sem',
    phone: '', gender: 'Male'
  });

  // per-field touched & error state
  const [touched, setTouched]   = useState({});
  const [errors,  setErrors]    = useState({});

  /* reset when modal opens/mode changes */
  useEffect(() => {
    setIsRegister(initialMode === 'register');
    setServerError(''); setSuccessMsg('');
    setFormData({ name:'', email:'', password:'', roll_no:'', department:'Computer Engineering', semester:'6th Sem', phone:'', gender:'Male' });
    setTouched({}); setErrors({});
  }, [initialMode, isOpen]);

  if (!isOpen) return null;

  /* validate a single field */
  const validate = (name, value) => validators[name] ? validators[name](value) : '';

  /* handle input change + live validation */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (touched[name]) {
      setErrors(prev => ({ ...prev, [name]: validate(name, value) }));
    }
  };

  /* mark field as touched on blur → show validation */
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(prev => ({ ...prev, [name]: validate(name, value) }));
  };

  /* border color for an input */
  const borderColor = (field) => {
    if (!touched[field]) return '#cbd5e1';
    return errors[field] ? '#ef4444' : '#22c55e';
  };

  /* validate all relevant fields before submit */
  const validateAll = () => {
    const fields = isRegister
      ? ['name', 'roll_no', 'phone', 'email', 'password']
      : ['email', 'password'];

    const newErrors = {};
    const newTouched = {};
    fields.forEach(f => {
      newTouched[f] = true;
      newErrors[f]  = validate(f, formData[f]);
    });
    setTouched(newTouched);
    setErrors(newErrors);
    return Object.values(newErrors).every(e => e === '');
  };

  /* submit */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError(''); setSuccessMsg('');
    if (!validateAll()) return;

    setLoading(true);
    try {
      if (isRegister) {
        const res = await api.post('/auth/register', { ...formData, role: 'student' });
        if (res.data.success) {
          setSuccessMsg(`🎉 Registration Successful! Welcome, ${formData.name}! Your account has been created.`);
          setTimeout(() => {
            localStorage.setItem('sms_token', res.data.token);
            localStorage.setItem('sms_user', JSON.stringify(res.data.user));
            onLoginSuccess(res.data.user);
            onClose();
          }, 1800);
        }
      } else {
        const res = await api.post('/auth/login', { email: formData.email, password: formData.password });
        if (res.data.success) {
          const role = res.data.user.role === 'admin' ? 'Admin' : 'Student';
          setSuccessMsg(`✅ Login Successful! Welcome back, ${res.data.user.name}! (${role})`);
          setTimeout(() => {
            localStorage.setItem('sms_token', res.data.token);
            localStorage.setItem('sms_user', JSON.stringify(res.data.user));
            onLoginSuccess(res.data.user);
            onClose();
          }, 1500);
        }
      }
    } catch (err) {
      setServerError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  /* shared input wrapper style */
  const inputRow = (field, icon, type, placeholder, extraStyle = {}) => (
    <div style={{ display: 'flex', alignItems: 'center', background: '#f8fafc', border: `1.5px solid ${borderColor(field)}`, borderRadius: '10px', padding: '0 12px', transition: 'border-color 0.2s', ...extraStyle }}>
      {icon}
      <input
        type={type}
        name={field}
        required
        placeholder={placeholder}
        value={formData[field]}
        onChange={handleChange}
        onBlur={handleBlur}
        style={{ width:'100%', padding:'11px 10px', border:'none', background:'transparent', outline:'none', fontSize:'13px' }}
      />
    </div>
  );

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: isRegister ? '560px' : '440px' }}>

        {/* ── Header ── */}
        <div style={{ padding:'24px 28px 18px 28px', borderBottom:'1px solid #e2e8f0', display:'flex', alignItems:'center', justifyContent:'space-between', background:'linear-gradient(135deg,#fff 0%,#f8fafc 100%)' }}>
          <div>
            <h3 style={{ fontSize:'20px', fontWeight:900, color:'#0f172a' }}>
              {isRegister ? 'Create Student Account' : 'Sign In to Portal'}
            </h3>
            <p style={{ fontSize:'12px', color:'#64748b', marginTop:'2px' }}>
              {isRegister ? 'Fill all fields correctly to register' : 'Enter your registered email & password'}
            </p>
          </div>
          <button onClick={onClose} style={{ border:'none', background:'#f1f5f9', borderRadius:'50%', width:'32px', height:'32px', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', color:'#64748b' }}>
            <X size={18} />
          </button>
        </div>

        {/* ── Tab toggle ── */}
        <div style={{ padding:'16px 28px 0 28px' }}>
          <div style={{ display:'flex', background:'#f1f5f9', padding:'4px', borderRadius:'12px', gap:'4px' }}>
            {['Sign In', 'Sign Up (Register)'].map((label, i) => {
              const active = i === 0 ? !isRegister : isRegister;
              return (
                <button key={label} type="button"
                  onClick={() => { setIsRegister(i === 1); setServerError(''); setSuccessMsg(''); setTouched({}); setErrors({}); }}
                  style={{ flex:1, padding:'10px 12px', borderRadius:'8px', border:'none', background: active ? '#fff' : 'transparent', color: active ? (i===0?'#4f46e5':'#059669') : '#64748b', fontWeight:800, fontSize:'13px', cursor:'pointer', boxShadow: active ? '0 2px 8px rgba(0,0,0,0.06)' : 'none', transition:'all 0.2s' }}>
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Form ── */}
        <form onSubmit={handleSubmit} style={{ padding:'20px 28px 28px 28px' }}>

          {/* Server error banner */}
          {serverError && (
            <div style={{ display:'flex', alignItems:'center', gap:'8px', background:'#fee2e2', border:'1px solid #fecaca', color:'#dc2626', padding:'10px 14px', borderRadius:'10px', fontSize:'13px', marginBottom:'16px' }}>
              <AlertCircle size={16} />
              <span>{serverError}</span>
            </div>
          )}

          {/* Success banner */}
          {successMsg && (
            <div style={{ display:'flex', alignItems:'center', gap:'8px', background:'#dcfce7', border:'1px solid #bbf7d0', color:'#15803d', padding:'12px 14px', borderRadius:'10px', fontSize:'13px', marginBottom:'16px', fontWeight:700 }}>
              <CheckCircle2 size={18} />
              <span>{successMsg}</span>
            </div>
          )}

          {/* ── REGISTER-ONLY FIELDS ── */}
          {isRegister && (
            <>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'14px', marginBottom:'14px' }}>
                {/* Full Name */}
                <div>
                  <label style={{ display:'block', fontSize:'12px', fontWeight:700, color:'#475569', marginBottom:'4px' }}>Full Name *</label>
                  {inputRow('name', <User size={15} color="#94a3b8" />, 'text', 'e.g. Rahul Sharma')}
                  <FieldError msg={touched.name && errors.name} />
                  <FieldOk show={touched.name && !errors.name && formData.name.length >= 3} />
                </div>

                {/* Roll Number */}
                <div>
                  <label style={{ display:'block', fontSize:'12px', fontWeight:700, color:'#475569', marginBottom:'4px' }}>Roll Number *</label>
                  {inputRow('roll_no', null, 'text', 'e.g. CO308')}
                  <FieldError msg={touched.roll_no && errors.roll_no} />
                  <FieldOk show={touched.roll_no && !errors.roll_no} />
                </div>

                {/* Department */}
                <div>
                  <label style={{ display:'block', fontSize:'12px', fontWeight:700, color:'#475569', marginBottom:'4px' }}>Department *</label>
                  <select name="department" value={formData.department} onChange={handleChange}
                    style={{ width:'100%', padding:'11px 12px', borderRadius:'10px', border:'1.5px solid #cbd5e1', fontSize:'13px', outline:'none', background:'#fff' }}>
                    <option>Computer Engineering</option>
                    <option>Information Technology</option>
                    <option>Civil Engineering</option>
                    <option>Mechanical Engineering</option>
                  </select>
                </div>

                {/* Semester */}
                <div>
                  <label style={{ display:'block', fontSize:'12px', fontWeight:700, color:'#475569', marginBottom:'4px' }}>Semester *</label>
                  <select name="semester" value={formData.semester} onChange={handleChange}
                    style={{ width:'100%', padding:'11px 12px', borderRadius:'10px', border:'1.5px solid #cbd5e1', fontSize:'13px', outline:'none', background:'#fff' }}>
                    <option>6th Sem</option>
                    <option>5th Sem</option>
                    <option>4th Sem</option>
                    <option>3rd Sem</option>
                  </select>
                </div>

                {/* Phone */}
                <div>
                  <label style={{ display:'block', fontSize:'12px', fontWeight:700, color:'#475569', marginBottom:'4px' }}>Phone Number *</label>
                  {inputRow('phone', <Phone size={15} color="#94a3b8" />, 'tel', '10-digit mobile number')}
                  <FieldError msg={touched.phone && errors.phone} />
                  <FieldOk show={touched.phone && !errors.phone} />
                </div>

                {/* Gender */}
                <div>
                  <label style={{ display:'block', fontSize:'12px', fontWeight:700, color:'#475569', marginBottom:'4px' }}>Gender</label>
                  <select name="gender" value={formData.gender} onChange={handleChange}
                    style={{ width:'100%', padding:'11px 12px', borderRadius:'10px', border:'1.5px solid #cbd5e1', fontSize:'13px', outline:'none', background:'#fff' }}>
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </div>
              </div>
            </>
          )}

          {/* Email */}
          <div style={{ marginBottom:'14px' }}>
            <label style={{ display:'block', fontSize:'12px', fontWeight:700, color:'#475569', marginBottom:'6px' }}>Email Address *</label>
            {inputRow('email', <Mail size={16} color="#94a3b8" />, 'email', 'your.email@example.com')}
            <FieldError msg={touched.email && errors.email} />
            <FieldOk show={touched.email && !errors.email} />
          </div>

          {/* Password */}
          <div style={{ marginBottom:'24px' }}>
            <label style={{ display:'block', fontSize:'12px', fontWeight:700, color:'#475569', marginBottom:'6px' }}>Password *</label>
            <div style={{ display:'flex', alignItems:'center', background:'#f8fafc', border:`1.5px solid ${borderColor('password')}`, borderRadius:'10px', padding:'0 12px', transition:'border-color 0.2s' }}>
              <Lock size={16} color="#94a3b8" />
              <input
                type={showPass ? 'text' : 'password'}
                name="password"
                required
                placeholder="Minimum 6 characters"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{ flex:1, padding:'11px 10px', border:'none', background:'transparent', outline:'none', fontSize:'13px' }}
              />
              <button type="button" onClick={() => setShowPass(p => !p)}
                style={{ background:'none', border:'none', cursor:'pointer', color:'#94a3b8', padding:'4px', display:'flex', alignItems:'center' }}>
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <FieldError msg={touched.password && errors.password} />
            {touched.password && !errors.password && (
              <div style={{ display:'flex', alignItems:'center', gap:'5px', color:'#059669', fontSize:'11px', marginTop:'4px' }}>
                <CheckCircle2 size={12} /><span>Strong password!</span>
              </div>
            )}
          </div>

          {/* Submit */}
          <button type="submit" disabled={loading || !!successMsg}
            className="btn"
            style={{ width:'100%', justifyContent:'center', padding:'13px', fontWeight:800, fontSize:'14px',
              background: isRegister ? 'linear-gradient(135deg,#059669 0%,#10b981 100%)' : 'linear-gradient(135deg,#4f46e5 0%,#6366f1 100%)',
              color:'#fff',
              boxShadow: isRegister ? '0 4px 14px rgba(16,185,129,0.35)' : '0 4px 14px rgba(79,70,229,0.35)',
              opacity: (loading || !!successMsg) ? 0.75 : 1
            }}>
            {loading ? 'Processing...' : successMsg ? 'Redirecting...' : (isRegister ? 'Register & Create Account' : 'Sign In to Portal')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
