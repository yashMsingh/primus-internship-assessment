namespace InternshipAPI.Models
{
    public class Intern
    {
        public int InternId { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string? Phone { get; set; }
        public string? Degree { get; set; }
        public string? University { get; set; }
        public int? YearGraduation { get; set; }
        public DateTime CreatedAt { get; set; }

        // Navigation properties
        public ICollection<Project> Projects { get; set; } = new List<Project>();
        public ICollection<Evaluation> Evaluations { get; set; } = new List<Evaluation>();
    }
}
