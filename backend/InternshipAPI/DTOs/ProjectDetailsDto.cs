namespace InternshipAPI.DTOs
{
    public class ProjectDetailsDto
    {
        public int ProjectId { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string? TechStack { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public InternSummaryDto Owner { get; set; } = new();
        public List<ProjectEvaluationDto> Evaluations { get; set; } = new();
    }

    public class InternSummaryDto
    {
        public int InternId { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string? University { get; set; }
    }

    public class ProjectEvaluationDto
    {
        public int EvaluationId { get; set; }
        public int InternId { get; set; }
        public string InternName { get; set; } = string.Empty;
        public decimal? Score { get; set; }
        public string? Feedback { get; set; }
        public string? Evaluator { get; set; }
    }
}
