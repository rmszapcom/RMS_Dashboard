
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
        public string Remarks { get; set; }
        public string Skill { get; set; }
        public string ProjectName { get; set; }
        public string Department { get; set; }
        public string Location { get; set; }
        public string WorkLocation { get; set; }
        public string ReportingManager { get; set; }
        public string OverAllExperience { get; set; }
        public string SkillCategory { get; set; }
        public string Practice { get; set; }
        public DateTime? CareerStartDate { get; set; }
        public DateTime? DateOfJoining { get; set; }
        public DateTime? ExitDate { get; set; }
        public decimal? TotalExpYears { get; set; }

        [EnumDataType(typeof(WorkMode))]
        public string WorkMode { get; set; }

        [EnumDataType(typeof(BenchStatus))]
        public string BenchStatus { get; set; }
        public DateTime? BenchStartDate { get; set; }
        public string TrainingPlanAssigned { get; set; }

        [EnumDataType(typeof(TrainingCompletionStatus))]
        public string TrainingCompletionStatus { get; set; }

        [Range(0, 100)]
        public int? FitmentScore { get; set; }
        public DateTime? ExpectedRollOffDate { get; set; }
        public string PerformanceRating { get; set; }

        [EnumDataType(typeof(ExitStatus))]
        public string ExitStatus { get; set; }

        public string Salary { get; set; } 

        [NotMapped]
        public string AvailabilityStatus { get; set; }

        public ICollection<BenchExitDetail> BenchExitDetails { get; set; }
        public ICollection<EmployeeSkill> Skills { get; set; }
        public ICollection<EmployeeEngagementPlan> EngagementPlans { get; set; }
        public ICollection<ResourceAllocation> Allocations { get; set; }
    }

}
