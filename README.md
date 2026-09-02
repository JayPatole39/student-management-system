# 🎓 EduManage Pro - Student Management System
### (Diploma Computer Engineering 3rd Year Final Project)

Fullstack Web Application built using **React.js + Node.js + Express.js + MySQL Database + AI Analytics Module**.

---

## 🌟 Key Features (वैशिष्ट्ये)

1. **Modern Dashboard & Visual Analytics:**
   - Real-time KPI Stats (Total Students, Active Count, Avg. Attendance, Avg. CGPA, Fee Collection)
   - Interactive Charts: Department Distribution Bar Chart, Fee Status Pie Chart, Top 5 CGPA Leaderboard.
2. **Complete Students Directory (Full CRUD):**
   - Live Search (by Name, Roll No, Email, Phone)
   - Department & Status Filtering
   - Instant Sorting (Roll No, CGPA, Attendance)
   - Add New Student & Edit existing details
   - Delete records with confirmation
   - Export student reports to CSV file (Excel-ready)
3. **AI Smart Academic Advisor:**
   - Rule-based AI Performance evaluation engine
   - Academic Risk Level Prediction (Low / Moderate / High)
   - Personalized Mentorship & Study Recommendations
4. **Fees & Finance Management:**
   - Track total tuition, paid fees & outstanding dues
   - Filter by Paid, Partial, and Pending payments
   - 1-click Quick Fee Status update
5. **Authentication & Roles:**
   - JWT-based authentication (Admin / Student / Faculty)
   - 1-Click Demo Login for smooth college presentation

---

## 📁 Project Structure (प्रोजेक्टची रचना)

```
student-management-system/
├── backend/
│   ├── config/
│   │   └── db.js            # MySQL Connection Pool
│   ├── controllers/
│   │   ├── authController.js    # Login / Register
│   │   ├── studentController.js # CRUD & Analytics Stats
│   │   └── aiController.js      # AI Academic Analyzer
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── studentRoutes.js
│   │   └── aiRoutes.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── database.sql         # 2-Table Simplified MySQL Schema
│   ├── server.js            # Express Server Entry Point
│   ├── .env                 # Database & Port configuration
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── api/
    │   │   └── api.js       # Axios client
    │   ├── components/
    │   │   ├── Sidebar.jsx
    │   │   ├── Navbar.jsx
    │   │   ├── StatsCards.jsx
    │   │   ├── AnalyticsCharts.jsx
    │   │   ├── StudentModal.jsx
    │   │   ├── StudentDetailsModal.jsx
    │   │   ├── AIAdvisorModal.jsx
    │   │   └── LoginModal.jsx
    │   ├── pages/
    │   │   ├── Dashboard.jsx
    │   │   ├── StudentsList.jsx
    │   │   ├── FeesView.jsx
    │   │   └── AIAdvisorView.jsx
    │   ├── App.jsx
    │   └── index.css
    ├── index.html
    └── package.json
```

---

## 🚀 How to Run the Project (प्रोजेक्ट कसा रन करायचा?)

### 1️⃣ Step 1: Database Setup
- Open **MySQL Workbench**.
- Run the SQL script from: `backend/database.sql`.
- Verify the MySQL password in `backend/.env` (default is set to `root`).

### 2️⃣ Step 2: Start Backend Server
VS Code मध्ये पहिला Terminal उघडा:
```bash
cd backend
npm start
```
*Backend will run on: `http://localhost:5000`*

### 3️⃣ Step 3: Start Frontend (React App)
VS Code मध्ये दुसरा नवीन Terminal (+) उघडा:
```bash
cd frontend
npm run dev
```
*Frontend will run on: `http://localhost:5173` (ब्राउझरमध्ये उघडा)*
