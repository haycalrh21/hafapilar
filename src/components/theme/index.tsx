"use client";
import { ThemeProvider, createTheme } from "@mui/material/styles";

export default function Provider({ children }: { children: React.ReactNode }) {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#0F4C5C",
      },
      secondary: {
        main: "#FFA500",
      },
      background: {
        default: "#ECECEC",
      },
    },
    typography: {
      fontFamily: "Arial, sans-serif",
    },
  });
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
