import React, { useState, useEffect } from 'react';
import LandingPage from './pages/LandingPage';
import ContactPage from './pages/ContactPage';
import StudentPortal from './pages/StudentPortal';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import StudentsList from './pages/StudentsList';
import FeesView from './pages/FeesView';
import AIAdvisorView from './pages/AIAdvisorView';
import AnalyticsCharts from './components/AnalyticsCharts';
import StudentModal from './components/StudentModal';
import StudentDetailsModal from './components/StudentDetailsModal';
import AIAdvisorModal from './components/AIAdvisorModal';
import LoginModal from './components/LoginModal';
import api from './api/api';

function App() {
  // Main Application State View: 'home' | 'student_portal' | 'admin_portal'
  const [currentView, setCurrentView] = useState('home');
  const [adminActiveTab, setAdminActiveTab] = useState('dashboard');

  const [students, setStudents] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  // Filters & Global Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  // Modals state
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authInitialMode, setAuthInitialMode] = useState('student_login');

  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [studentToEdit, setStudentToEdit] = useState(null);

  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [aiStudent, setAiStudent] = useState(null);

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('sms_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Fetch Students & Stats
  const fetchData = async () => {
    try {
      setLoading(true);
      const [studentsRes, statsRes] = await Promise.all([
        api.get('/students'),
        api.get('/students/stats')
      ]);

      if (studentsRes.data.success) {
        setStudents(studentsRes.data.data);
      }
      if (statsRes.data.success) {
        setStats(statsRes.data.data);
      }
    } catch (error) {
      console.error('Error loading data from backend:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // CRUD Handlers for Admin
  const handleSaveStudent = async (formData, studentId) => {
    if (studentId) {
      await api.put(`/students/${studentId}`, formData);
    } else {
      await api.post('/students', formData);
    }
    await fetchData();
  };

  const handleDeleteStudent = async (studentId) => {
    if (window.confirm('Are you sure you want to delete this student record?')) {
      try {
        await api.delete(`/students/${studentId}`);
        await fetchData();
      } catch (error) {
        alert('Failed to delete student.');
      }
    }
  };

  // Auth Openers & Switchers
  const handleOpenAuth = (mode = 'student_login') => {
    setAuthInitialMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    if (user.role === 'admin') {
      setCurrentView('admin_portal');
    } else {
      setCurrentView('student_portal');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('sms_token');
    localStorage.removeItem('sms_user');
    setCurrentUser(null);
    setCurrentView('home');
  };

  // Modal Openers
  const handleOpenAddStudent = () => {
    setStudentToEdit(null);
    setIsStudentModalOpen(true);
  };

  const handleOpenEditStudent = (student) => {
    setStudentToEdit(student);
    setIsStudentModalOpen(true);
  };

  const handleOpenStudentDetails = (student) => {
    setSelectedStudent(student);
    setIsDetailsModalOpen(true);
  };

  const handleOpenAIAdvisor = (student) => {
    setAiStudent(student);
    setIsAIModalOpen(true);
  };

  // Render 1: Landing / Home Page
  if (currentView === 'home') {
    return (
      <div>
        <LandingPage
          onOpenAuth={handleOpenAuth}
          onOpenContact={() => setCurrentView('contact')}
          onSelectPortal={(portal) => {
            if (portal === 'student') handleOpenAuth('student_login');
            else handleOpenAuth('admin_login');
          }}
        />

        <LoginModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          initialMode={authInitialMode}
          onLoginSuccess={handleLoginSuccess}
        />
      </div>
    );
  }

  if (currentView === 'contact') {
    return <ContactPage onBackHome={() => setCurrentView('home')} />;
  }

  // Render 2: Student Portal View
  if (currentView === 'student_portal') {
    return (
      <StudentPortal
        currentUser={currentUser}
        onLogout={handleLogout}
        onGoHome={() => setCurrentView('home')}
      />
    );
  }

  // Render 3: Admin & Faculty Portal View
  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <Sidebar 
        activeTab={adminActiveTab} 
        setActiveTab={setAdminActiveTab} 
      />

      {/* Main Content Area */}
      <div className="main-content">
        {/* Top Navbar */}
        <Navbar
          currentUser={currentUser}
          onOpenLogin={() => handleOpenAuth('admin_login')}
          onLogout={handleLogout}
          onOpenAddStudent={handleOpenAddStudent}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* Content Body based on Active Tab */}
        <main className="content-body">
          {/* Quick Home navigation banner for Admin */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '14px' }}>
            <button
              onClick={() => setCurrentView('home')}
              className="btn btn-secondary"
              style={{ fontSize: '12px', padding: '6px 12px' }}
            >
              ← Back to Main Home Page
            </button>
          </div>

          {loading && students.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 20px', color: '#64748b' }}>
              <div style={{ fontSize: '24px', marginBottom: '12px' }}>🔄</div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#1e293b' }}>Connecting to Fullstack Backend...</h3>
              <p style={{ fontSize: '13px', marginTop: '4px' }}>Loading student records and analytics data</p>
            </div>
          ) : (
            <>
              {adminActiveTab === 'dashboard' && (
                <Dashboard
                  stats={stats}
                  students={students}
                  onOpenAddStudent={handleOpenAddStudent}
                  onSelectStudent={handleOpenStudentDetails}
                  onTriggerAI={handleOpenAIAdvisor}
                />
              )}

              {adminActiveTab === 'students' && (
                <StudentsList
                  students={students}
                  onOpenAddStudent={handleOpenAddStudent}
                  onEditStudent={handleOpenEditStudent}
                  onDeleteStudent={handleDeleteStudent}
                  onSelectStudent={handleOpenStudentDetails}
                  onTriggerAI={handleOpenAIAdvisor}
                  selectedDepartment={selectedDepartment}
                  setSelectedDepartment={setSelectedDepartment}
                  selectedStatus={selectedStatus}
                  setSelectedStatus={setSelectedStatus}
                />
              )}

              {adminActiveTab === 'fees' && (
                <FeesView
                  students={students}
                  onEditStudent={handleOpenEditStudent}
                />
              )}

              {adminActiveTab === 'ai-advisor' && (
                <AIAdvisorView students={students} />
              )}

              {adminActiveTab === 'analytics' && (
                <div>
                  <div style={{ marginBottom: '24px' }}>
                    <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a' }}>Academic Data Analytics</h1>
                    <p style={{ fontSize: '13px', color: '#64748b', marginTop: '2px' }}>
                      Visual distribution metrics, attendance patterns, and branch demographics
                    </p>
                  </div>
                  <AnalyticsCharts stats={stats} />
                </div>
              )}
            </>
          )}
        </main>
      </div>

      {/* Global Modals for Admin */}
      <StudentModal
        isOpen={isStudentModalOpen}
        onClose={() => setIsStudentModalOpen(false)}
        onSave={handleSaveStudent}
        studentToEdit={studentToEdit}
      />

      <StudentDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        student={selectedStudent}
        onTriggerAI={handleOpenAIAdvisor}
      />

      <AIAdvisorModal
        isOpen={isAIModalOpen}
        onClose={() => setIsAIModalOpen(false)}
        student={aiStudent}
      />
    </div>
  );
}

export default App;
