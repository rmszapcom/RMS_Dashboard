import React from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Box,
} from "@mui/material";

function EmployeeTable({
  employeeData,
  onEditClick,
  onAllocateClick,
  onReleaseClick,
}) {
  // Dynamically generate headers from the first employee object
  const headers = employeeData.length > 0 ? Object.keys(employeeData[0]) : [];
  // Add "Actions" as the last header
  headers.push("Actions");

  const formatArray = (arr) =>
    arr && Array.isArray(arr)
      ? arr.map((item, idx) => (
          <span key={idx} style={{ marginRight: "15px", whiteSpace: "nowrap" }}>
            {Object.entries(item)
              .map(([key, val]) => `${key}: ${val}`)
              .join(", ")}
          </span>
        ))
      : "N/A";

  return (
    <Table sx={{ minWidth: "100%", tableLayout: "auto" }}>
      <TableHead>
        <TableRow sx={{ backgroundColor: "#1C196E" }}>
          {headers.map((heading, idx) => (
            <TableCell
              key={heading}
              align="center"
              sx={{
                color: "#FFFFFF",
                fontWeight: "bold",
                fontSize: "0.85rem",
                borderRight:
                  idx !== headers.length - 1 ? "1px solid #ccc" : "none",
                // Make EmployeeName column sticky
                position: heading === "EmployeeName" ? "sticky" : "static",
                left: heading === "EmployeeName" ? 0 : "auto",
                zIndex: heading === "EmployeeName" ? 10 : "auto",
                backgroundColor:
                  heading === "EmployeeName" ? "#1C196E" : "none",
              }}
            >
              {heading}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>

      <TableBody>
        {employeeData.map((emp, index) => (
          <TableRow key={index} sx={{ "& td": { textAlign: "center" } }}>
            {headers.map((heading, idx) => {
              // Skip the "Actions" column here as we will add it separately
              if (heading === "Actions") {
                return (
                  <TableCell key={heading} sx={{ padding: "8px" }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        gap: 1,
                      }}
                    >
                      <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        onClick={() => onEditClick(emp)}
                      >
                        Edit
                      </Button>
                      {emp.BenchStatus === "Allocated" && (
                        <Button
                          variant="outlined"
                          color="error"
                          size="small"
                          onClick={() => onReleaseClick(emp)}
                        >
                          Release
                        </Button>
                      )}
                      {(emp.BenchStatus === "Benched" ||
                        emp.BenchStatus === "Shadow") && (
                        <Button
                          variant="outlined"
                          color="success"
                          size="small"
                          onClick={() => onAllocateClick(emp)}
                        >
                          Allocate
                        </Button>
                      )}
                    </Box>
                  </TableCell>
                );
              }

              return (
                <TableCell
                  key={heading}
                  sx={{
                    fontSize: "0.85rem",
                    borderRight:
                      idx !== headers.length - 1 ? "1px solid #ccc" : "none",
                    // Make EmployeeName column sticky
                    position: heading === "EmployeeName" ? "sticky" : "static",
                    left: heading === "EmployeeName" ? 0 : "auto",
                    zIndex: heading === "EmployeeName" ? 10 : "auto",
                    backgroundColor:
                      heading === "EmployeeName" ? "white" : "none",
                  }}
                >
                  {heading === "BenchExitDetails" ||
                  heading === "Skills" ||
                  heading === "EngagementPlans" ||
                  heading === "Allocations"
                    ? formatArray(emp[heading])
                    : emp[heading]}
                </TableCell>
              );
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default EmployeeTable;
