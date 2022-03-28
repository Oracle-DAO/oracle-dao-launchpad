import * as React from "react";
import {useNavigate} from "react-router-dom";
import {Box, Button, Grid} from "@mui/material";
import {Cancel, CheckCircle, GitHub, Language, Telegram, Twitter} from "@mui/icons-material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import {useProject} from "../../hooks";
import "./all-projects.scss";

export function MenuInterface() {
    const [activeTab, setActiveTab] = React.useState("two");
    const handleChange = (id: any) => {
        setActiveTab(id);
    };
    const {ongoing, upcoming, ended} = useProject();
    return (
        <div className="container">
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
            {activeTab === "one" ? (
                    <Grid container justifyContent="center" spacing={5} marginBottom={5}>
                        {Object.keys(upcoming).map((value) => {
                            return (
                                <Grid item xs={10} sm={8} md={6} lg={4} key={value}>
                                    <LaunchpadHome project={upcoming[value]}/>
                                </Grid>
                            );
                        })}
                    </Grid>
                ) :
                <>
                    {activeTab === "two" ? (
                        <Grid container justifyContent="center" spacing={5} marginBottom={5}>
                            {Object.keys(ongoing).map((value) => {
                                return (
                                    <Grid item xs={10} sm={8} md={6} lg={4} key={value}>
                                        <LaunchpadHome project={ongoing[value]}/>
                                    </Grid>
                                );
                            })}
                        </Grid>
                    ) : (
                        <Grid container justifyContent="center" spacing={5} marginBottom={5}>
                            {Object.keys(ended).map((value) => {
                                return (
                                    <Grid item xs={10} sm={8} md={6} lg={4} key={value}>
                                        <LaunchpadHome project={ended[value]}/>
                                    </Grid>
                                );
                            })}
                        </Grid>
                    )
                    }
                </>
            }
        </div>
    );
}

function LaunchpadHome(props: any) {
    const [value, setValue] = React.useState("one");
    const handleChange = (event: any, newValue: any) => {
        setValue(newValue);
    };
    let navigate = useNavigate();
    const showProjectDetail = () => {
        navigate(`/project-details/${props.project.address}`);
    };
    let tokenPrice = "";
    let startDistance = props.project.projectTime[0] - Math.round((new Date()).getTime() / 1000);
    let endDistance = props.project.projectTime[1] - Math.round((new Date()).getTime() / 1000);

    const [counter, setCounter] = React.useState("");
    if (!props.project.loading) {
        setTimeout(() => {
            let distance = 0;
            if (endDistance > 0 && startDistance > 0) {
                distance = props.project.projectTime[0] - Math.round((new Date()).getTime() / 1000);
                startDistance = distance;
            } else if (endDistance > 0 && startDistance < 0) {
                distance = props.project.projectTime[1] - Math.round((new Date()).getTime() / 1000);
                endDistance = distance;
            } else {
                clearTimeout();
            }
            const days = Math.floor(distance / (60 * 60 * 24));
            const hours = Math.floor((distance % (60 * 60 * 24)) / (60 * 60));
            const minutes = Math.floor((distance % (60 * 60)) / (60));
            const seconds = Math.floor((distance % (60)));
            setCounter(days + "d " + hours + "h " + minutes + "m " + seconds + "s");
        }, 1000);
        tokenPrice = "$" + props.project.amount[0] / Math.pow(10, 18);
    }
    return (
        <div className="card-root">
            <img
                src={"https://ipfs.infura.io/ipfs/" + props.project.imageIpfsId.bannerImageId}
                alt={props.project.projectInfo.name}
                className="img"
            />
            <div className="icons">
                <Grid container justifyContent="flex-start" spacing={1}>
                    {typeof (props.project.projectInfo.socials.website) !== "undefined" ? (
                        <Grid item xs={2}>
                            <Button href={props.project.projectInfo.socials.website}>
                                <Language/>
                            </Button>
                        </Grid>) : <></>}
                    {typeof (props.project.projectInfo.socials.twitter) != "undefined" ? (
                        <Grid item xs={2}>
                            <Button href={props.project.projectInfo.socials.twitter}>
                                <Twitter/>
                            </Button>
                        </Grid>) : <></>}
                    {typeof (props.project.projectInfo.socials.telegram) != "undefined" ? (
                        <Grid item xs={2}>
                            <Button href={props.project.projectInfo.socials.telegram}>
                                <Telegram/>
                            </Button>
                        </Grid>) : <></>}
                    {typeof (props.project.projectInfo.socials.github) != "undefined" ? (
                        <Grid item xs={2}>
                            <Button href={props.project.projectInfo.socials.github}>
                                <GitHub/>
                            </Button>
                        </Grid>
                    ) : <></>}
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
                    <Tab value="one" label="Offering"/>
                    <Tab value="two" label="Screening"/>
                    <Tab value="three" label="Description"/>
                </Tabs>
            </div>
            {value === "one" ? (
                <div className="content">
                    <div>
                        <p>{props.project.projectInfo.name}</p>
                        {startDistance > 0 && endDistance > 0 ? (
                                <div className="content-spacing">
                                    <p className="content-text-title">Registration Opens</p>
                                    <p className="content-time">{counter}</p>
                                </div>) :
                            <>
                                {startDistance < 0 && endDistance > 0 ? (
                                        <div className="content-spacing">
                                            <p className="content-text-title">Registration Closes</p>
                                            <p className="content-time">{counter}</p>
                                        </div>) :
                                    <div className="content-spacing">
                                        <p className="content-text-title">Registration Closed</p>
                                        <p className="content-time">CLOSED</p>
                                    </div>
                                }
                            </>
                        }
                        <div className="content-spacing">
                            <p className="content-text-title">PUBLIC Total Raise</p>
                            <p className="content-text">{tokenPrice}</p>
                        </div>
                        <div className="content-spacing">
                            <p className="content-text-title">
                                Allocation per Winning Ticket
                            </p>
                            <p className="content-text">200BUSD</p>
                        </div>
                    </div>
                </div>
            ) : <>
                {value === "two" ? (
                        <div className="content">
                            <div className="d-flex flex-row">
                                <CheckCircle color="success" className="me-3"/>
                                <p className="text-white">
                                    Metrics advised by Oracle Finance
                                </p>
                            </div>
                            <div className="d-flex flex-row ">
                                <Cancel color="error" className="me-3"/>
                                <p className="text-white">
                                    Controlled Cap Table
                                </p>
                            </div>
                        </div>
                    )
                    : (
                        <div className="content">
                            <p className="text-white">{props.project.projectInfo.description}</p>
                        </div>
                    )
                }
            </>
            }
            <p className="button-div">
                <button className="research" type="button" onClick={showProjectDetail}>
                    Research
                </button>
            </p>
        </div>
    );
}
