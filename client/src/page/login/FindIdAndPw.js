import React from "react";
import FindId from "./FindId";
import FindPassword from "./FindPassword.js";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { withStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";

const CustomTab = withStyles({
  root: {
    fontSize: "1.1rem",
    textAlign: "center",
    outline: "none!important",
    fontWeight: "bold",
    background: "#ffffff",
    color: "#000000",
  },
  selected: {
    color: "#ffffff",
    background: "#3791f8",
    fontWeight: "bolder",
  },
})(Tab);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div style={{ height: "100vh", display: "flex", alignItems: "center" }}>
      <Container
        maxWidth={"md"}
        sx={{
          display: "flex",
          flexDirection: "column",
          marginLeft: "auto",
          marginRight: "auto",
          alignContent: "center",
          marginTop: "auto",
          margin: "0 auto",
        }}
      >
        <Container
          maxWidth={"sm"}
          sx={{
            display: "flex",
            justifyContent: "space-around",
            marginBottom: "35px",
          }}
        >
          <Link to="/">
            <img
              src={`${process.env.PUBLIC_URL}/findidpwlogo.png`}
              alt="dmlogo"
              className="dmlogo"
              width="600"
              height="150"
            />
          </Link>
        </Container>
        <Box>
          <AppBar position="static">
            <Tabs
              value={value}
              TabIndicatorProps={{
                hidden: true,
              }}
              onChange={handleChange}
              sx={{
                "& button.Mui-selected": {
                  background: "#3791f8",
                  color: "#ffffff",
                },
              }}
              variant="fullWidth"
              aria-label="full width tabs example"
            >
              <CustomTab label="Id 찾기" {...a11yProps(0)} />
              <CustomTab label="비밀번호 찾기" {...a11yProps(1)} />
            </Tabs>
          </AppBar>
          <SwipeableViews
            axis={value === 0 ? "x-reverse" : "x"}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel value={value} index={0} dir={theme.direction}>
              <FindId />
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              <FindPassword />
            </TabPanel>
          </SwipeableViews>
        </Box>
      </Container>
    </div>
  );
}
