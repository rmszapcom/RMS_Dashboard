
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;


namespace RMS_Dashboard.Core.Entities
{
    public class Employee
    {
        [Key]
        public string EmployeeID { get; set; }

        [Required]
        public string EmployeeName { get; set; }
        public string Designation { get; set; }
        public string Status { get; set; }
        public string ClientName { get; set; }
        public string PrimarySkills { get; set; }
        public string RelevantExpPrimary { get; set; }
        public string SecondarySkills { get; set; }
        public string RelevantExpSecondary { get; set; }
        public string ProjectName { get; set; }
        public string WorkLocation { get; set; }
        public string ReportingManager { get; set; }
        public string OverAllExperience { get; set; }
        public string SkillCategory { get; set; }
        public string Practice { get; set; }
        public DateTime? CareerStartDate { get; set; }
        public string DateOfJoining { get; set; }

        [EnumDataType(typeof(WorkMode))]
        public string WorkMode { get; set; }

        [EnumDataType(typeof(BenchStatus))]
        public string BenchStatus { get; set; }
        public ICollection<EmployeeEngagementPlan> EngagementPlans { get; set; }
        public string? IsEngaged { get; set; }

        public string? IsAllocated { get; set; }
        public DateTime? ExitDate { get; set; }
        public decimal? TotalExpYears { get; set; }
        public DateTime? BenchStartDate { get; set; }
        public DateTime? ExpectedRollOffDate { get; set; }

    }

}
