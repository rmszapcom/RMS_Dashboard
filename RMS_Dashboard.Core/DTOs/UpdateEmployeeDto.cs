namespace RMS_Dashboard.Core.DTOs
{
    public class UpdateEmployeeDto
    {
        public string? Designation { get; set; }
        public string? Status { get; set; }
        public string? ClientName { get; set; }
        public string? PrimarySkills { get; set; }
        public string? RelevantExpPrimary { get; set; }
        public string? SecondarySkills { get; set; }
        public string? RelevantExpSecondary { get; set; }
        public string? ProjectName { get; set; }
        public string? Department { get; set; }
        public string? WorkLocation { get; set; }
        public string? ReportingManager { get; set; }
        public string? SkillCategory { get; set; }
        public string? OverAllExperience { get; set; }
        public string? Practice { get; set; }
        public string? WorkMode { get; set; }
        public string? IsEngaged { get; set; }
        public string? IsAllocated { get; set; }

        public string? BenchStatus { get; set; }
        public DateTime? BenchStartDate { get; set; }
        public DateTime? ExpectedRollOffDate { get; set; }
    }
}
