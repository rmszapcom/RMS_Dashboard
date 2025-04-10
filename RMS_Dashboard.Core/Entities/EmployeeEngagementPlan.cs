using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace RMS_Dashboard.Core.Entities;

public class EmployeeEngagementPlan
{
    [Key]
    public int EngagementID { get; set; }

    [Required]
    public string EmpID { get; set; }

    public string ProjectName { get; set; }
    public string EngagementPlan { get; set; }

    public DateTime? StartDate { get; set; }
    public DateTime? RollOffDate { get; set; }

    public int? ProjectID { get; set; }

    [ForeignKey("EmpID")]
    public Employee Employee { get; set; }

    [ForeignKey("ProjectID")]
    public Project Project { get; set; }
}
