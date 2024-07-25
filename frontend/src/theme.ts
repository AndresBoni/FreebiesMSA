import { createTheme } from "@mui/material";
export const theme = createTheme({
  components: {
    MuiDialogContent: {
      styleOverrides: {
        root: {
          "@media (max-width:600px)": {
            padding: 10,
          },
          "@media (min-width:600px)": {
            padding: 14,
          },
        },
      },
    },
  },
});
