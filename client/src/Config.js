import { createTheme } from "@mui/material/styles";
export const theme = createTheme({
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontSize: "1rem!important",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          outline: "none!important",
        },
        endIcon: {
          marginLeft: "5px",
        },
        text: {
          ":hover": {
            backgroundColor: "white",
            fontWeight: "bold",
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          outline: "none",
          color: "#3791f8",
        },
        sizeLarge: {
          ":focus": {
            outline: "none",
          },
        },
      },
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          outline: "none",
        },
      },
    },

    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: "rgba(0, 0, 0, 0.6)",

          "&.Mui-checked": {
            color: "#3791f8",
          },
        },
      },
    },
    MuiBadge: {
      styleOverrides: {
        badge: {
          right: "25%",
          top: "15%",
          backgroundColor: "#3791f8 !important",
          fontSize: "1rem !important",
          marginLeft: "-5px",
          //   backgroundColor: "#3791f8",
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          scrollbarWidth: "thin",
          "&::-webkit-scrollbar": {
            width: "0.4em",
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          paddingLeft: "10px",
          WebkitBoxShadow: "0 0 0 1000px white inset",
        },
      },
    },
  },
});
