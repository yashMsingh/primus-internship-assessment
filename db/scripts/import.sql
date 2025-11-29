-- Import interns
\COPY interns(intern_id, first_name, last_name, email, phone, degree, university, year_graduation) FROM 'C:\Users\singh\OneDrive\Desktop\primus\Primus-December-Internship/data/interns.csv' DELIMITER ',' CSV HEADER;

-- Import projects
\COPY projects(project_id, title, description, tech_stack, start_date, end_date, owner_id) FROM 'C:\Users\singh\OneDrive\Desktop\primus\Primus-December-Internship/data/projects.csv' DELIMITER ',' CSV HEADER;

-- Import evaluations
\COPY evaluations(evaluation_id, intern_id, project_id, score, feedback, evaluator) FROM 'C:\Users\singh\OneDrive\Desktop\primus\Primus-December-Internship/data/evaluations.csv' DELIMITER ',' CSV HEADER;

-- Display counts
SELECT 'Interns: ' || COUNT(*) FROM interns;
SELECT 'Projects: ' || COUNT(*) FROM projects;
SELECT 'Evaluations: ' || COUNT(*) FROM evaluations;
