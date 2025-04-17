import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { GlobalStyles } from "@mui/material";
import Dashboard from "./pages/Dashboard";

const theme = createTheme({
  typography: {
    fontFamily: "Poppins, sans-serif",
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
            backgroundColor: "#ccccff",
            margin: 0,
            padding: 0,
          },
          "*": { boxSizing: "border-box" },
        }}
      />
      <Dashboard />
    </ThemeProvider>
  );
}

export default App;
