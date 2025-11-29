import React, { useState } from 'react';
import { filterEvaluations } from '../services/api';

function EvaluationCriteria() {
  const [filters, setFilters] = useState({
    minScore: '',
    maxScore: '',
    evaluator: '',
    techStack: ''
  });
  const [evaluations, setEvaluations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    
    // Check if at least one filter is provided
    if (!filters.minScore && !filters.maxScore && !filters.evaluator && !filters.techStack) {
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
    setFilters({
      minScore: '',
      maxScore: '',
      evaluator: '',
      techStack: ''
    });
    setEvaluations([]);
    setError('');
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Filter Evaluations</h1>

      <div className="form-container">
        <form onSubmit={handleSearch}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
            <div className="form-group">
              <label htmlFor="minScore">Minimum Score:</label>
              <input
                type="number"
                id="minScore"
                name="minScore"
                value={filters.minScore}
                onChange={handleInputChange}
                placeholder="e.g., 7.0"
                step="0.1"
                min="0"
                max="10"
              />
            </div>

            <div className="form-group">
              <label htmlFor="maxScore">Maximum Score:</label>
              <input
                type="number"
                id="maxScore"
                name="maxScore"
                value={filters.maxScore}
                onChange={handleInputChange}
                placeholder="e.g., 9.5"
                step="0.1"
                min="0"
                max="10"
              />
            </div>

            <div className="form-group">
              <label htmlFor="evaluator">Evaluator:</label>
              <input
                type="text"
                id="evaluator"
                name="evaluator"
                value={filters.evaluator}
                onChange={handleInputChange}
                placeholder="e.g., Dr. Rao, Mentor, Team Lead"
              />
            </div>

            <div className="form-group">
              <label htmlFor="techStack">Tech Stack:</label>
              <input
                type="text"
                id="techStack"
                name="techStack"
                value={filters.techStack}
                onChange={handleInputChange}
                placeholder="e.g., Python, React, Java"
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
            <button type="submit" className="btn" disabled={loading}>
              {loading ? 'Filtering...' : 'Filter Evaluations'}
            </button>
            <button type="button" className="btn" onClick={handleReset} style={{ background: '#6c757d' }}>
              Reset Filters
            </button>
          </div>
        </form>
      </div>

      {loading && (
        <div className="loading">
          <div className="spinner"></div>
          <p>Filtering evaluations...</p>
        </div>
      )}

      {error && <div className="error">{error}</div>}

      {evaluations.length > 0 && (
        <div className="results-section">
          <div className="results-header">
            Found {evaluations.length} Evaluation(s)
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
                    <td>{evaluation.evaluationId}</td>
                    <td>
                      <strong style={{ 
                        color: evaluation.score >= 8 ? '#28a745' : evaluation.score >= 6 ? '#ffc107' : '#dc3545',
                        fontSize: '16px'
                      }}>
                        {evaluation.score || 'N/A'}
                      </strong>
                    </td>
                    <td>{evaluation.evaluator || 'N/A'}</td>
                    <td>{evaluation.intern?.firstName} {evaluation.intern?.lastName}</td>
                    <td>{evaluation.intern?.email || 'N/A'}</td>
                    <td>{evaluation.intern?.university || 'N/A'}</td>
                    <td>{evaluation.project?.title || 'N/A'}</td>
                    <td>{evaluation.project?.techStack || 'N/A'}</td>
                    <td style={{ maxWidth: '300px' }}>{evaluation.feedback || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default EvaluationCriteria;
