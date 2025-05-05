import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  MenuItem,
  Select,
  FormControl,
} from "@mui/material";
import ConfirmationDialog from "../ConfirmationDialog"; // Importing the confirmation dialog

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

function ProjectAllocationModal({
  open,
  handleClose,
  employee,
  projects = [],
  clients = [],
  onSave,
}) {
  const [project, setProject] = useState("");
  const [client, setClient] = useState("");
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  React.useEffect(() => {
    if (employee) {
      setProject(employee?.ProjectName || "");
      setClient(employee?.ClientName || "");
    }
  }, [employee]);

  const handleSubmit = () => {
    setConfirmDialogOpen(true);
  };

  const handleConfirmSave = () => {
    onSave({
      ...employee,
      ProjectName: project,
      ClientName: client,
      BenchStatus: "Allocated",
    });
    setConfirmDialogOpen(false);
    handleClose();
  };

  const handleCancel = () => {
    setConfirmDialogOpen(false);
  };

  // Ensure that employee is not null before accessing its properties in the description
  const employeeName = employee ? employee.EmployeeName : "Unknown Employee";
  const projectDescription = project ? project : "Unknown Project";
  const clientDescription = client ? client : "Unknown Client";

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Typography variant="h6" mb={2}>
            Project Allocation
          </Typography>

          <FormControl fullWidth margin="normal" size="small">
            <Typography variant="body2" sx={{ mb: 0.5, fontWeight: 500 }}>
              Select Client
            </Typography>
            <Select
              value={client}
              onChange={(e) => setClient(e.target.value)}
              displayEmpty
            >
              <MenuItem value="" disabled>
                Select a client
              </MenuItem>
              {clients.map((cli, idx) => (
                <MenuItem key={idx} value={cli}>
                  {cli}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal" size="small">
            <Typography variant="body2" sx={{ mb: 0.5, fontWeight: 500 }}>
              Select Project
            </Typography>
            <Select
              value={project}
              onChange={(e) => setProject(e.target.value)}
              displayEmpty
            >
              <MenuItem value="" disabled>
                Select a project
              </MenuItem>
              {projects.map((proj, idx) => (
                <MenuItem key={idx} value={proj}>
                  {proj}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box mt={3} display="flex" justifyContent="flex-end" gap={1}>
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={!project || !client}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        open={confirmDialogOpen}
        onClose={handleCancel}
        onConfirm={handleConfirmSave}
        title="Confirm Allocation"
        description={`Are you sure you want to allocate ${employeeName} to project "${projectDescription}" for client "${clientDescription}"?`}
        confirmText="Allocate"
        confirmColor="success"
      />
    </>
  );
}

export default ProjectAllocationModal;
