import "./styles.css";
import * as React from "react";
import Typography from "@mui/material/Typography";
import { Button, Grid } from "@mui/material";
import {
  Language,
  Twitter,
  Telegram,
  GitHub,
  CheckCircle,
  Cancel
} from "@mui/icons-material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import data from "../assets/data";
import { createTheme } from '@mui/material';
import { ThemeProvider } from "@emotion/react";


const theme = createTheme({
  breakpoints: {
    values: {
      xxs: 0, // small phone
      xs: 300, // phone
      sm: 600, // tablets
      md: 900, // small laptop
      lg: 1200, // desktop
      xl: 1536 // large screens
    }
  }
});


function MenuCard() {
  return (
    <ThemeProvider theme={theme}>
      <Grid container justifyContent="center" spacing={5}>
        {data.map((value) => {
          return (
            <Grid item xs={10} sm={8} md={5} lg={4}>
              <CardInterface {...value} />
            </Grid>
          );
        })}
      </Grid>
    </ThemeProvider>
  );
}

function CardInterface(props) {
  const [value, setValue] = React.useState("one");
  const handleChange = (event: React.SyntheticEvent, newValue) => {
    setValue(newValue);
  };
  return (
    <div class="card">
      <img
        src="https://shortpixel.com/img/slider/berries-optimized-by-shortpixel.jpg"
        alt="Potato"
        class="img"
      />
      <div class="icons">
        <Grid container justifyContent="center" spacing={1}>
          <Grid item xs={2}>
            <Button>
              <Language />
            </Button>
          </Grid>
          <Grid item xs={2}>
            <Button>
              <Twitter />
            </Button>
          </Grid>
          <Grid item xs={2}>
            <Button>
              <Telegram />
            </Button>
          </Grid>
          <Grid item xs={2}>
            <Button>
              <GitHub />
            </Button>
          </Grid>
        </Grid>
      </div>
      <div>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs"
          centered
        >
          <Tab value="one" label="Offering" />
          <Tab value="two" label="Screening" />
          <Tab value="three" label="Description" />
        </Tabs>
      </div>
      {value === "one" ? (
        <div class="content">
          <Typography gutterBottom variant="h4" component="div">
            {props.title}
          </Typography>
          <Typography gutterBottom variant="subtitle1" component="div">
            PUBLIC Total Raise
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            $150,000
          </Typography>
          <Typography gutterBottom variant="subtitle1" component="div">
            Allocation per Winning ticket
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            TBD
          </Typography>
        </div>
      ) : (
        <div>
          <div class="content">
            <Typography gutterBottom variant="h5" component="div">
              DAO SCREENING
            </Typography>
            <div>
              <CheckCircle />
              <Typography gutterBottom variant="subtitle1" component="div">
                Metrics advised by DAO Maker
              </Typography>
            </div>
            <div>
              <Cancel />
              <Typography gutterBottom variant="subtitle1" component="div">
                Controlled Cap Table
              </Typography>
            </div>
          </div>
        </div>
      )}
      <div class="button-div">
        <Button class="button" type="button">
          Research
        </Button>
      </div>
    </div>
  );
}
export default MenuCard;
