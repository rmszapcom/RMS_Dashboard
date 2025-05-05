import React from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  IconButton,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 1100,
  maxHeight: "92vh",
  overflowY: "auto",
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

function EditEmployeeModal({ open, handleClose, employee = {}, handleSave }) {
  const [formData, setFormData] = React.useState({});

  React.useEffect(() => {
    setFormData(employee || {});
  }, [employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNestedChange = (field, index, key, value) => {
    const updated = [...(formData[field] || [])];
    updated[index] = { ...updated[index], [key]: value };
    setFormData((prev) => ({ ...prev, [field]: updated }));
  };

  const handleFormSave = () => {
    handleSave(formData);
    handleClose();
  };

  // List of fields that need to be disabled (fields marked with "N")
  const disabledFields = [
    "EmployeeID",
    "EmployeeName",
    "WorkLocation",
    "CareerStartDate",
    "DateOfJoining",
    "ExitDate",
    "OverAllExperience",
    "FitmentScore",
    "Salary",
  ];

  const renderScalarFields = () => {
    return Object.entries(formData)
      .filter(([key, value]) => !Array.isArray(value))
      .map(([key, value], idx) => (
        <Grid item xs={12} sm={6} key={idx}>
          <TextField
            fullWidth
            label={key}
            name={key}
            value={value || ""}
            onChange={handleChange}
            size="small"
            disabled={disabledFields.includes(key)} // Disable based on the list
            sx={{
              "& .MuiInputLabel-root": { fontSize: "0.875rem" },
              "& .MuiInputBase-root": { fontSize: "0.875rem" },
            }}
          />
        </Grid>
      ));
  };

  const renderArrayFields = () => {
    return Object.entries(formData)
      .filter(([_, value]) => Array.isArray(value))
      .map(([key, array], idx) => (
        <Box key={idx} my={2}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
            {key}
          </Typography>
          <Grid container spacing={2}>
            {array.map((item, itemIndex) =>
              Object.entries(item).map(([itemKey, itemVal], fieldIndex) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  key={`${itemIndex}-${fieldIndex}`}
                >
                  <TextField
                    fullWidth
                    label={`${key} ${itemIndex + 1} - ${itemKey}`}
                    value={itemVal || ""}
                    onChange={(e) =>
                      handleNestedChange(
                        key,
                        itemIndex,
                        itemKey,
                        e.target.value
                      )
                    }
                    size="small"
                    disabled={disabledFields.includes(itemKey)} // Disable nested fields based on the list
                    sx={{
                      "& .MuiInputLabel-root": { fontSize: "0.8rem" },
                      "& .MuiInputBase-root": { fontSize: "0.8rem" },
                    }}
                  />
                </Grid>
              ))
            )}
          </Grid>
          <Divider sx={{ mt: 2, mb: 2 }} />
        </Box>
      ));
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Typography variant="h6" sx={{ fontWeight: 500 }}>
            Edit Employee
          </Typography>
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>

        <Grid container spacing={2}>
          {renderScalarFields()}
        </Grid>

        {renderArrayFields()}

        <Box mt={4} display="flex" justifyContent="flex-end" gap={2}>
          <Button
            variant="outlined"
            onClick={handleClose}
            sx={{ fontSize: "0.875rem" }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleFormSave}
            sx={{ fontSize: "0.875rem" }}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default EditEmployeeModal;
