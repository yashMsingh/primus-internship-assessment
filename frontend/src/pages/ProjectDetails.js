import React, { useState } from 'react';
import { getProjectById } from '../services/api';

function ProjectDetails() {
  const [projectId, setProjectId] = useState('');
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!projectId) {
      setError('Please enter a Project ID');
      return;
    }

    setLoading(true);
    setError('');
    setProject(null);

    try {
      const data = await getProjectById(projectId);
      setProject(data);
    } catch (err) {
      setError(err || 'Failed to fetch project details');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Project Details</h1>

      <div className="form-container">
        <form onSubmit={handleSearch}>
          <div className="form-group">
            <label htmlFor="projectId">Enter Project ID:</label>
            <input
              type="number"
              id="projectId"
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
              placeholder="e.g., 1"
              min="1"
            />
          </div>
          <button type="submit" className="btn" disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>
      </div>

      {loading && (
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading project details...</p>
        </div>
      )}

      {error && <div className="error">{error}</div>}

      {project && (
        <div className="results-section">
          <div className="card">
            <div className="card-header">Project Information</div>
            <div className="card-content">
              <div className="info-row">
                <span className="info-label">Project ID:</span>
                <span className="info-value">{project.projectId}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Title:</span>
                <span className="info-value">{project.title}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Description:</span>
                <span className="info-value">{project.description || 'N/A'}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Tech Stack:</span>
                <span className="info-value">{project.techStack || 'N/A'}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Start Date:</span>
                <span className="info-value">
                  {project.startDate ? new Date(project.startDate).toLocaleDateString() : 'N/A'}
                </span>
              </div>
              <div className="info-row">
                <span className="info-label">End Date:</span>
                <span className="info-value">
                  {project.endDate ? new Date(project.endDate).toLocaleDateString() : 'N/A'}
                </span>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">Project Owner</div>
            <div className="card-content">
              <div className="info-row">
                <span className="info-label">Intern ID:</span>
                <span className="info-value">{project.owner?.internId || 'N/A'}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Name:</span>
                <span className="info-value">
                  {project.owner?.firstName} {project.owner?.lastName}
                </span>
              </div>
              <div className="info-row">
                <span className="info-label">Email:</span>
                <span className="info-value">{project.owner?.email || 'N/A'}</span>
              </div>
              <div className="info-row">
                <span className="info-label">University:</span>
                <span className="info-value">{project.owner?.university || 'N/A'}</span>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">Evaluations ({project.evaluations?.length || 0})</div>
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
                        <td>{evaluation.internName}</td>
                        <td>
                          <strong style={{ 
                            color: evaluation.score >= 8 ? '#28a745' : evaluation.score >= 6 ? '#ffc107' : '#dc3545' 
                          }}>
                            {evaluation.score || 'N/A'}
                          </strong>
                        </td>
                        <td>{evaluation.evaluator || 'N/A'}</td>
                        <td>{evaluation.feedback || 'N/A'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p style={{ padding: '20px', color: '#666' }}>No evaluations found</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectDetails;
