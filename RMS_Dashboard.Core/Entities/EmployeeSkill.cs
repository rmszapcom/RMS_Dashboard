using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace RMS_Dashboard.Core.Entities; public class EmployeeSkill
{
    [Key]
    public int SkillID { get; set; }

    [Required]
    public string EmpID { get; set; }

    public string TechStack { get; set; }
    public string Skill { get; set; }
    public string SkillDescription { get; set; }
    public string PastInitiative { get; set; }

    [ForeignKey("EmpID")]
    public Employee Employee { get; set; }
}

