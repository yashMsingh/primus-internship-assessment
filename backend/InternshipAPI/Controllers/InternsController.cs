using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using InternshipAPI.Data;
using InternshipAPI.DTOs;

namespace InternshipAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InternsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public InternsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/interns/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<InternDetailsDto>> GetInternDetails(int id)
        {
            var intern = await _context.Interns
                .Include(i => i.Projects)
                .Include(i => i.Evaluations)
                    .ThenInclude(e => e.Project)
                .FirstOrDefaultAsync(i => i.InternId == id);

            if (intern == null)
            {
                return NotFound(new { message = $"Intern with ID {id} not found" });
            }

            var internDto = new InternDetailsDto
            {
                InternId = intern.InternId,
                FirstName = intern.FirstName,
                LastName = intern.LastName,
                Email = intern.Email,
                Phone = intern.Phone,
                Degree = intern.Degree,
                University = intern.University,
                YearGraduation = intern.YearGraduation,
                Projects = intern.Projects.Select(p => new ProjectSummaryDto
                {
                    ProjectId = p.ProjectId,
                    Title = p.Title,
                    TechStack = p.TechStack,
                    StartDate = p.StartDate,
                    EndDate = p.EndDate
                }).ToList(),
                Evaluations = intern.Evaluations.Select(e => new EvaluationSummaryDto
                {
                    EvaluationId = e.EvaluationId,
                    ProjectId = e.ProjectId,
                    ProjectTitle = e.Project.Title,
                    Score = e.Score,
                    Feedback = e.Feedback,
                    Evaluator = e.Evaluator
                }).ToList()
            };

            return Ok(internDto);
        }

        // GET: api/interns (get all interns)
        [HttpGet]
        public async Task<ActionResult<IEnumerable<InternDetailsDto>>> GetAllInterns()
        {
            var interns = await _context.Interns
                .Take(50) // Limit to 50 for performance
                .Select(i => new InternDetailsDto
                {
                    InternId = i.InternId,
                    FirstName = i.FirstName,
                    LastName = i.LastName,
                    Email = i.Email,
                    University = i.University,
                    Degree = i.Degree,
                    YearGraduation = i.YearGraduation
                })
                .ToListAsync();

            return Ok(interns);
        }
    }
}
