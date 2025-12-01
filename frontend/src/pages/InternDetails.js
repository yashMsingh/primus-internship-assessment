import React, { useState } from 'react';
import { getInternById } from '../services/api';
import { exportToCSV } from '../utils/exportCSV';
import StatisticsCard from '../components/StatisticsCard';

function InternDetails() {
  const [formData, setFormData] = useState({
    internId: '',
    email: '',
    firstName: '',
    lastName: '',
    degree: '',
    university: '',
    yearGraduation: ''
  });
  const [intern, setIntern] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRetrieveData = async (e) => {
    e.preventDefault();
    
    if (!formData.internId) {
      setError('Please enter Intern ID');
      return;
    }

    setLoading(true);
    setError('');
    setIntern(null);

    try {
      const data = await getInternById(formData.internId);
      setIntern(data);
      setFormData({
        ...formData,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        degree: data.degree || '',
        university: data.university || '',
        yearGraduation: data.yearGraduation || ''
      });
    } catch (err) {
      setError(err || 'Failed to fetch intern details');
    } finally {
      setLoading(false);
    }
  };

  const handleExportProjects = () => {
    if (intern?.projects && intern.projects.length > 0) {
      exportToCSV(intern.projects, `intern_${intern.internId}_projects`);
    }
  };

  const handleExportEvaluations = () => {
    if (intern?.evaluations && intern.evaluations.length > 0) {
      exportToCSV(intern.evaluations, `intern_${intern.internId}_evaluations`);
    }
  };

  const calculateAverageScore = () => {
    if (!intern?.evaluations || intern.evaluations.length === 0) return 0;
    const total = intern.evaluations.reduce((acc, e) => acc + (e.score || 0), 0);
    return (total / intern.evaluations.length).toFixed(1);
  };

  return (
    <div className="page-container">
      <div className="section-header">
        <span className="section-header-icon">👤</span>
        <h2>Intern Details</h2>
      </div>
      <p className="section-description">
        Enter the intern's personal and academic information
      </p>

      <form onSubmit={handleRetrieveData}>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="internId">Intern ID</label>
            <div className="input-wrapper">
              <span className="input-icon">🆔</span>
              <input
                type="number"
                id="internId"
                name="internId"
                value={formData.internId}
                onChange={handleInputChange}
                placeholder="e.g., 1"
                min="1"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <div className="input-wrapper">
              <span className="input-icon">✉️</span>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="intern@example.com"
                disabled={!!intern}
              />
            </div>
          </div>
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <div className="input-wrapper">
              <span className="input-icon">👤</span>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="John"
                disabled={!!intern}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <div className="input-wrapper">
              <span className="input-icon">👤</span>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Doe"
                disabled={!!intern}
              />
            </div>
          </div>
        </div>

        <div className="form-grid single-column">
          <div className="form-group">
            <label htmlFor="degree">Degree</label>
            <div className="input-wrapper">
              <span className="input-icon">🎓</span>
              <input
                type="text"
                id="degree"
                name="degree"
                value={formData.degree}
                onChange={handleInputChange}
                placeholder="e.g., B.Tech Computer Science"
                disabled={!!intern}
              />
            </div>
          </div>
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="university">University</label>
            <div className="input-wrapper">
              <span className="input-icon">🏫</span>
              <input
                type="text"
                id="university"
                name="university"
                value={formData.university}
                onChange={handleInputChange}
                placeholder="University name"
                disabled={!!intern}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="yearGraduation">Year of Graduation</label>
            <div className="input-wrapper">
              <span className="input-icon">📅</span>
              <input
                type="number"
                id="yearGraduation"
                name="yearGraduation"
                value={formData.yearGraduation}
                onChange={handleInputChange}
                placeholder="e.g., 2025"
                disabled={!!intern}
              />
            </div>
          </div>
        </div>

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Retrieving Data...' : 'Retrieve Data'}
        </button>
      </form>

      {loading && (
        <div className="loading">
          <div className="spinner"></div>
          <p className="loading-text">Loading intern details...</p>
        </div>
      )}

      {error && <div className="error">{error}</div>}

      {/* Statistics Dashboard */}
      {intern && !loading && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '20px',
          marginTop: '40px',
          paddingTop: '40px',
          borderTop: '2px solid #e5e7eb'
        }}>
          <StatisticsCard
            icon="📊"
            title="Total Projects"
            value={intern.projects?.length || 0}
            subtitle="Owned projects"
            color="#14b8a6"
          />
          <StatisticsCard
            icon="⭐"
            title="Total Evaluations"
            value={intern.evaluations?.length || 0}
            subtitle="Received"
            color="#3b82f6"
          />
          <StatisticsCard
            icon="📈"
            title="Average Score"
            value={calculateAverageScore()}
            subtitle="Out of 10.0"
            color="#f59e0b"
          />
        </div>
      )}

      {intern && (
        <div className="results-section">
          {/* Projects Section */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '20px'
          }}>
            <h3 className="results-header" style={{ margin: 0 }}>
              Projects ({intern.projects?.length || 0})
            </h3>
            {intern.projects && intern.projects.length > 0 && (
              <button
                onClick={handleExportProjects}
                style={{
                  padding: '10px 20px',
                  background: '#10b981',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => e.target.style.background = '#059669'}
                onMouseOut={(e) => e.target.style.background = '#10b981'}
              >
                <span>📥</span>
                Export to CSV
              </button>
            )}
          </div>

          {intern.projects && intern.projects.length > 0 ? (
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Project ID</th>
                    <th>Title</th>
                    <th>Tech Stack</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {intern.projects.map((project) => {
                    const endDate = new Date(project.endDate);
                    const today = new Date();
                    const isCompleted = endDate < today;
                    
                    return (
                      <tr key={project.projectId}>
                        <td>{project.projectId}</td>
                        <td><strong>{project.title}</strong></td>
                        <td>{project.techStack || 'N/A'}</td>
                        <td>
                          {project.startDate ? new Date(project.startDate).toLocaleDateString() : 'N/A'}
                        </td>
                        <td>
                          {project.endDate ? new Date(project.endDate).toLocaleDateString() : 'N/A'}
                        </td>
                        <td>
                          <span style={{
                            padding: '4px 12px',
                            borderRadius: '12px',
                            fontSize: '12px',
                            fontWeight: '600',
                            background: isCompleted ? '#d1fae5' : '#fef3c7',
                            color: isCompleted ? '#065f46' : '#92400e'
                          }}>
                            {isCompleted ? '✓ Completed' : '⏳ In Progress'}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="no-data">No projects found</p>
          )}

          {/* Evaluations Section */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '20px',
            marginTop: '40px'
          }}>
            <h3 className="results-header" style={{ margin: 0 }}>
              Evaluations ({intern.evaluations?.length || 0})
            </h3>
            {intern.evaluations && intern.evaluations.length > 0 && (
              <button
                onClick={handleExportEvaluations}
                style={{
                  padding: '10px 20px',
                  background: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => e.target.style.background = '#2563eb'}
                onMouseOut={(e) => e.target.style.background = '#3b82f6'}
              >
                <span>📥</span>
                Export to CSV
              </button>
            )}
          </div>

          {intern.evaluations && intern.evaluations.length > 0 ? (
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Evaluation ID</th>
                    <th>Project</th>
                    <th>Score</th>
                    <th>Evaluator</th>
                    <th>Feedback</th>
                  </tr>
                </thead>
                <tbody>
                  {intern.evaluations.map((evaluation) => (
                    <tr key={evaluation.evaluationId}>
                      <td>{evaluation.evaluationId}</td>
                      <td><strong>{evaluation.projectTitle}</strong></td>
                      <td>
                        <span className={`score-badge ${
                          evaluation.score >= 8 ? 'score-high' : 
                          evaluation.score >= 6 ? 'score-medium' : 'score-low'
                        }`}>
                          {evaluation.score ? `${evaluation.score} / 10` : 'N/A'}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span>👤</span>
                          {evaluation.evaluator || 'N/A'}
                        </div>
                      </td>
                      <td style={{ maxWidth: '300px' }}>
                        {evaluation.feedback || 'No feedback provided'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="no-data">No evaluations found</p>
          )}
        </div>
      )}
    </div>
  );
}

export default InternDetails;
