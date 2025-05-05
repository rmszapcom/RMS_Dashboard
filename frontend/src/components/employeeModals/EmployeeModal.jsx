import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import EditEmployeeModal from "./EditEmployeeModal";
import ProjectAllocationModal from "./ProjectAllocationModal";
import ConfirmationDialog from "../ConfirmationDialog";
import EmployeeTable from "./EmployeeTable";
import "./EmployeeModal.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 1100,
  maxHeight: "90vh",
  overflowY: "auto",
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

function EmployeeModal({ open, handleClose, status, employeeData }) {
  const [editOpen, setEditOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [allocationOpen, setAllocationOpen] = useState(false);
  const [allocationEmployee, setAllocationEmployee] = useState(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  // Dummy data
  const dummyProjects = ["Alpha", "Beta", "Gamma"];
  const dummyClients = ["Acme Corp", "Globex Inc", "Initech"];

  const handleEditClick = (employee) => {
    setSelectedEmployee(employee);
    setEditOpen(true);
  };

  const handleReleaseClick = (employee) => {
    setSelectedEmployee(employee);
    setConfirmDialogOpen(true); // Open the confirmation dialog
  };

  const handleConfirmRelease = () => {
    console.log(
      `Released ${selectedEmployee.EmployeeName} from ${selectedEmployee.ProjectName}`
    );
    setConfirmDialogOpen(false);
  };

  const handleAllocateClick = (employee) => {
    setAllocationEmployee(employee);
    setAllocationOpen(true);
  };

  const handleAllocationSave = (updatedEmployee) => {
    console.log("Allocated Employee:", updatedEmployee);
    setAllocationOpen(false);
  };

  const handleEditSave = (updatedData) => {
    console.log("Saved Data:", updatedData);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredEmployeeData = employeeData.filter((emp) =>
    (emp.name?.toLowerCase() ?? "").includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography sx={{ color: "#1C196E", fontWeight: 500 }}>
              {status} Employees
            </Typography>
            <CloseIcon
              onClick={handleClose}
              sx={{
                cursor: "pointer",
                color: "#1C196E",
                fontSize: 28,
                "&:hover": { color: "#f44336" },
              }}
            />
          </Box>

          {/* Search Bar */}
          <Box sx={{ width: "100%", mb: 2 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search by Name"
              value={searchTerm}
              onChange={handleSearchChange}
              sx={{ height: "20%" }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <Box sx={{ width: "100%", overflowX: "auto" }}>
            <EmployeeTable
              employeeData={filteredEmployeeData}
              status={status}
              onEditClick={handleEditClick}
              onReleaseClick={handleReleaseClick}
              onAllocateClick={handleAllocateClick}
            />
          </Box>
        </Box>
      </Modal>

      <EditEmployeeModal
        open={editOpen}
        handleClose={() => setEditOpen(false)}
        employee={selectedEmployee}
        handleSave={handleEditSave}
      />

      <ProjectAllocationModal
        open={allocationOpen}
        handleClose={() => setAllocationOpen(false)}
        employee={allocationEmployee}
        projects={dummyProjects}
        clients={dummyClients}
        onSave={handleAllocationSave}
      />

      <ConfirmationDialog
        open={confirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
        onConfirm={handleConfirmRelease}
        title="Release Confirmation"
        description={`Are you sure you want to release ${selectedEmployee?.EmployeeName}?`}
        confirmText="Release"
        confirmColor="error"
      />
    </>
  );
}

export default EmployeeModal;
