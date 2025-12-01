import React, { useState } from 'react';
import InternDetails from './pages/InternDetails';
import ProjectDetails from './pages/ProjectDetails';
import EvaluationCriteria from './pages/EvaluationCriteria';
import './styles/App.css';

function App() {
  const [activeTab, setActiveTab] = useState('intern');

  const renderContent = () => {
    switch (activeTab) {
      case 'intern':
        return <InternDetails />;
      case 'project':
        return <ProjectDetails />;
      case 'evaluation':
        return <EvaluationCriteria />;
      default:
        return <InternDetails />;
    }
  };

  return (
    <div className="app">
      <div className="app-header">
        <h1>Intern Management System</h1>
        <p>Manage intern details, projects, and evaluations</p>
      </div>

      <div className="tab-navigation">
        <button
          className={`tab-button ${activeTab === 'intern' ? 'active' : ''}`}
          onClick={() => setActiveTab('intern')}
        >
          <span>👤</span>
          Intern Details
        </button>
        <button
          className={`tab-button ${activeTab === 'project' ? 'active' : ''}`}
          onClick={() => setActiveTab('project')}
        >
          <span>📁</span>
          Project Info
        </button>
        <button
          className={`tab-button ${activeTab === 'evaluation' ? 'active' : ''}`}
          onClick={() => setActiveTab('evaluation')}
        >
          <span>📋</span>
          Evaluation
        </button>
      </div>

      {renderContent()}
    </div>
  );
}

export default App;
