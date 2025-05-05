export const calculateEmployeeStats = (employeeData) => {
  const stats = {
    total: 0,
    billable: 0,
    benched: 0,
    shadow: 0,
    interns: 0,
  };

  if (employeeData && employeeData.length > 0) {
    stats.total = employeeData.length;
    stats.billable = employeeData.filter(
      (emp) => emp.BenchStatus === "Allocated"
    ).length;
    stats.benched = employeeData.filter(
      (emp) => emp.BenchStatus === "Benched"
    ).length;
    stats.shadow = employeeData.filter(
      (emp) => emp.BenchStatus === "Shadow"
    ).length;
    stats.interns = employeeData.filter((emp) =>
      emp.Designation?.toLowerCase().includes("associate")
    ).length;
  }

  return {
    total: stats.total.toString(),
    billable: stats.billable.toString(),
    benched: stats.benched.toString(),
    shadow: stats.shadow.toString(),
    interns: stats.interns.toString(),
  };
};
