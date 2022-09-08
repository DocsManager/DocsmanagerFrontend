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
            textDecoration: "none",
          },
        },
        contained: {
          backgroundColor: "#3791f8",
          ":hover": {
            backgroundColor: "#3791f8",
            fontWeight: "bold",
            textDecoration: "none !important",
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
          ":focus": {
            outline: "none !important",
          },
          ":active": {
            outline: "none !important",
          },
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
    MuiTypography: {
      styleOverrides: {
        body2: {
          fontSize: "1.1rem",
          color: "white",
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          height: "5px",
        },
      },
    },
    MuiBox: {
      styleOverrides: {
        root: {
          scrollbarWidth: "thin",
          "&::webkit-scrollbarWidth": {
            width: "0.4em",
          },
          outline: "none !important",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        elevation8: {
          border: "1px solid #3791f8",
          width: "420px",
        },
      },
    },
    MuiSvgIcon: {
      styleOverride: {
        root: {
          ":focus": {
            outline: "none !important",
          },
          ":active": {
            outline: "none !important",
          },
          outline: "none!important",
        },
      },
    },
  },
});
