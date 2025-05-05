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
        public string? Remarks { get; set; }
        public string? Skill { get; set; }
        public string? ProjectName { get; set; }
        public string? Department { get; set; }
        public string? Location { get; set; }
        public string? ReportingManager { get; set; }
        public string? SkillCategory { get; set; }
        public string? Practice { get; set; }
        public string? WorkMode { get; set; }
        public string? BenchStatus { get; set; }
        public DateTime? BenchStartDate { get; set; }
        public string? TrainingPlanAssigned { get; set; }
        public string? TrainingCompletionStatus { get; set; }
        public int? FitmentScore { get; set; }
        public DateTime? ExpectedRollOffDate { get; set; }
        public string? ExitStatus { get; set; }
        public string? AvailabilityStatus { get; set; }
    }
}
