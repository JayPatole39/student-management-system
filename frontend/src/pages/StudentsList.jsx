import React, { useState } from 'react';
import { 
  Search, Plus, Filter, Edit, Trash2, Eye, Sparkles, Download, 
  ChevronDown, CheckCircle, AlertCircle, ArrowUpDown 
} from 'lucide-react';

const StudentsList = ({
  students,
  onOpenAddStudent,
  onEditStudent,
  onDeleteStudent,
  onSelectStudent,
  onTriggerAI,
  selectedDepartment,
  setSelectedDepartment,
  selectedStatus,
  setSelectedStatus
}) => {
  const [localSearch, setLocalSearch] = useState('');
  const [sortBy, setSortBy] = useState('roll_no');
  const [sortAsc, setSortAsc] = useState(true);

  // Filter & Search Logic
  const filteredStudents = students.filter((s) => {
    const matchesSearch = localSearch === '' || 
      s.full_name?.toLowerCase().includes(localSearch.toLowerCase()) ||
      s.roll_no?.toLowerCase().includes(localSearch.toLowerCase()) ||
      s.email?.toLowerCase().includes(localSearch.toLowerCase()) ||
      s.phone?.includes(localSearch);

    const matchesDept = selectedDepartment === 'All' || s.department === selectedDepartment;
    const matchesStatus = selectedStatus === 'All' || s.status === selectedStatus;

    return matchesSearch && matchesDept && matchesStatus;
  }).sort((a, b) => {
    let fieldA = a[sortBy];
    let fieldB = b[sortBy];

    if (sortBy === 'cgpa_marks' || sortBy === 'attendance_percentage') {
      fieldA = Number(fieldA);
      fieldB = Number(fieldB);
    } else if (typeof fieldA === 'string') {
      fieldA = fieldA.toLowerCase();
      fieldB = fieldB.toLowerCase();
    }

    if (fieldA < fieldB) return sortAsc ? -1 : 1;
    if (fieldA > fieldB) return sortAsc ? 1 : -1;
    return 0;
  });

  const handleExportCSV = () => {
    const headers = ['Roll No,Name,Email,Phone,Department,Semester,Attendance(%),CGPA,Fees Status,Status\n'];
    const rows = filteredStudents.map(s => 
      `"${s.roll_no}","${s.full_name}","${s.email}","${s.phone}","${s.department}","${s.semester}",${s.attendance_percentage},${s.cgpa_marks},"${s.fees_status}","${s.status}"`
    );
    const blob = new Blob([headers.concat(rows.join('\n'))], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Students_Report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      {/* Page Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '24px',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a' }}>Students Directory</h1>
          <p style={{ fontSize: '13px', color: '#64748b', marginTop: '2px' }}>
            Manage student records, perform CRUD operations, and export reports
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={handleExportCSV}
            className="btn btn-secondary"
            style={{ fontSize: '13px' }}
          >
            <Download size={16} />
            <span>Export CSV</span>
          </button>

          <button
            onClick={onOpenAddStudent}
            className="btn btn-primary"
            style={{ fontSize: '13px' }}
          >
            <Plus size={17} />
            <span>Add New Student</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="card" style={{ padding: '16px 20px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Search Box */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            background: '#f1f5f9',
            borderRadius: '8px',
            padding: '8px 12px',
            flex: '1',
            minWidth: '240px',
            border: '1px solid #e2e8f0'
          }}>
            <Search size={16} color="#64748b" style={{ marginRight: '8px' }} />
            <input
              type="text"
              placeholder="Search by Name, Roll No, Email or Phone..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '13px' }}
            />
          </div>

          {/* Department Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748b' }}>Branch:</span>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', background: '#fff', outline: 'none' }}
            >
              <option value="All">All Departments</option>
              <option value="Computer Engineering">Computer Engineering</option>
              <option value="Information Technology">Information Technology</option>
              <option value="Civil Engineering">Civil Engineering</option>
              <option value="Mechanical Engineering">Mechanical Engineering</option>
            </select>
          </div>

          {/* Status Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748b' }}>Status:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', background: '#fff', outline: 'none' }}
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
        <div className="table-container" style={{ border: 'none' }}>
          <table className="custom-table">
            <thead>
              <tr>
                <th onClick={() => { setSortBy('roll_no'); setSortAsc(!sortAsc); }} style={{ cursor: 'pointer' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    Roll No <ArrowUpDown size={12} />
                  </div>
                </th>
                <th onClick={() => { setSortBy('full_name'); setSortAsc(!sortAsc); }} style={{ cursor: 'pointer' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    Student Name <ArrowUpDown size={12} />
                  </div>
                </th>
                <th>Department</th>
                <th>Semester</th>
                <th onClick={() => { setSortBy('attendance_percentage'); setSortAsc(!sortAsc); }} style={{ cursor: 'pointer' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    Attendance <ArrowUpDown size={12} />
                  </div>
                </th>
                <th onClick={() => { setSortBy('cgpa_marks'); setSortAsc(!sortAsc); }} style={{ cursor: 'pointer' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    CGPA <ArrowUpDown size={12} />
                  </div>
                </th>
                <th>Fees Status</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={9} style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
                    No matching student records found.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((s) => (
                  <tr key={s.id}>
                    <td style={{ fontWeight: 700, color: '#4f46e5' }}>{s.roll_no}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)',
                          color: '#4338ca',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 700,
                          fontSize: '12px'
                        }}>
                          {s.full_name?.charAt(0)}
                        </div>
                        <div>
                          <p style={{ fontWeight: 600, color: '#1e293b' }}>{s.full_name}</p>
                          <p style={{ fontSize: '11px', color: '#64748b' }}>{s.email}</p>
                        </div>
                      </div>
                    </td>
                    <td>{s.department}</td>
                    <td><span className="badge badge-purple">{s.semester}</span></td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{
                          fontWeight: 700,
                          color: Number(s.attendance_percentage) >= 75 ? '#059669' : '#dc2626'
                        }}>
                          {s.attendance_percentage}%
                        </span>
                      </div>
                    </td>
                    <td>
                      <strong style={{ color: '#4f46e5', fontSize: '14px' }}>
                        {s.cgpa_marks}
                      </strong>
                    </td>
                    <td>
                      <span className={
                        s.fees_status === 'Paid' ? 'badge badge-success' :
                        s.fees_status === 'Partial' ? 'badge badge-warning' : 'badge badge-danger'
                      }>
                        {s.fees_status}
                      </span>
                    </td>
                    <td>
                      <span className={s.status === 'Active' ? 'badge badge-success' : 'badge badge-danger'}>
                        {s.status}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '6px' }}>
                        <button
                          onClick={() => onSelectStudent(s)}
                          className="btn btn-secondary"
                          title="View Profile"
                          style={{ padding: '6px 8px' }}
                        >
                          <Eye size={15} color="#475569" />
                        </button>
                        <button
                          onClick={() => onTriggerAI(s)}
                          className="btn btn-ai"
                          title="AI Evaluation"
                          style={{ padding: '6px 8px' }}
                        >
                          <Sparkles size={15} />
                        </button>
                        <button
                          onClick={() => onEditStudent(s)}
                          className="btn btn-secondary"
                          title="Edit Student"
                          style={{ padding: '6px 8px' }}
                        >
                          <Edit size={15} color="#4f46e5" />
                        </button>
                        <button
                          onClick={() => onDeleteStudent(s.id)}
                          className="btn btn-danger"
                          title="Delete Student"
                          style={{ padding: '6px 8px' }}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentsList;
