using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using InternshipAPI.Data;
using InternshipAPI.DTOs;

namespace InternshipAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EvaluationsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public EvaluationsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/evaluations/filter
        [HttpGet("filter")]
        public async Task<ActionResult<IEnumerable<EvaluationFilterDto>>> FilterEvaluations(
            [FromQuery] decimal? minScore,
            [FromQuery] decimal? maxScore,
            [FromQuery] string? evaluator,
            [FromQuery] string? techStack)
        {
            var query = _context.Evaluations
                .Include(e => e.Intern)
                .Include(e => e.Project)
                .AsQueryable();

            // Apply filters
            if (minScore.HasValue)
            {
                query = query.Where(e => e.Score >= minScore.Value);
            }

            if (maxScore.HasValue)
            {
                query = query.Where(e => e.Score <= maxScore.Value);
            }

            if (!string.IsNullOrEmpty(evaluator))
            {
                query = query.Where(e => e.Evaluator != null && e.Evaluator.Contains(evaluator));
            }

            if (!string.IsNullOrEmpty(techStack))
            {
                query = query.Where(e => e.Project.TechStack != null && e.Project.TechStack.Contains(techStack));
            }

            var evaluations = await query
                .Select(e => new EvaluationFilterDto
                {
                    EvaluationId = e.EvaluationId,
                    Score = e.Score,
                    Feedback = e.Feedback,
                    Evaluator = e.Evaluator,
                    Intern = new InternInfoDto
                    {
                        InternId = e.Intern.InternId,
                        FirstName = e.Intern.FirstName,
                        LastName = e.Intern.LastName,
                        Email = e.Intern.Email,
                        University = e.Intern.University
                    },
                    Project = new ProjectInfoDto
                    {
                        ProjectId = e.Project.ProjectId,
                        Title = e.Project.Title,
                        TechStack = e.Project.TechStack
                    }
                })
                .Take(100)
                .ToListAsync();

            return Ok(evaluations);
        }

        // GET: api/evaluations (get all)
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EvaluationFilterDto>>> GetAllEvaluations()
        {
            var evaluations = await _context.Evaluations
                .Include(e => e.Intern)
                .Include(e => e.Project)
                .Take(50)
                .Select(e => new EvaluationFilterDto
                {
                    EvaluationId = e.EvaluationId,
                    Score = e.Score,
                    Evaluator = e.Evaluator,
                    Intern = new InternInfoDto
                    {
                        InternId = e.Intern.InternId,
                        FirstName = e.Intern.FirstName,
                        LastName = e.Intern.LastName
                    },
                    Project = new ProjectInfoDto
                    {
                        ProjectId = e.Project.ProjectId,
                        Title = e.Project.Title
                    }
                })
                .ToListAsync();

            return Ok(evaluations);
        }
    }
}
