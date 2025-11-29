using Microsoft.EntityFrameworkCore;
using InternshipAPI.Models;

namespace InternshipAPI.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Intern> Interns { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<Evaluation> Evaluations { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure Intern
            modelBuilder.Entity<Intern>(entity =>
            {
                entity.ToTable("interns");
                entity.HasKey(e => e.InternId);
                entity.Property(e => e.InternId).HasColumnName("intern_id");
                entity.Property(e => e.FirstName).HasColumnName("first_name");
                entity.Property(e => e.LastName).HasColumnName("last_name");
                entity.Property(e => e.Email).HasColumnName("email");
                entity.Property(e => e.Phone).HasColumnName("phone");
                entity.Property(e => e.Degree).HasColumnName("degree");
                entity.Property(e => e.University).HasColumnName("university");
                entity.Property(e => e.YearGraduation).HasColumnName("year_graduation");
                entity.Property(e => e.CreatedAt).HasColumnName("created_at");
            });

            // Configure Project
            modelBuilder.Entity<Project>(entity =>
            {
                entity.ToTable("projects");
                entity.HasKey(e => e.ProjectId);
                entity.Property(e => e.ProjectId).HasColumnName("project_id");
                entity.Property(e => e.Title).HasColumnName("title");
                entity.Property(e => e.Description).HasColumnName("description");
                entity.Property(e => e.TechStack).HasColumnName("tech_stack");
                entity.Property(e => e.StartDate).HasColumnName("start_date");
                entity.Property(e => e.EndDate).HasColumnName("end_date");
                entity.Property(e => e.OwnerId).HasColumnName("owner_id");
                entity.Property(e => e.CreatedAt).HasColumnName("created_at");

                // Relationship
                entity.HasOne(p => p.Owner)
                    .WithMany(i => i.Projects)
                    .HasForeignKey(p => p.OwnerId);
            });

            // Configure Evaluation
            modelBuilder.Entity<Evaluation>(entity =>
            {
                entity.ToTable("evaluations");
                entity.HasKey(e => e.EvaluationId);
                entity.Property(e => e.EvaluationId).HasColumnName("evaluation_id");
                entity.Property(e => e.InternId).HasColumnName("intern_id");
                entity.Property(e => e.ProjectId).HasColumnName("project_id");
                entity.Property(e => e.Score).HasColumnName("score");
                entity.Property(e => e.Feedback).HasColumnName("feedback");
                entity.Property(e => e.Evaluator).HasColumnName("evaluator");
                entity.Property(e => e.CreatedAt).HasColumnName("created_at");

                // Relationships
                entity.HasOne(e => e.Intern)
                    .WithMany(i => i.Evaluations)
                    .HasForeignKey(e => e.InternId);

                entity.HasOne(e => e.Project)
                    .WithMany(p => p.Evaluations)
                    .HasForeignKey(e => e.ProjectId);
            });
        }
    }
}
