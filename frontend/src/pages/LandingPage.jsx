import React, { useState } from 'react';
import { 
  GraduationCap, 
  ShieldCheck, 
  Sparkles, 
  BarChart3, 
  Users, 
  CreditCard, 
  ArrowRight, 
  CheckCircle2, 
  BookOpen, 
  Award,
  Zap,
  Mail,
  Phone,
  MapPin,
  Send,
  Code2,
  ExternalLink,
  Laptop,
  Check,
  LogIn,
  UserPlus
} from 'lucide-react';

const LandingPage = ({ onOpenAuth, onOpenContact }) => {
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setContactSubmitted(true);
    setTimeout(() => {
      setContactSubmitted(false);
      setContactForm({ name: '', email: '', message: '' });
    }, 4000);
  };

  return (
    <div className="bg-mesh" style={{ minHeight: '100vh', color: '#0f172a' }}>
      {/* 1. TOP HEADER & NAVBAR */}
      <header className="glass-nav" style={{
        height: '80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 48px',
        position: 'relative',
        zIndex: 10
      }}>
        {/* Brand Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 14px rgba(79, 70, 229, 0.35)'
          }}>
            <GraduationCap size={26} color="#ffffff" />
          </div>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.5px', lineHeight: 1.1 }}>
              EduManage <span style={{ color: '#4f46e5' }}>Pro</span>
            </h2>
            <p style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>Student Management & AI Hub</p>
          </div>
        </div>

        {/* Navigation Menu Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
          <a href="#home" style={{ textDecoration: 'none', color: '#1e293b', fontWeight: 600, fontSize: '14px', transition: 'color 0.2s' }}>Home</a>
          <a href="#services" style={{ textDecoration: 'none', color: '#64748b', fontWeight: 600, fontSize: '14px', transition: 'color 0.2s' }}>Services</a>
          <a href="#ai-advisor" style={{ textDecoration: 'none', color: '#64748b', fontWeight: 600, fontSize: '14px', transition: 'color 0.2s' }}>AI Advisor</a>
          <a href="#developer" style={{ textDecoration: 'none', color: '#64748b', fontWeight: 600, fontSize: '14px', transition: 'color 0.2s' }}>Developer</a>
          <button onClick={onOpenContact} style={{ background: 'none', border: 'none', padding: 0, color: '#64748b', fontWeight: 600, fontSize: '14px', cursor: 'pointer' }}>Contact Us</button>
        </nav>

        {/* Unified Auth Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={() => onOpenAuth('login')}
            className="btn btn-secondary"
            style={{ padding: '9px 18px', fontSize: '13px' }}
          >
            <LogIn size={16} color="#4f46e5" />
            <span>Sign In</span>
          </button>

          <button
            onClick={() => onOpenAuth('register')}
            className="btn btn-primary"
            style={{ padding: '9px 20px', fontSize: '13px' }}
          >
            <UserPlus size={16} />
            <span>Sign Up</span>
          </button>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section id="home" style={{
        padding: '70px 48px 80px 48px',
        maxWidth: '1320px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1.15fr 0.85fr',
        gap: '48px',
        alignItems: 'center'
      }}>
        <div>
          {/* Developer Attribution Pill */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 16px',
            borderRadius: '30px',
            background: 'linear-gradient(90deg, #eef2ff 0%, #ede9fe 100%)',
            border: '1px solid #c7d2fe',
            color: '#4338ca',
            fontSize: '13px',
            fontWeight: 700,
            marginBottom: '20px'
          }}>
            <Code2 size={16} color="#4f46e5" />
            <span>Developed by <strong>Jay Patole</strong> • Diploma Final Year Project</span>
          </div>

          <h1 style={{
            fontSize: '52px',
            fontWeight: 900,
            color: '#0f172a',
            letterSpacing: '-1.5px',
            lineHeight: '1.12'
          }}>
            Smart Student Management with <span style={{
              background: 'linear-gradient(135deg, #4f46e5 0%, #a855f7 50%, #ec4899 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>AI Analytics</span>
          </h1>

          <p style={{
            fontSize: '17px',
            color: '#475569',
            marginTop: '20px',
            lineHeight: '1.6',
            maxWidth: '600px'
          }}>
            A unified fullstack platform designed for modern polytechnic & engineering institutions. Empowering students with real-time academic records and smart AI study mentorship.
          </p>

          {/* Action CTAs */}
          <div style={{ display: 'flex', gap: '16px', marginTop: '36px', flexWrap: 'wrap' }}>
            <button
              onClick={() => onOpenAuth('login')}
              className="btn btn-primary"
              style={{ padding: '14px 28px', fontSize: '15px', fontWeight: 800 }}
            >
              <LogIn size={18} />
              <span>Sign In to Portal</span>
              <ArrowRight size={18} />
            </button>

            <button
              onClick={() => onOpenAuth('register')}
              className="btn btn-emerald"
              style={{ padding: '14px 28px', fontSize: '15px', fontWeight: 800 }}
            >
              <UserPlus size={18} />
              <span>New Student Registration</span>
            </button>
          </div>

          {/* Feature Highlights */}
          <div style={{ display: 'flex', gap: '24px', marginTop: '40px', paddingTop: '24px', borderTop: '1px solid #e2e8f0' }}>
            <div>
              <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#4f46e5' }}>100%</h3>
              <p style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>MySQL Fullstack Live</p>
            </div>
            <div style={{ width: '1px', background: '#e2e8f0' }} />
            <div>
              <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#059669' }}>AI Powered</h3>
              <p style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>Risk & Study Advisor</p>
            </div>
            <div style={{ width: '1px', background: '#e2e8f0' }} />
            <div>
              <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#d97706' }}>Instant</h3>
              <p style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>Email Confirmations</p>
            </div>
          </div>
        </div>

        {/* Hero Visual Card / Image */}
        <div className="animate-float" style={{ position: 'relative' }}>
          <div style={{
            position: 'absolute',
            inset: '-15px',
            background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.3) 0%, rgba(236, 72, 153, 0.25) 100%)',
            borderRadius: '28px',
            filter: 'blur(20px)',
            zIndex: 1
          }} />

          <div className="card glass-panel" style={{
            position: 'relative',
            zIndex: 2,
            padding: '28px',
            borderRadius: '24px',
            border: '2px solid rgba(255, 255, 255, 0.8)'
          }}>
            <img
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=700&q=80"
              alt="Students collaborating"
              style={{ width: '100%', height: '260px', objectFit: 'cover', borderRadius: '16px', marginBottom: '20px' }}
            />

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <span className="badge badge-success">Live Portal Active</span>
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', marginTop: '6px' }}>
                  Academic Year 2026-27
                </h4>
                <p style={{ fontSize: '12px', color: '#64748b' }}>Computer Engg • MSBTE Syllabus</p>
              </div>
              <div style={{
                background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                color: '#ffffff',
                padding: '10px 16px',
                borderRadius: '12px',
                textAlign: 'center'
              }}>
                <span style={{ fontSize: '18px', fontWeight: 900 }}>9.2</span>
                <p style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Top CGPA</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SERVICES & FEATURES SECTION */}
      <section id="services" style={{
        background: '#ffffff',
        borderTop: '1px solid #e2e8f0',
        borderBottom: '1px solid #e2e8f0',
        padding: '80px 48px'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <span className="badge badge-purple" style={{ marginBottom: '10px' }}>Our Services</span>
            <h2 style={{ fontSize: '36px', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.8px' }}>
              Comprehensive Academic Management Suite
            </h2>
            <p style={{ fontSize: '15px', color: '#64748b', marginTop: '8px', maxWidth: '600px', margin: '8px auto 0 auto' }}>
              Everything a student and administrator needs, built with real-time MySQL synchronization and responsive React design.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {/* Service 1 */}
            <div className="card" style={{ padding: '28px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#eef2ff', color: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                <Users size={24} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a' }}>Student Records Directory</h3>
              <p style={{ fontSize: '13px', color: '#64748b', marginTop: '8px', lineHeight: '1.6' }}>
                Full CRUD operations for managing student profiles, roll numbers, departments, contact info, and semester records.
              </p>
            </div>

            {/* Service 2 */}
            <div className="card" style={{ padding: '28px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                <CheckCircle2 size={24} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a' }}>Attendance & 75% Tracker</h3>
              <p style={{ fontSize: '13px', color: '#64748b', marginTop: '8px', lineHeight: '1.6' }}>
                Real-time attendance calculations with automated warnings for students falling below the mandatory university threshold.
              </p>
            </div>

            {/* Service 3 */}
            <div className="card" style={{ padding: '28px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#fdf2f8', color: '#db2777', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                <Sparkles size={24} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a' }}>AI Academic Advisor</h3>
              <p style={{ fontSize: '13px', color: '#64748b', marginTop: '8px', lineHeight: '1.6' }}>
                Predictive risk assessment scoring and customized revision roadmaps generated based on individual student telemetry.
              </p>
            </div>

            {/* Service 4 */}
            <div className="card" style={{ padding: '28px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#fffbeb', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                <CreditCard size={24} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a' }}>College Fees & Finance</h3>
              <p style={{ fontSize: '13px', color: '#64748b', marginTop: '8px', lineHeight: '1.6' }}>
                Instant fee payment status verification, receivables calculation, outstanding dues tracking, and receipt generation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. AI ADVISOR SHOWCASE SECTION */}
      <section id="ai-advisor" style={{ padding: '80px 48px', maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{
          background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 60%, #4338ca 100%)',
          borderRadius: '24px',
          padding: '48px',
          color: '#ffffff',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '40px',
          alignItems: 'center',
          boxShadow: '0 20px 40px rgba(49, 46, 129, 0.3)'
        }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.15)', padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: 700 }}>
              <Sparkles size={16} color="#fde047" />
              <span>Fullstack AI Module (Syllabus Month 2)</span>
            </div>
            <h2 style={{ fontSize: '36px', fontWeight: 900, marginTop: '16px', color: '#ffffff', letterSpacing: '-0.8px' }}>
              Empowering Students with Intelligent AI Insights
            </h2>
            <p style={{ fontSize: '14px', color: '#c7d2fe', marginTop: '14px', lineHeight: '1.6' }}>
              Every student who logs into EduManage Pro receives an AI-generated academic report highlighting their strong subjects, attendance risk factors, and recommended study tasks.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#e0e7ff' }}>
                <Check size={18} color="#4ade80" />
                <span>Automated Academic Risk Level (Low / Moderate / High)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#e0e7ff' }}>
                <Check size={18} color="#4ade80" />
                <span>Personalized placement & study recommendations</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#e0e7ff' }}>
                <Check size={18} color="#4ade80" />
                <span>Email alerts sent directly to registered student inbox</span>
              </div>
            </div>

            <button
              onClick={() => onOpenAuth('login')}
              className="btn"
              style={{ background: '#ffffff', color: '#1e1b4b', fontWeight: 800, marginTop: '30px', padding: '12px 24px' }}
            >
              <span>Try AI Advisor Now</span>
              <ArrowRight size={16} color="#4f46e5" />
            </button>
          </div>

          {/* AI Mock Card */}
          <div style={{ background: 'rgba(255, 255, 255, 0.08)', backdropFilter: 'blur(12px)', borderRadius: '18px', padding: '28px', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span style={{ fontSize: '12px', color: '#a5b4fc', fontWeight: 700 }}>AI DIAGNOSTIC PREVIEW</span>
              <span className="badge badge-success">Low Academic Risk</span>
            </div>
            <h4 style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff' }}>Rahul Sharma (CO301)</h4>
            <p style={{ fontSize: '13px', color: '#c7d2fe', marginTop: '8px', lineHeight: '1.5' }}>
              "Outstanding performer with 8.75 CGPA and 88.5% attendance. Eligible for national technical hackathons and core engineering electives."
            </p>
            <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              <span style={{ fontSize: '11px', color: '#93c5fd', fontWeight: 700 }}>AI RECOMMENDATION:</span>
              <p style={{ fontSize: '12px', color: '#ffffff', marginTop: '4px' }}>
                🎯 Focus on Fullstack System Design and GitHub portfolio projects for campus placements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. DEVELOPER PROFILE SECTION (JAY PATOLE) */}
      <section id="developer" style={{
        background: '#f8fafc',
        borderTop: '1px solid #e2e8f0',
        padding: '70px 48px'
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <span className="badge badge-purple" style={{ marginBottom: '12px' }}>Developer Portfolio</span>
          <h2 style={{ fontSize: '32px', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.5px' }}>
            About the Developer
          </h2>

          <div className="card" style={{
            marginTop: '32px',
            padding: '36px',
            display: 'flex',
            alignItems: 'center',
            gap: '32px',
            textAlign: 'left',
            flexWrap: 'wrap',
            background: '#ffffff',
            border: '2px solid #e2e8f0'
          }}>
            <div style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '36px',
              fontWeight: 900,
              boxShadow: '0 8px 24px rgba(79, 70, 229, 0.35)',
              flexShrink: 0
            }}>
              JP
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <h3 style={{ fontSize: '22px', fontWeight: 900, color: '#0f172a' }}>Jay Patole</h3>
                <span className="badge badge-success">Project Lead & Developer</span>
              </div>
              <p style={{ fontSize: '13px', color: '#4f46e5', fontWeight: 700, marginTop: '2px' }}>
                Diploma in Computer Engineering (3rd Year)
              </p>
              <p style={{ fontSize: '14px', color: '#475569', marginTop: '10px', lineHeight: '1.6' }}>
                Engineered the <strong>EduManage Pro</strong> platform end-to-end utilizing modern Fullstack web technologies: React.js, Node.js, Express.js, MySQL relational database architecture, and intelligent rule-based AI performance algorithms.
              </p>
              
              <div style={{ display: 'flex', gap: '12px', marginTop: '16px', fontSize: '13px', color: '#334155' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Mail size={15} color="#4f46e5" />
                  <span>jaymaheshpatole@gmail.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CONTACT US SECTION */}
      <section id="contact" style={{
        padding: '70px 48px',
        maxWidth: '1100px',
        margin: '0 auto'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span className="badge badge-info" style={{ marginBottom: '10px' }}>Get in Touch</span>
          <h2 style={{ fontSize: '32px', fontWeight: 900, color: '#0f172a' }}>Contact Us</h2>
          <p style={{ fontSize: '14px', color: '#64748b', marginTop: '6px' }}>
            Have questions regarding admissions, student records, or technical support? Send us a message.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '32px' }}>
          {/* Contact Info Card */}
          <div className="card" style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)', color: '#ffffff', padding: '32px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#ffffff' }}>Department Office</h3>
            <p style={{ fontSize: '13px', color: '#c7d2fe', marginTop: '8px' }}>
              Department of Computer Engineering, Polytechnic Campus.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginTop: '30px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px' }}>
                <Mail size={18} color="#818cf8" />
                <span>jaymaheshpatole@gmail.com</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px' }}>
                <Phone size={18} color="#818cf8" />
                <span>+91 98000 00000</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px' }}>
                <MapPin size={18} color="#818cf8" />
                <span>Maharashtra, India</span>
              </div>
            </div>

            <div style={{ marginTop: '40px', padding: '16px', background: 'rgba(255,255,255,0.06)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <p style={{ fontSize: '12px', color: '#c7d2fe', lineHeight: '1.4' }}>
                ⚡ Student self-service portal is available 24/7 with real-time academic telemetry.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="card" style={{ padding: '32px' }}>
            {contactSubmitted ? (
              <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#dcfce7', color: '#15803d', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
                  <Check size={24} />
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a' }}>Message Sent Successfully!</h3>
                <p style={{ fontSize: '13px', color: '#64748b', marginTop: '6px' }}>
                  Thank you for reaching out. We will get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit}>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#475569', marginBottom: '6px' }}>
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', outline: 'none' }}
                  />
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#475569', marginBottom: '6px' }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', outline: 'none' }}
                  />
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#475569', marginBottom: '6px' }}>
                    Message / Query
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Write your message here..."
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', outline: 'none', resize: 'vertical' }}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: '100%', justifyContent: 'center', padding: '12px' }}
                >
                  <Send size={16} />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer style={{
        background: '#0f172a',
        color: '#ffffff',
        padding: '36px 48px',
        textAlign: 'center',
        borderTop: '1px solid rgba(255,255,255,0.1)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ textAlign: 'left' }}>
            <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#ffffff' }}>EduManage Pro</h4>
            <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>
              Developed by <strong>Jay Patole</strong> • Diploma in Computer Engineering
            </p>
          </div>

          <div style={{ display: 'flex', gap: '20px', fontSize: '13px', color: '#94a3b8' }}>
            <a href="#home" style={{ color: '#94a3b8', textDecoration: 'none' }}>Home</a>
            <a href="#services" style={{ color: '#94a3b8', textDecoration: 'none' }}>Services</a>
            <a href="#developer" style={{ color: '#94a3b8', textDecoration: 'none' }}>Developer</a>
            <button onClick={onOpenContact} style={{ background: 'none', border: 'none', padding: 0, color: '#94a3b8', fontSize: '13px', cursor: 'pointer' }}>Contact</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
