import React from "react";
import { Table, TableHead, TableRow, TableCell, TableBody, Button, Box } from "@mui/material";

function EmployeeTable({ employeeData, onEditClick, onAllocateClick, onReleaseClick }) {
  const headers = employeeData.length > 0 ? Object.keys(employeeData[0]) : [];
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
                borderRight: idx !== headers.length - 1 ? "1px solid #ccc" : "none",
                position: heading === "employeeName" ? "sticky" : "static",
                left: heading === "employeeName" ? 0 : "auto",
                zIndex: heading === "employeeName" ? 1200 : "auto",
                backgroundColor: heading === "employeeName" ? "#1C196E" : "inherit",
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
              if (heading === "Actions") {
                return (
                  <TableCell key={heading} sx={{ padding: "8px" }}>
                    <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
                      <Button variant="outlined" color="primary" size="small" onClick={() => onEditClick(emp)}>
                        Edit
                      </Button>
                      {emp.status === "Allocated" && (
                        <Button variant="outlined" color="error" size="small" onClick={() => onReleaseClick(emp)}>
                          Release
                        </Button>
                      )}
                      {(emp.status === "Bench" || emp.status === "Shadow") && (
                        <Button variant="outlined" color="success" size="small" onClick={() => onAllocateClick(emp)}>
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
                    borderRight: idx !== headers.length - 1 ? "1px solid #ccc" : "none",
                    position: heading === "employeeName" ? "sticky" : "static",
                    left: heading === "employeeName" ? 0 : "auto",
                    zIndex: heading === "employeeName" ? 1000 : "auto",
                    backgroundColor: heading === "employeeName" ? "#fff" : "inherit",
                  }}
                >
                  {heading === "BenchExitDetails" || heading === "Skills" || heading === "EngagementPlans" || heading === "Allocations"
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