import "./styles.css";
import Button from "@mui/material/Button";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import * as React from "react";
import CardInterface from "./CardInterface";
import {createTheme} from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { orange, pink, green } from "@mui/material/colors";



export default function Dashboard() {
    const [value, setValue] = React.useState("one");
    const handleChange = (event: React.SyntheticEvent, newValue) => {
        setValue(newValue);
    };
    const theme = createTheme({
        overrides: {
            MuiTabs: {
                indicator: {
                    backgroundColor: orange[700]
                }
            },
            MuiTab: {
                root: {
                    "&:hover": {
                        backgroundColor: pink[100],
                        color: pink[700]
                    }
                },
                selected: {
                    backgroundColor: orange[100],
                    color: orange[700],
                    "&:hover": {
                        backgroundColor: green[100],
                        color: green[700]
                    }
                }
            }
        }
    });
    return (
        <ThemeProvider theme={theme}>
            <div class="headline-root">
                <box class="headline-left-box">
                    <div class="headline-title">
                        Venture Capital
                        <br/> Re-Created
                        <br/>
                        for the Masses
                    </div>
                    <div class="headline-description">
                        Earn upto 70% APR on staking dao and buy joining our weekly challenges.
                    </div>
                    <Button class="headline-button" type="button">
                        Stake DAO
                    </Button>
                </box>
                <box class="headline-right-box">
                    <img
                        src="https://shortpixel.com/img/slider/berries-optimized-by-shortpixel.jpg"
                        alt="Potato"
                        class="headline-img"
                    />
                </box>
            </div>
            <div className="tab-div">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    textColor="secondary"
                    indicatorColor="primary"
                    aria-label="secondary tabs"
                    centered
                >
                    <Tab value="one" label="Running"/>
                    <Tab value="two" label="Upcoming"/>
                    <Tab value="three" label="Closed"/>
                </Tabs>
            </div>
            <CardInterface/>
        </ThemeProvider>
    );
}
