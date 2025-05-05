import React from "react";
import {
  Box,
  Typography,
  IconButton,
  MenuItem,
  Paper,
  Popper,
  ClickAwayListener,
  Grow,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

const ChartCard = ({
  title,
  children,
  showFilter = false,
  onFilterChange,
  filterOptions = [],
  currentFilter,
}) => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const theme = useTheme();

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event, filter = null) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) return;
    if (filter) onFilterChange(filter);
    setOpen(false);
  };

  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 2,
        backgroundColor: "#fdfdfd",
        height: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        {/*Title*/}
        <Typography
          sx={{ fontWeight: 500, color: theme.palette.primary.main, mb: 1 }}
        >
          {title}
        </Typography>

        {/*Filter Option*/}
        {showFilter && (
          <>
            <IconButton
              ref={anchorRef}
              size="small"
              onClick={handleToggle}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                border: "1px solid #ccc",
                borderRadius: 1,
                color: theme.palette.primary.secondary,
                px: 1,
                py: 0.5,
                fontSize: "0.75rem",
              }}
            >
              <FilterAltIcon fontSize="small" />
              {currentFilter && (
                <Typography
                  sx={{
                    fontSize: "0.75rem",
                    color: theme.palette.primary.secondary,
                  }}
                >
                  {currentFilter}
                </Typography>
              )}
              <Typography
                sx={{
                  fontSize: "0.75rem",
                  color: theme.palette.primary.secondary,
                }}
              >
                ▼
              </Typography>
            </IconButton>

            <Popper
              open={open}
              anchorEl={anchorRef.current}
              role={undefined}
              placement="bottom-end"
              transition
              disablePortal
              modifiers={[
                {
                  name: "offset",
                  options: {
                    offset: [0, 4],
                  },
                },
              ]}
            >
              {({ TransitionProps }) => (
                <Grow {...TransitionProps}>
                  <Paper
                    sx={{
                      mt: 1,
                      fontSize: "0.75rem",
                      zIndex: 1300,
                    }}
                  >
                    <ClickAwayListener onClickAway={(e) => handleClose(e)}>
                      <Box>
                        {filterOptions.map((opt) => (
                          <MenuItem
                            key={opt}
                            selected={opt === currentFilter}
                            onClick={(e) => handleClose(e, opt)}
                            sx={{ fontSize: "0.75rem", px: 2 }}
                          >
                            {opt}
                          </MenuItem>
                        ))}
                      </Box>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </>
        )}
      </Box>
      {children}
    </Box>
  );
};

export default ChartCard;
