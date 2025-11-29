import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="page-container">
      <h1 className="page-title">Internship Management System</h1>
      
      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <h2 style={{ color: '#667eea', marginBottom: '30px' }}>Welcome!</h2>
        <p style={{ fontSize: '18px', color: '#666', marginBottom: '40px', lineHeight: '1.6' }}>
          This system helps you manage interns, projects, and evaluations efficiently.
          Navigate through the menu to access different features.
        </p>
        
        <div style={{ display: 'flex', gap: '30px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <div className="card" style={{ maxWidth: '300px' }}>
            <div className="card-header">👥 Intern Details</div>
            <div className="card-content">
              <p>Search and view detailed information about interns, including their projects and evaluations.</p>
              <Link to="/intern-details">
                <button className="btn" style={{ marginTop: '15px' }}>Go to Interns</button>
              </Link>
            </div>
          </div>
          
          <div className="card" style={{ maxWidth: '300px' }}>
            <div className="card-header">📋 Project Details</div>
            <div className="card-content">
              <p>Browse projects, view team members, and check project evaluations.</p>
              <Link to="/project-details">
                <button className="btn" style={{ marginTop: '15px' }}>Go to Projects</button>
              </Link>
            </div>
          </div>
          
          <div className="card" style={{ maxWidth: '300px' }}>
            <div className="card-header">⭐ Evaluations</div>
            <div className="card-content">
              <p>Filter and analyze evaluations based on various criteria like score and evaluator.</p>
              <Link to="/evaluation-criteria">
                <button className="btn" style={{ marginTop: '15px' }}>Go to Evaluations</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
