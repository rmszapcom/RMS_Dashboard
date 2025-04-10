using System.ComponentModel.DataAnnotations;

namespace RMS_Dashboard.Core.Entities;

public class Project
{
    [Key]
    public int ProjectID { get; set; }

    [Required]
    public string ProjectName { get; set; }

    public string ProjectCode { get; set; }
    public string ClientName { get; set; }

    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }

    [EnumDataType(typeof(ProjectStatus))]
    public string ProjectStatus { get; set; }

    public string EngineeringManager { get; set; }
    public string Architect { get; set; }

    public string Description { get; set; }

    public ICollection<EmployeeEngagementPlan> EngagementPlans { get; set; }
    public ICollection<ResourceAllocation> Allocations { get; set; }
}
