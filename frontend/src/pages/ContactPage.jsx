import React, { useState } from 'react';
import {
  ArrowLeft,
  Check,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Send,
  Wrench
} from 'lucide-react';

const contactPoints = [
  {
    icon: GraduationCap,
    title: 'Admissions & Student Support',
    description: 'Get help with admissions, student records, fees, and academic queries.',
    value: 'jaymaheshpatole@gmail.com',
    href: 'mailto:jaymaheshpatole@gmail.com'
  },
  {
    icon: Wrench,
    title: 'Technical Support',
    description: 'Report login issues, portal problems, or any technical difficulty.',
    value: '+91 98000 00000',
    href: 'tel:+919800000000'
  }
];

const ContactPage = ({ onBackHome }) => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: '', email: '', message: '' });
    }, 4000);
  };

  return (
    <div className="bg-mesh" style={{ minHeight: '100vh', color: '#0f172a' }}>
      <header className="glass-nav" style={{ height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 48px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)', width: '42px', height: '42px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <GraduationCap size={24} color="#ffffff" />
          </div>
          <div>
            <h2 style={{ fontSize: '19px', fontWeight: 800 }}>EduManage <span style={{ color: '#4f46e5' }}>Pro</span></h2>
            <p style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>Student Management & AI Hub</p>
          </div>
        </div>
        <button onClick={onBackHome} className="btn btn-secondary" style={{ fontSize: '13px' }}>
          <ArrowLeft size={16} />
          <span>Back to Home</span>
        </button>
      </header>

      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '64px 48px 80px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span className="badge badge-info" style={{ marginBottom: '10px' }}>Get in Touch</span>
          <h1 style={{ fontSize: '40px', fontWeight: 900, color: '#0f172a' }}>How can we help?</h1>
          <p style={{ fontSize: '14px', color: '#64748b', marginTop: '8px' }}>Choose the right support point or send us a message.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.15fr', gap: '28px', alignItems: 'start' }}>
          <section className="card" style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)', color: '#ffffff', padding: '30px' }}>
            <h2 style={{ fontSize: '21px', fontWeight: 800, color: '#ffffff' }}>Contact Points</h2>
            <p style={{ fontSize: '13px', color: '#c7d2fe', marginTop: '8px', lineHeight: 1.5 }}>Our team is ready to help students, parents, and faculty.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '28px' }}>
              {contactPoints.map(({ icon: Icon, title, description, value, href }) => (
                <div key={title} style={{ paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.14)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Icon size={19} color="#a5b4fc" />
                    <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#ffffff' }}>{title}</h3>
                  </div>
                  <p style={{ fontSize: '12px', color: '#c7d2fe', lineHeight: 1.5, margin: '8px 0' }}>{description}</p>
                  <a href={href} style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', color: '#ffffff', fontSize: '12px', fontWeight: 700, textDecoration: 'none' }}>
                    {title.startsWith('Admissions') ? <Mail size={14} /> : <Phone size={14} />}
                    {value}
                  </a>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '28px', paddingTop: '18px', borderTop: '1px solid rgba(255,255,255,0.14)', color: '#c7d2fe', fontSize: '12px' }}>
              <MapPin size={15} color="#a5b4fc" /> Maharashtra, India
            </div>
          </section>

          <section className="card" style={{ padding: '30px' }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '50px 20px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#dcfce7', color: '#15803d', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}><Check size={24} /></div>
                <h2 style={{ fontSize: '19px', fontWeight: 800 }}>Message Sent Successfully!</h2>
                <p style={{ fontSize: '13px', color: '#64748b', marginTop: '6px' }}>We will get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h2 style={{ fontSize: '21px', fontWeight: 800, marginBottom: '22px' }}>Send a message</h2>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#475569', marginBottom: '6px' }}>Your Name</label>
                <input required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="e.g. Rahul Sharma" style={{ width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', marginBottom: '16px' }} />
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#475569', marginBottom: '6px' }}>Email Address</label>
                <input required type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder="name@example.com" style={{ width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', marginBottom: '16px' }} />
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#475569', marginBottom: '6px' }}>Message / Query</label>
                <textarea required rows={5} value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} placeholder="Write your message here..." style={{ width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', resize: 'vertical' }} />
                <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '20px', padding: '12px' }}><Send size={16} /><span>Send Message</span></button>
              </form>
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

export default ContactPage;
