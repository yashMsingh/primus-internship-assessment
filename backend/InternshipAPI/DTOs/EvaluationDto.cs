namespace InternshipAPI.DTOs
{
    public class EvaluationFilterDto
    {
        public int EvaluationId { get; set; }
        public decimal? Score { get; set; }
        public string? Feedback { get; set; }
        public string? Evaluator { get; set; }
        public InternInfoDto Intern { get; set; } = new();
        public ProjectInfoDto Project { get; set; } = new();
    }

    public class InternInfoDto
    {
        public int InternId { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string? University { get; set; }
    }

    public class ProjectInfoDto
    {
        public int ProjectId { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? TechStack { get; set; }
    }
}
