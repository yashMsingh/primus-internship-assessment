import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import InternDetails from './pages/InternDetails';
import ProjectDetails from './pages/ProjectDetails';
import EvaluationCriteria from './pages/EvaluationCriteria';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="nav">
          <h1>🎓 Internship Management System</h1>
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/intern-details">Intern Details</Link>
            <Link to="/project-details">Project Details</Link>
            <Link to="/evaluation-criteria">Evaluation Criteria</Link>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/intern-details" element={<InternDetails />} />
          <Route path="/project-details" element={<ProjectDetails />} />
          <Route path="/evaluation-criteria" element={<EvaluationCriteria />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
