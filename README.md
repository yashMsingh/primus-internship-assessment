# Primus-December-Internship

## Internship Task — React + .NET + PostgreSQL

This assignment provides three CSV datasets: Interns, Projects, Evaluations, along with three input UI mockups. Your task is to build a full-stack solution that loads the data into PostgreSQL, exposes it via a .NET Web API, and displays it in a React frontend.

⸻

🚀 What You Must Do
	1.	Create a new branch in the provided repository and store all your code in that branch.
	2.	Import the CSVs into PostgreSQL and implement the correct relationships:
	•	Intern (1) → (many) Projects
	•	Intern (1) → (many) Evaluations
	•	Project (1) → (many) Evaluations
	3.	Build a .NET Web API with endpoints to fetch:
	•	Intern details + owned projects + evaluations
	•	Project details + interns + evaluations
	•	Evaluations filtered by criteria
	4.	Build a React frontend with 3 input pages:
	•	Page 1: Intern Details
Inputs → intern_id, name, email, degree, university, graduation year
Output → Fetch intern details from API (accordion view)
	•	Page 2: Project Details
Inputs → project fields
Output → Project info + interns involved + evaluations
	•	Page 3: Evaluation Criteria
Inputs → evaluation filters (score, evaluator, dates, nested project fields)
Output → Matching projects + interns
	5.	Show results cleanly using tables/accordions. Add loading/error messages.

⸻

🗂 Expected Tech Stack
	•	Frontend: React (functional components + Hooks, axios, simple CSS)
	•	Backend: .NET Web API
	•	Database: PostgreSQL

⸻

📁 Suggested Folder Structure
```
/your-branch/
  /frontend   → React app
  /api        → .NET Web API
  /db         → SQL schema + import commands
  /data       → CSV files
```

⸻

✔ Minimum Requirements
	•	Correct PostgreSQL schema + imported CSV data
	•	Working API endpoints
	•	Working React UI for 3 pages
	•	Defensive error handling (404, invalid input, etc.)
	•	Clean and readable code

⸻

📌 Submission
	•	Do NOT commit to main.
	•	Create a separate branch and push all your work there.

⸻

Good luck — keep the UI clean, functional, and feel free to add your own creativity!
