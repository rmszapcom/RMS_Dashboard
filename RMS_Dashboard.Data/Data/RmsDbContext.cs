using Microsoft.EntityFrameworkCore;
using RMS_Dashboard.Core.Entities;

namespace RMS_Dashboard.Data
{
    public class RmsDbContext : DbContext
    {
        public RmsDbContext(DbContextOptions<RmsDbContext> options)
            : base(options)
        {
        }

        public DbSet<Employee> Employees { get; set; }
        public DbSet<ResourceAllocation> ResourceAllocations { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ResourceAllocation>()
                .HasKey(ra => ra.Id);
        }
    }
}
