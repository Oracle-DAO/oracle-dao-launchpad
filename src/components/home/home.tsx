import "./home.scss";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Grid, Box } from "@mui/material";
import { Language, Twitter, Telegram, GitHub } from "@mui/icons-material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useProject } from "../../hooks";
import { ADDRESSES } from "../../constants";

export function MenuInterface() {
    const [activeTab, setActiveTab] = React.useState("two");
    const handleChange = (id: any) => {
        setActiveTab(id);
    };
    return (
        <>
            <div className="headline-root">
                <Box className="headline-left-box">
                    <section className="main-info">
                        <div>
                            <p>What is Oracle Finance?</p>
                            <p>
                                A Financial Platform To Facilitate
                                <br />A Multitude Of Cryptocurrency
                                <br />
                                Investing
                            </p>
                            <div>
                                <p>
                                    Oracle is a community-governed, yield generating
                                    <br />
                                    deflationary protocol that is built for sustainable
                                    <br />
                                    growth in any market condition
                                </p>
                            </div>
                        </div>
                    </section>
                </Box>
                <Box className="headline-right-box">
                    <img
                        src="https://shortpixel.com/img/slider/berries-optimized-by-shortpixel.jpg"
                        alt="Potato"
                        className="headline-img"
                    />
                </Box>
            </div>
            <div className="tab-root">
                <div className="tab-div">
                    <ul className="nav">
                        <li
                            onClick={() => handleChange("one")}
                            className={activeTab === "one" ? "active" : ""}
                        >
                            Coming Soon
                        </li>
                        <li
                            onClick={() => handleChange("two")}
                            className={activeTab === "two" ? "active" : ""}
                        >
                            Ongoing
                        </li>
                        <li
                            onClick={() => handleChange("three")}
                            className={activeTab === "three" ? "active" : ""}
                        >
                            Closed
                        </li>
                    </ul>
                </div>
            </div>
            <Grid container justifyContent="center" spacing={5} marginBottom={5}>
                {Object.keys(ADDRESSES).map((value) => {
                    return (
                        <Grid item xs={10} sm={8} md={6} lg={4} key={value}>
                            <LaunchpadHome address={ADDRESSES[value]} />
                        </Grid>
                    );
                })}
            </Grid>
        </>
    );
}

function LaunchpadHome(props: any) {
    const { project } = useProject(props.address);
    const [value, setValue] = React.useState("one");
    const handleChange = (event: any, newValue: any) => {
        setValue(newValue);
    };
    let navigate = useNavigate();
    const showProjectDetail = () => {
        navigate(`/project-details/${props.address}`);
    };
    return (
        <div className="card-root">
            <img
                src="https://shortpixel.com/img/slider/berries-optimized-by-shortpixel.jpg"
                alt="Potato"
                className="img"
            />
            <div className="icons">
                <Grid container justifyContent="flex-start" spacing={1}>
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
            <div className="tabs">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    textColor="primary"
                    indicatorColor="secondary"
                    aria-label="secondary tabs"
                >
                    <Tab value="one" label="Offering" />
                    <Tab value="two" label="Screening" />
                    <Tab value="three" label="Description" />
                </Tabs>
            </div>
            {value === "one" ? (
                <div className="content">
                    <div>
                        <p>{props.title}</p>
                        <div className="content-spacing">
                            <p className="content-text-title">Registration Opens</p>
                            <p className="content-time">23h 58m 36s</p>
                        </div>
                        <div className="content-spacing">
                            <p className="content-text-title">PUBLIC Total Raise</p>
                            <p className="content-text">$150,000</p>
                        </div>
                        <div className="content-spacing">
                            <p className="content-text-title">
                                Allocation per Winning Ticket
                            </p>
                            <p className="content-text">200BUSD</p>
                        </div>
                    </div>
                </div>
            ) : (
                <div></div>
            )}
            <div className="button-div">
                <button className="research" type="button" onClick={showProjectDetail}>
                    Research
                </button>
            </div>
        </div>
    );
}
