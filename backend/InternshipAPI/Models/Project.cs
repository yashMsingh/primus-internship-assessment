namespace InternshipAPI.Models
{
    public class Project
    {
        public int ProjectId { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string? TechStack { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public int OwnerId { get; set; }
        public DateTime CreatedAt { get; set; }

        // Navigation properties
        public Intern Owner { get; set; } = null!;
        public ICollection<Evaluation> Evaluations { get; set; } = new List<Evaluation>();
    }
}
