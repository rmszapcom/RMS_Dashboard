using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace RMS_Dashboard.Core.Entities;

public class BenchExitDetail
{
    [Key]
    public int BenchExitID { get; set; }

    [Required]
    public string EmpID { get; set; }

    public string ExitReason { get; set; }

    [EnumDataType(typeof(BenchCategory))]
    public string BenchCategory { get; set; }

    public DateTime UpdatedOn { get; set; } = DateTime.Now;

    [ForeignKey("EmpID")]
    public Employee Employee { get; set; }
}
