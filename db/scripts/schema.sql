-- Database Schema for Internship Management System

-- Create interns table
CREATE TABLE interns (
    intern_id INTEGER PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(200) UNIQUE NOT NULL,
    phone VARCHAR(50),
    degree VARCHAR(50),
    university VARCHAR(100),
    year_graduation INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create projects table
CREATE TABLE projects (
    project_id INTEGER PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    tech_stack VARCHAR(500),
    start_date DATE,
    end_date DATE,
    owner_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (owner_id) REFERENCES interns(intern_id) ON DELETE CASCADE
);

-- Create evaluations table
CREATE TABLE evaluations (
    evaluation_id INTEGER PRIMARY KEY,
    intern_id INTEGER NOT NULL,
    project_id INTEGER NOT NULL,
    score DECIMAL(3,1) CHECK (score >= 0 AND score <= 10),
    feedback TEXT,
    evaluator VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (intern_id) REFERENCES interns(intern_id) ON DELETE CASCADE,
    FOREIGN KEY (project_id) REFERENCES projects(project_id) ON DELETE CASCADE
);

-- Create indexes for performance
CREATE INDEX idx_projects_owner ON projects(owner_id);
CREATE INDEX idx_evaluations_intern ON evaluations(intern_id);
CREATE INDEX idx_evaluations_project ON evaluations(project_id);
CREATE INDEX idx_interns_email ON interns(email);
