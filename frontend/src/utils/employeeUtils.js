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
      (emp) => emp.status?.trim().toLowerCase() === "allocated"
    ).length;
    stats.benched = employeeData.filter(
      (emp) => emp.status?.trim().toLowerCase() === "bench"
    ).length;
    stats.shadow = employeeData.filter(
      (emp) => emp.status?.trim().toLowerCase() === "shadow"
    ).length;
    stats.interns = employeeData.filter(
      (emp) => emp.status?.trim().toLowerCase() === "associate"
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
