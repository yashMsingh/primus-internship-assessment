import React, { useState } from 'react';
import { filterEvaluations } from '../services/api';
import { exportToCSV } from '../utils/exportCSV';

function EvaluationCriteria() {
  const [formData, setFormData] = useState({
    evaluationId: '',
    score: '',
    evaluator: '',
    evaluatedAt: '',
    projectId: '',
    projectTitle: ''
  });
  const [evaluations, setEvaluations] = useState([]);
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

    const filters = {};
    if (formData.score) filters.minScore = formData.score;
    if (formData.evaluator) filters.evaluator = formData.evaluator;
    if (formData.projectTitle) filters.techStack = formData.projectTitle;

    if (Object.keys(filters).length === 0) {
      setError('Please enter at least one filter criteria');
      return;
    }

    setLoading(true);
    setError('');
    setEvaluations([]);

    try {
      const data = await filterEvaluations(filters);
      setEvaluations(data);
      if (data.length === 0) {
        setError('No evaluations found matching your criteria');
      }
    } catch (err) {
      setError(err || 'Failed to fetch evaluations');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      evaluationId: '',
      score: '',
      evaluator: '',
      evaluatedAt: '',
      projectId: '',
      projectTitle: ''
    });
    setEvaluations([]);
    setError('');
  };

  const handleExportResults = () => {
    if (evaluations && evaluations.length > 0) {
      const exportData = evaluations.map(e => ({
        'Evaluation ID': e.evaluationId,
        'Score': e.score || 'N/A',
        'Evaluator': e.evaluator || 'N/A',
        'Intern Name': `${e.intern?.firstName || ''} ${e.intern?.lastName || ''}`.trim(),
        'Intern Email': e.intern?.email || 'N/A',
        'University': e.intern?.university || 'N/A',
        'Project Title': e.project?.title || 'N/A',
        'Tech Stack': e.project?.techStack || 'N/A',
        'Feedback': e.feedback || 'No feedback'
      }));
      exportToCSV(exportData, 'filtered_evaluations');
    }
  };

  return (
    <div className="page-container">
      <div className="section-header">
        <span className="section-header-icon"></span>
        <h2>Project Evaluation</h2>
      </div>
      <p className="section-description">
        Enter evaluation details for the project
      </p>

      <form onSubmit={handleRetrieveData}>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="evaluationId">Evaluation ID</label>
            <div className="input-wrapper">
              <span className="input-icon"></span>
              <input
                type="text"
                id="evaluationId"
                name="evaluationId"
                value={formData.evaluationId}
                onChange={handleInputChange}
                placeholder="e.g., EVAL-001"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="score">Score</label>
            <div className="input-wrapper">
              <span className="input-icon"></span>
              <input
                type="number"
                id="score"
                name="score"
                value={formData.score}
                onChange={handleInputChange}
                placeholder="e.g., 8.5"
                step="0.1"
                min="0"
                max="10"
              />
            </div>
          </div>
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="evaluator">Evaluator</label>
            <div className="input-wrapper">
              <span className="input-icon"></span>
              <input
                type="text"
                id="evaluator"
                name="evaluator"
                value={formData.evaluator}
                onChange={handleInputChange}
                placeholder="Evaluator name (e.g., Dr. Rao, Mentor)"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="evaluatedAt">Evaluated At</label>
            <div className="input-wrapper">
              <span className="input-icon"></span>
              <input
                type="date"
                id="evaluatedAt"
                name="evaluatedAt"
                value={formData.evaluatedAt}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        <div className="form-grid single-column">
          <div className="form-group">
            <label htmlFor="feedback">Feedback</label>
            <textarea
              id="feedback"
              name="feedback"
              rows="4"
              placeholder="Enter evaluation feedback..."
              style={{ paddingLeft: '14px' }}
            ></textarea>
          </div>
        </div>

        <div style={{ marginTop: '30px', paddingTop: '30px', borderTop: '2px solid #e5e7eb' }}>
          <div className="section-header">
            <span className="section-header-icon"></span>
            <h2>Project Reference</h2>
          </div>
          
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="projectId">Project ID</label>
              <div className="input-wrapper">
                <span className="input-icon"></span>
                <input
                  type="text"
                  id="projectId"
                  name="projectId"
                  value={formData.projectId}
                  onChange={handleInputChange}
                  placeholder="e.g., PRJ-001"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="projectTitle">Project Title / Tech Stack</label>
              <div className="input-wrapper">
                <span className="input-icon"></span>
                <input
                  type="text"
                  id="projectTitle"
                  name="projectTitle"
                  value={formData.projectTitle}
                  onChange={handleInputChange}
                  placeholder="e.g., Python, React, Java"
                />
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '15px', marginTop: '24px' }}>
          <button type="submit" className="btn-primary" disabled={loading} style={{ flex: 1 }}>
            {loading ? 'Retrieving Data...' : 'Retrieve Data'}
          </button>
          <button 
            type="button" 
            onClick={handleReset}
            style={{ 
              flex: 1,
              padding: '14px 24px',
              background: 'white',
              color: '#6b7280',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '15px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.background = '#f9fafb';
              e.target.style.borderColor = '#d1d5db';
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'white';
              e.target.style.borderColor = '#e5e7eb';
            }}
          >
            Reset
          </button>
        </div>
      </form>

      {loading && (
        <div className="loading">
          <div className="spinner"></div>
          <p className="loading-text">Filtering evaluations...</p>
        </div>
      )}

      {error && !loading && <div className="error">{error}</div>}

      {evaluations.length > 0 && (
        <div className="results-section">
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '20px'
          }}>
            <h3 className="results-header" style={{ margin: 0 }}>
              Found {evaluations.length} Evaluation(s)
            </h3>
            <button
              onClick={handleExportResults}
              style={{
                padding: '10px 20px',
                background: '#ec4899',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.3s ease',
                boxShadow: '0 2px 4px rgba(236, 72, 153, 0.3)'
              }}
              onMouseOver={(e) => {
                e.target.style.background = '#db2777';
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 4px 8px rgba(236, 72, 153, 0.4)';
              }}
              onMouseOut={(e) => {
                e.target.style.background = '#ec4899';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 2px 4px rgba(236, 72, 153, 0.3)';
              }}
            >
              <span></span>
              Export Results to CSV
            </button>
          </div>
          
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Evaluation ID</th>
                  <th>Score</th>
                  <th>Evaluator</th>
                  <th>Intern Name</th>
                  <th>Intern Email</th>
                  <th>University</th>
                  <th>Project Title</th>
                  <th>Tech Stack</th>
                  <th>Feedback</th>
                </tr>
              </thead>
              <tbody>
                {evaluations.map((evaluation) => (
                  <tr key={evaluation.evaluationId}>
                    <td>
                      <strong style={{ color: '#14b8a6' }}>
                        {evaluation.evaluationId}
                      </strong>
                    </td>
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
                        <strong>{evaluation.evaluator || 'N/A'}</strong>
                      </div>
                    </td>
                    <td>
                      <strong>
                        {evaluation.intern?.firstName} {evaluation.intern?.lastName}
                      </strong>
                    </td>
                    <td style={{ color: '#6b7280', fontSize: '13px' }}>
                      {evaluation.intern?.email || 'N/A'}
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span></span>
                        {evaluation.intern?.university || 'N/A'}
                      </div>
                    </td>
                    <td>
                      <strong>{evaluation.project?.title || 'N/A'}</strong>
                    </td>
                    <td>
                      <div style={{ 
                        display: 'flex', 
                        flexWrap: 'wrap', 
                        gap: '4px',
                        maxWidth: '200px'
                      }}>
                        {evaluation.project?.techStack ? 
                          evaluation.project.techStack.split(',').map((tech, idx) => (
                            <span key={idx} style={{
                              background: '#e0f2fe',
                              color: '#0369a1',
                              padding: '2px 8px',
                              borderRadius: '4px',
                              fontSize: '11px',
                              fontWeight: '600'
                            }}>
                              {tech.trim()}
                            </span>
                          )) : 'N/A'
                        }
                      </div>
                    </td>
                    <td style={{ maxWidth: '300px', fontSize: '13px', color: '#374151' }}>
                      {evaluation.feedback || 'No feedback provided'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary Statistics */}
          <div style={{
            marginTop: '30px',
            padding: '20px',
            background: '#f9fafb',
            borderRadius: '8px',
            border: '1px solid #e5e7eb'
          }}>
            <h4 style={{ 
              fontSize: '16px', 
              fontWeight: '600', 
              color: '#1a1a1a',
              marginBottom: '15px'
            }}>
              📊 Summary Statistics
            </h4>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '15px'
            }}>
              <div style={{ 
                background: 'white', 
                padding: '15px', 
                borderRadius: '8px',
                border: '1px solid #e5e7eb'
              }}>
                <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>
                  Average Score
                </p>
                <p style={{ fontSize: '24px', fontWeight: '700', color: '#14b8a6' }}>
                  {(evaluations.reduce((acc, e) => acc + (e.score || 0), 0) / 
                    evaluations.length).toFixed(2)}
                </p>
              </div>
              <div style={{ 
                background: 'white', 
                padding: '15px', 
                borderRadius: '8px',
                border: '1px solid #e5e7eb'
              }}>
                <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>
                  Highest Score
                </p>
                <p style={{ fontSize: '24px', fontWeight: '700', color: '#10b981' }}>
                  {Math.max(...evaluations.map(e => e.score || 0)).toFixed(1)}
                </p>
              </div>
              <div style={{ 
                background: 'white', 
                padding: '15px', 
                borderRadius: '8px',
                border: '1px solid #e5e7eb'
              }}>
                <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>
                  Lowest Score
                </p>
                <p style={{ fontSize: '24px', fontWeight: '700', color: '#ef4444' }}>
                  {Math.min(...evaluations.map(e => e.score || 10)).toFixed(1)}
                </p>
              </div>
              <div style={{ 
                background: 'white', 
                padding: '15px', 
                borderRadius: '8px',
                border: '1px solid #e5e7eb'
              }}>
                <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>
                  Total Results
                </p>
                <p style={{ fontSize: '24px', fontWeight: '700', color: '#3b82f6' }}>
                  {evaluations.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EvaluationCriteria;
