import React, { useState } from 'react';
import { getProjectById } from '../services/api';
import { exportToCSV } from '../utils/exportCSV';

function ProjectDetails() {
  const [formData, setFormData] = useState({
    projectId: '',
    title: '',
    techStack: '',
    startDate: '',
    endDate: ''
  });
  const [project, setProject] = useState(null);
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
    
    if (!formData.projectId) {
      setError('Please enter Project ID');
      return;
    }

    setLoading(true);
    setError('');
    setProject(null);

    try {
      const data = await getProjectById(formData.projectId);
      setProject(data);
      setFormData({
        ...formData,
        title: data.title || '',
        techStack: data.techStack || '',
        startDate: data.startDate ? data.startDate.split('T')[0] : '',
        endDate: data.endDate ? data.endDate.split('T')[0] : ''
      });
    } catch (err) {
      setError(err || 'Failed to fetch project details');
    } finally {
      setLoading(false);
    }
  };

  const handleExportEvaluations = () => {
    if (project?.evaluations && project.evaluations.length > 0) {
      exportToCSV(project.evaluations, `project_${project.projectId}_evaluations`);
    }
  };

  return (
    <div className="page-container">
      <div className="section-header">
        <span className="section-header-icon"></span>
        <h2>Project Information</h2>
      </div>
      <p className="section-description">
        Enter details about the project assignment
      </p>

      <form onSubmit={handleRetrieveData}>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="projectId">Project ID</label>
            <div className="input-wrapper">
              <span className="input-icon"></span>
              <input
                type="number"
                id="projectId"
                name="projectId"
                value={formData.projectId}
                onChange={handleInputChange}
                placeholder="e.g., 1"
                min="1"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="title">Title</label>
            <div className="input-wrapper">
              <span className="input-icon"></span>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Project title"
                disabled={!!project}
              />
            </div>
          </div>
        </div>

        <div className="form-grid single-column">
          <div className="form-group">
            <label htmlFor="techStack">Tech Stack</label>
            <div className="input-wrapper">
              <span className="input-icon"></span>
              <input
                type="text"
                id="techStack"
                name="techStack"
                value={formData.techStack}
                onChange={handleInputChange}
                placeholder="e.g., React, Node.js, PostgreSQL"
                disabled={!!project}
              />
            </div>
          </div>
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="startDate">Start Date</label>
            <div className="input-wrapper">
              <span className="input-icon"></span>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                disabled={!!project}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="endDate">End Date</label>
            <div className="input-wrapper">
              <span className="input-icon"></span>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
                disabled={!!project}
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
          <p className="loading-text">Loading project details...</p>
        </div>
      )}

      {error && <div className="error">{error}</div>}

      {project && (
        <div className="results-section">
          <h3 className="results-header">Project Owner</h3>
          <div className="info-card">
            <div className="info-row">
              <span className="info-label">Intern ID</span>
              <span className="info-value">{project.owner?.internId || 'N/A'}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Name</span>
              <span className="info-value">
                {project.owner?.firstName} {project.owner?.lastName}
              </span>
            </div>
            <div className="info-row">
              <span className="info-label">Email</span>
              <span className="info-value">{project.owner?.email || 'N/A'}</span>
            </div>
            <div className="info-row">
              <span className="info-label">University</span>
              <span className="info-value">{project.owner?.university || 'N/A'}</span>
            </div>
          </div>

          <h3 className="results-header" style={{ marginTop: '30px' }}>
            Project Description
          </h3>
          <div className="info-card">
            <p style={{ color: '#374151', lineHeight: '1.6' }}>
              {project.description || 'No description available'}
            </p>
          </div>

          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginTop: '30px',
            marginBottom: '20px'
          }}>
            <h3 className="results-header" style={{ margin: 0 }}>
              Evaluations ({project.evaluations?.length || 0})
            </h3>
            {project.evaluations && project.evaluations.length > 0 && (
              <button
                onClick={handleExportEvaluations}
                style={{
                  padding: '10px 20px',
                  background: '#8b5cf6',
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
                onMouseOver={(e) => e.target.style.background = '#7c3aed'}
                onMouseOut={(e) => e.target.style.background = '#8b5cf6'}
              >
                <span></span>
                Export to CSV
              </button>
            )}
          </div>

          {project.evaluations && project.evaluations.length > 0 ? (
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Evaluation ID</th>
                    <th>Intern Name</th>
                    <th>Score</th>
                    <th>Evaluator</th>
                    <th>Feedback</th>
                  </tr>
                </thead>
                <tbody>
                  {project.evaluations.map((evaluation) => (
                    <tr key={evaluation.evaluationId}>
                      <td>{evaluation.evaluationId}</td>
                      <td><strong>{evaluation.internName}</strong></td>
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
                          <span></span>
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

export default ProjectDetails;
