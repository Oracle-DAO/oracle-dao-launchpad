import * as React from "react";
import { useParams } from "react-router-dom";
import { ethers } from "ethers";
import { useDispatch } from "react-redux";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import LinearProgress from "@mui/material/LinearProgress";

import { useProject, useWeb3Context } from "../../hooks";
import { PublicSale } from "../../abis";
import { ConnectMenu } from "../";
import "./project-details.scss";

export function ProjectDetails() {
  const [activeTab, setactiveTab] = React.useState("p-details");
  const [progress, setProgress] = React.useState(0);
  const [amountToRaised, setAmountToRaised] = React.useState(0);
  const [amountRaised, setAmountRaised] = React.useState(0);
  const [invested, setInvested] = React.useState(0);
  const [canInvest, setCanInvest] = React.useState(0);

  let { id } = useParams();
  const { project } = useProject(id);
  const { provider, address } = useWeb3Context();
  const dispatch = useDispatch();
  const projectContract = new ethers.Contract(id, PublicSale, provider);

  const updateRasiedAmounts = () => {
    projectContract.getAmountInfo().then((data) => {
      const amountToRaised = data.totalAmountToRaise_ / Math.pow(10, 18);
      const amountRaised = data.totalAmountRaised_ / Math.pow(10, 18);
      setAmountToRaised(amountToRaised);
      setAmountRaised(amountRaised);
      const complition = (amountRaised * 100) / amountToRaised;
      !isNaN(complition) && progress != complition && setProgress(complition);
    });
  };

  const handleChange = (event, newValue) => {
    setactiveTab(newValue);
  };

  React.useEffect(() => {
    updateRasiedAmounts();
    const interval = setInterval(updateRasiedAmounts, 5000);
    return () => clearInterval(interval);
  }, []);

  const updateUserTokens = () => {
    projectContract.checkMaxTokenForUser(address).then((data) => {
      setCanInvest(data / Math.pow(10, 18));
    });
    projectContract.userToTokenAmount(address).then((data) => {
      setInvested(data / Math.pow(10, 18));
    });
  };

  React.useEffect(() => {
    if (address) {
      updateUserTokens();
    }
  }, [address]);

  const invest = () => {};

  return (
    <div className="project-details-wrapper">
      <div className="details mt-5 p-5 pt-0">
        <div className="d-flex justify-content-between flex-wrap">
          <div className="d-flex align-items-center mt-5">
            <span className="icon"></span>
            <span className="project-name ms-3">Gamium</span>
          </div>
          <div className="d-flex  align-items-center mt-5">
            <a className="social-links ms-3" href="/" target="_blank">
              <i className="bi-twitter"></i>
            </a>
            <a className="social-links ms-3" href="/" target="_blank">
              <i className="bi-twitter"></i>
            </a>
            <a className="social-links ms-3" href="/" target="_blank">
              <i className="bi-twitter"></i>
            </a>
            <a className="social-links ms-3" href="/" target="_blank">
              <i className="bi-twitter"></i>
            </a>
          </div>
        </div>
        <div className="mt-3">
          <p className="description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </p>
        </div>
      </div>
      <div className="additional-details d-flex mt-5 flex-wrap">
        <div className="flex-grow-1 graph">
          {/*<img*/}
          {/*    // TODO fix the image size*/}
          {/*    style={{ maxWidth: "200px", maxHeight: "200px"}}*/}
          {/*    alt={`Project Banner`}*/}
          {/*    src={"https://ipfs.infura.io/ipfs/" + "QmSigQ8iu5aj2w1kan4vD1f9bnFBrxyNM6ZXB2JTU2g232"}*/}
          {/*/>*/}
        </div>
        <div className="spacer"></div>
        <div className="screening p-4">
          <div className="d-flex align-items-center">
            <span className="icon"></span>
            <span className="project-name ms-3">Gamium</span>
          </div>
          <div className="d-flex mt-4 flex-wrap">
            <div className="d-flex flex-grow-1 align-items-center">
              <span className="icon"></span>
              <div className="d-flex flex-column ms-3">
                <span className="s-title">Lead VC</span>
                <span className="b-title">Dao maker</span>
              </div>
            </div>
            <div className="d-flex flex-grow-1 align-items-center">
              <span className="icon"></span>
              <div className="d-flex flex-column ms-3">
                <span className="s-title">Lead VC</span>
                <span className="b-title">Dao maker</span>
              </div>
            </div>
          </div>
          <div className="d-flex mt-4 flex-wrap">
            <div className="d-flex flex-grow-1 align-items-center">
              <span className="ckbox untick">
                <i className="bi-x"></i>
              </span>
              <span className="b-title">Controlled Cap</span>
            </div>
            <div className="d-flex flex-grow-1 align-items-center">
              <span className="ckbox tick">
                <i className="bi-check"></i>
              </span>
              <span className="b-title">DAO Approved Metrics</span>
            </div>
          </div>
        </div>
      </div>
      <div className="progress-container flex-wrap flex-column d-flex mt-5 p-3">
        <div className="flex-wrap d-flex flex-row align-items-center">
          <div className="flex-grow-1 progress-line">
            <LinearProgress variant="determinate" value={progress} />
          </div>
          <div className="ms-3">
            {address && (
              <button className="invest-button" type="button" onClick={invest}>
                Invest
              </button>
            )}
            {!address && <ConnectMenu></ConnectMenu>}
          </div>
        </div>
        <p>Amount to raise: {amountToRaised}</p>
        <p>Amount raised: {amountRaised}</p>
        {address && (
          <>
            <p>Invested: {invested}</p>
            <p>Can Invest: {canInvest}</p>
          </>
        )}
      </div>
      <div className="table-section d-flex mt-5 mb-5 p-4 flex-column">
        <div className="tabs d-flex align-items-start">
          <Tabs
            value={activeTab}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            aria-label="secondary tabs"
            centered
          >
            <Tab value="p-details" label="Project Details" />
            <Tab value="schedule" label="Schedule" />
            <Tab value="alloc" label="Your Allocation" />
          </Tabs>
        </div>
        {activeTab === "p-details" && (
          <div className="d-flex flex-wrap">
            <div className="mt-4 flex-grow-1">
              <table>
                <thead>
                  <tr>
                    <th colSpan="2">Pool Information</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Opens</td>
                    <td>2021-12-02 08:00:00 UTC</td>
                  </tr>
                  <tr>
                    <td>Opens</td>
                    <td>2021-12-02 08:00:00 UTC</td>
                  </tr>
                  <tr>
                    <td>Opens</td>
                    <td>2021-12-02 08:00:00 UTC</td>
                  </tr>
                  <tr>
                    <td>Opens</td>
                    <td>2021-12-02 08:00:00 UTC</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="spacer"></div>
            <div className="mt-4 flex-grow-1">
              <table>
                <thead>
                  <tr>
                    <th colSpan="2">Token information</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Name</td>
                    <td>Operon Origins</td>
                  </tr>
                  <tr>
                    <td>Token Symbol</td>
                    <td>ORO</td>
                  </tr>
                  <tr>
                    <td>Total Supply </td>
                    <td>1000000</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
        {activeTab === "schedule" && <div>Schedule</div>}
        {activeTab === "alloc" && <div>Your Allocation</div>}
      </div>
    </div>
  );
}
