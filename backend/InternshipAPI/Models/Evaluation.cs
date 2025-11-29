namespace InternshipAPI.Models
{
    public class Evaluation
    {
        public int EvaluationId { get; set; }
        public int InternId { get; set; }
        public int ProjectId { get; set; }
        public decimal? Score { get; set; }
        public string? Feedback { get; set; }
        public string? Evaluator { get; set; }
        public DateTime CreatedAt { get; set; }

        // Navigation properties
        public Intern Intern { get; set; } = null!;
        public Project Project { get; set; } = null!;
    }
}
