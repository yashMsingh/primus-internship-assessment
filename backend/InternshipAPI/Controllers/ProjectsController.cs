using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using InternshipAPI.Data;
using InternshipAPI.DTOs;

namespace InternshipAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ProjectsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/projects/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<ProjectDetailsDto>> GetProjectDetails(int id)
        {
            var project = await _context.Projects
                .Include(p => p.Owner)
                .Include(p => p.Evaluations)
                    .ThenInclude(e => e.Intern)
                .FirstOrDefaultAsync(p => p.ProjectId == id);

            if (project == null)
            {
                return NotFound(new { message = $"Project with ID {id} not found" });
            }

            var projectDto = new ProjectDetailsDto
            {
                ProjectId = project.ProjectId,
                Title = project.Title,
                Description = project.Description,
                TechStack = project.TechStack,
                StartDate = project.StartDate,
                EndDate = project.EndDate,
                Owner = new InternSummaryDto
                {
                    InternId = project.Owner.InternId,
                    FirstName = project.Owner.FirstName,
                    LastName = project.Owner.LastName,
                    Email = project.Owner.Email,
                    University = project.Owner.University
                },
                Evaluations = project.Evaluations.Select(e => new ProjectEvaluationDto
                {
                    EvaluationId = e.EvaluationId,
                    InternId = e.InternId,
                    InternName = $"{e.Intern.FirstName} {e.Intern.LastName}",
                    Score = e.Score,
                    Feedback = e.Feedback,
                    Evaluator = e.Evaluator
                }).ToList()
            };

            return Ok(projectDto);
        }

        // GET: api/projects (get all projects)
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProjectDetailsDto>>> GetAllProjects()
        {
            var projects = await _context.Projects
                .Include(p => p.Owner)
                .Take(50)
                .Select(p => new ProjectDetailsDto
                {
                    ProjectId = p.ProjectId,
                    Title = p.Title,
                    TechStack = p.TechStack,
                    StartDate = p.StartDate,
                    EndDate = p.EndDate,
                    Owner = new InternSummaryDto
                    {
                        InternId = p.Owner.InternId,
                        FirstName = p.Owner.FirstName,
                        LastName = p.Owner.LastName
                    }
                })
                .ToListAsync();

            return Ok(projects);
        }
    }
}
