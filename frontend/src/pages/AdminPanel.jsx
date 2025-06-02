import React, { useState } from "react";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Button,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Edit, Delete, Add } from "@mui/icons-material";
import ProfileMenu from "../components/ProfileMenu";

const dummyProjects = [
  { id: 1, name: "Project Alpha", client: "Client A" },
  { id: 2, name: "Project Beta", client: "Client B" },
];
const dummyClients = [
  { id: 1, name: "Client A" },
  { id: 2, name: "Client B" },
];
const dummyUsers = [
  { id: 1, name: "John Doe", role: "Admin" },
  { id: 2, name: "Jane Smith", role: "User" },
];
const dummySkills = [
  { id: 1, name: "React" },
  { id: 2, name: "Node.js" },
];

function AdminPanel() {
  const [tab, setTab] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState(""); // "add" | "edit"
  const [entity, setEntity] = useState(""); // "project" | "client" | "user"
  const [selected, setSelected] = useState(null);

  // Dummy state for demonstration
  const [projects, setProjects] = useState(dummyProjects);
  const [clients, setClients] = useState(dummyClients);
  const [users, setUsers] = useState(dummyUsers);
  const [skills, setSkills] = useState(dummySkills);

  // Handlers
  const handleOpenDialog = (type, entityType, row = null) => {
    setDialogType(type);
    setEntity(entityType);
    setSelected(row);
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelected(null);
  };

  // Renderers
  const renderTable = (rows, columns, entityType) => (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell key={col}>{col}</TableCell>
            ))}
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              {columns.map((col) => (
                <TableCell key={col}>{row[col.toLowerCase()]}</TableCell>
              ))}
              <TableCell>
                <IconButton
                  color="primary"
                  onClick={() => handleOpenDialog("edit", entityType, row)}
                >
                  <Edit />
                </IconButton>
                <IconButton
                  color="error"
                  onClick={() => {
                    // Add delete logic here
                  }}
                >
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <Box sx={{ width: "100%", p: 3, position: "relative" }}>
      <ProfileMenu />
      <Typography
        variant="h5"
        gutterBottom
        sx={{ color: "#1C196E", fontWeight: 700, mb: 3 }}
      >
        Admin Panel
      </Typography>
      <Tabs
        value={tab}
        onChange={(_, v) => setTab(v)}
        sx={{ mb: 2 }}
        textColor="primary"
        indicatorColor="primary"
      >
        <Tab label="Skills" />
        <Tab label="Projects" />
        <Tab label="Clients" />

        <Tab label="User Access" />
      </Tabs>

      {tab === 0 && (
        <Box>
          <Button
            variant="contained"
            startIcon={<Add />}
            sx={{ mb: 2 }}
            onClick={() => handleOpenDialog("add", "skill")}
          >
            Add Skill
          </Button>
          {renderTable(skills, ["Name"], "skill")}
        </Box>
      )}

      {tab === 1 && (
        <Box>
          <Button
            variant="contained"
            startIcon={<Add />}
            sx={{ mb: 2 }}
            onClick={() => handleOpenDialog("add", "project")}
          >
            Add Project
          </Button>
          {renderTable(projects, ["Name", "Client"], "project")}
        </Box>
      )}
      {tab === 2 && (
        <Box>
          <Button
            variant="contained"
            startIcon={<Add />}
            sx={{ mb: 2 }}
            onClick={() => handleOpenDialog("add", "client")}
          >
            Add Client
          </Button>
          {renderTable(clients, ["Name"], "client")}
        </Box>
      )}
      {tab === 3 && (
        <Box>
          <Button
            variant="contained"
            startIcon={<Add />}
            sx={{ mb: 2 }}
            onClick={() => handleOpenDialog("add", "user")}
          >
            Grant Access
          </Button>
          {renderTable(users, ["Name", "Role"], "user")}
        </Box>
      )}

      {/* Dialog for Add/Edit */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          {dialogType === "add" ? "Add" : "Edit"}{" "}
          {entity.charAt(0).toUpperCase() + entity.slice(1)}
        </DialogTitle>
        <DialogContent>
          {/* Example fields, adjust as needed */}
          <TextField
            margin="dense"
            label="Name"
            fullWidth
            defaultValue={selected?.name || ""}
          />
          {entity === "project" && (
            <TextField
              margin="dense"
              label="Client"
              fullWidth
              defaultValue={selected?.client || ""}
            />
          )}
          {entity === "user" && (
            <TextField
              margin="dense"
              label="Role"
              fullWidth
              defaultValue={selected?.role || ""}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleCloseDialog}>
            {dialogType === "add" ? "Add" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default AdminPanel;
