import React, { useState } from 'react';
import { getInternById } from '../services/api';

function InternDetails() {
  const [internId, setInternId] = useState('');
  const [intern, setIntern] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!internId) {
      setError('Please enter an Intern ID');
      return;
    }

    setLoading(true);
    setError('');
    setIntern(null);

    try {
      const data = await getInternById(internId);
      setIntern(data);
    } catch (err) {
      setError(err || 'Failed to fetch intern details');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Intern Details</h1>

      <div className="form-container">
        <form onSubmit={handleSearch}>
          <div className="form-group">
            <label htmlFor="internId">Enter Intern ID:</label>
            <input
              type="number"
              id="internId"
              value={internId}
              onChange={(e) => setInternId(e.target.value)}
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
          <p>Loading intern details...</p>
        </div>
      )}

      {error && <div className="error">{error}</div>}

      {intern && (
        <div className="results-section">
          <div className="card">
            <div className="card-header">Personal Information</div>
            <div className="card-content">
              <div className="info-row">
                <span className="info-label">Name:</span>
                <span className="info-value">{intern.firstName} {intern.lastName}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Email:</span>
                <span className="info-value">{intern.email}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Phone:</span>
                <span className="info-value">{intern.phone || 'N/A'}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Degree:</span>
                <span className="info-value">{intern.degree || 'N/A'}</span>
              </div>
              <div className="info-row">
                <span className="info-label">University:</span>
                <span className="info-value">{intern.university || 'N/A'}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Graduation Year:</span>
                <span className="info-value">{intern.yearGraduation || 'N/A'}</span>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">Projects ({intern.projects?.length || 0})</div>
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
                    </tr>
                  </thead>
                  <tbody>
                    {intern.projects.map((project) => (
                      <tr key={project.projectId}>
                        <td>{project.projectId}</td>
                        <td>{project.title}</td>
                        <td>{project.techStack || 'N/A'}</td>
                        <td>{project.startDate ? new Date(project.startDate).toLocaleDateString() : 'N/A'}</td>
                        <td>{project.endDate ? new Date(project.endDate).toLocaleDateString() : 'N/A'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p style={{ padding: '20px', color: '#666' }}>No projects found</p>
            )}
          </div>

          <div className="card">
            <div className="card-header">Evaluations ({intern.evaluations?.length || 0})</div>
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
                        <td>{evaluation.projectTitle}</td>
                        <td><strong>{evaluation.score || 'N/A'}</strong></td>
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

export default InternDetails;
