import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { GlobalStyles } from "@mui/material";
import Dashboard from "./pages/Dashboard";

const theme = createTheme({
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
  palette: {
    primary: {
      main: "#000080",
      secondary: " #000099",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles
        styles={{
          html: { maxWidth: "100vw", overflowX: "hidden" },
          body: {
            maxWidth: "100vw",
            overflowX: "hidden",
            backgroundColor: "#ffff",
            margin: 0,
            padding: 0,
          },
          "*": { boxSizing: "border-box" },
        }}
      />
      <Dashboard />
      {/* <DashboardOverview /> */}
    </ThemeProvider>
  );
}

export default App;
