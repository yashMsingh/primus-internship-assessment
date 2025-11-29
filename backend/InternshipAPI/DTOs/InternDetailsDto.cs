namespace InternshipAPI.DTOs
{
    public class InternDetailsDto
    {
        public int InternId { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string? Phone { get; set; }
        public string? Degree { get; set; }
        public string? University { get; set; }
        public int? YearGraduation { get; set; }
        public List<ProjectSummaryDto> Projects { get; set; } = new();
        public List<EvaluationSummaryDto> Evaluations { get; set; } = new();
    }

    public class ProjectSummaryDto
    {
        public int ProjectId { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? TechStack { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
    }

    public class EvaluationSummaryDto
    {
        public int EvaluationId { get; set; }
        public int ProjectId { get; set; }
        public string ProjectTitle { get; set; } = string.Empty;
        public decimal? Score { get; set; }
        public string? Feedback { get; set; }
        public string? Evaluator { get; set; }
    }
}
