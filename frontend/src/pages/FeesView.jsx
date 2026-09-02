import React, { useState } from 'react';
import { CreditCard, CheckCircle2, Clock, AlertTriangle, IndianRupee, Edit } from 'lucide-react';

const FeesView = ({ students, onEditStudent }) => {
  const [filter, setFilter] = useState('All');

  const totalFeesExpected = students.reduce((acc, s) => acc + Number(s.fees_total || 0), 0);
  const totalFeesPaid = students.reduce((acc, s) => acc + Number(s.fees_paid || 0), 0);
  const totalFeesPending = totalFeesExpected - totalFeesPaid;

  const filteredStudents = students.filter((s) => {
    if (filter === 'All') return true;
    return s.fees_status === filter;
  });

  return (
    <div>
      {/* Page Header */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a' }}>College Fees & Finance</h1>
        <p style={{ fontSize: '13px', color: '#64748b', marginTop: '2px' }}>
          Track tuition fee collections, outstanding balances, and payment statuses
        </p>
      </div>

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '28px' }}>
        <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748b' }}>TOTAL RECEIVABLES</span>
            <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#1e293b', marginTop: '4px' }}>
              ₹{totalFeesExpected.toLocaleString('en-IN')}
            </h3>
          </div>
          <div style={{ background: '#eef2ff', padding: '12px', borderRadius: '12px', color: '#4f46e5' }}>
            <CreditCard size={24} />
          </div>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748b' }}>TOTAL COLLECTED</span>
            <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#059669', marginTop: '4px' }}>
              ₹{totalFeesPaid.toLocaleString('en-IN')}
            </h3>
          </div>
          <div style={{ background: '#ecfdf5', padding: '12px', borderRadius: '12px', color: '#10b981' }}>
            <CheckCircle2 size={24} />
          </div>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748b' }}>OUTSTANDING DUES</span>
            <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#dc2626', marginTop: '4px' }}>
              ₹{totalFeesPending.toLocaleString('en-IN')}
            </h3>
          </div>
          <div style={{ background: '#fef2f2', padding: '12px', borderRadius: '12px', color: '#ef4444' }}>
            <AlertTriangle size={24} />
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '18px' }}>
        {['All', 'Paid', 'Partial', 'Pending'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={filter === status ? 'btn btn-primary' : 'btn btn-secondary'}
            style={{ padding: '8px 16px', fontSize: '13px' }}
          >
            {status} Fees ({students.filter(s => status === 'All' ? true : s.fees_status === status).length})
          </button>
        ))}
      </div>

      {/* Fees Data Table */}
      <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
        <div className="table-container" style={{ border: 'none' }}>
          <table className="custom-table">
            <thead>
              <tr>
                <th>Roll No</th>
                <th>Student Name</th>
                <th>Department</th>
                <th>Total Fees</th>
                <th>Fees Paid</th>
                <th>Pending Balance</th>
                <th>Payment Status</th>
                <th style={{ textAlign: 'right' }}>Update</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((s) => {
                const pending = Number(s.fees_total) - Number(s.fees_paid);
                return (
                  <tr key={s.id}>
                    <td style={{ fontWeight: 700, color: '#4f46e5' }}>{s.roll_no}</td>
                    <td style={{ fontWeight: 600, color: '#1e293b' }}>{s.full_name}</td>
                    <td>{s.department}</td>
                    <td>₹{Number(s.fees_total).toLocaleString('en-IN')}</td>
                    <td style={{ color: '#059669', fontWeight: 600 }}>₹{Number(s.fees_paid).toLocaleString('en-IN')}</td>
                    <td style={{ color: pending > 0 ? '#dc2626' : '#64748b', fontWeight: 700 }}>
                      ₹{pending.toLocaleString('en-IN')}
                    </td>
                    <td>
                      <span className={
                        s.fees_status === 'Paid' ? 'badge badge-success' :
                        s.fees_status === 'Partial' ? 'badge badge-warning' : 'badge badge-danger'
                      }>
                        {s.fees_status}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button
                        onClick={() => onEditStudent(s)}
                        className="btn btn-secondary"
                        style={{ padding: '6px 12px', fontSize: '12px' }}
                      >
                        <Edit size={14} />
                        <span>Update Fee</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FeesView;
