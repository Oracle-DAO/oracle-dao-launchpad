import * as React from "react";
import { useParams } from "react-router-dom";
import { ethers } from "ethers";
import { useDispatch, useSelector } from "react-redux";

import {
  OutlinedInput,
  InputAdornment,
  IconButton,
  Button,
} from "@mui/material";
import { Cancel, CheckCircle } from "@mui/icons-material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import LinearProgress from "@mui/material/LinearProgress";

import { useWeb3Context } from "../../hooks";
import { PublicSale, StableCoin } from "../../abis";
import { ConnectMenu } from "../";
import {
  isPendingTxn,
  txnButtonText,
  invest,
  changeApproval,
  warning,
  fetchProjectDetails,
} from "../../store/slices";
import "./project-details.scss";
import { getAddress, messages, DEFAULT_NETWORK } from "../../constants";

export function ProjectDetails() {
  const [projectLoading, setProjectLoading] = React.useState(true);
  const [activeTab, setactiveTab] = React.useState("p-details");
  const [progress, setProgress] = React.useState(0);
  const [amountToRaised, setAmountToRaised] = React.useState(0);
  const [amountRaised, setAmountRaised] = React.useState(0);
  const [invested, setInvested] = React.useState(0);
  const [canInvest, setCanInvest] = React.useState(0);
  const [allowance, setAllowance] = React.useState(false);
  const [quantity, setQuantity] = React.useState("");
  const ipfsURL = "https://ipfs.infura.io/ipfs/";
  const [time, setTime] = React.useState([]);
  const [totalSupply, setTotalSupply] = React.useState(0);
  const [tokenName, setTokenName] = React.useState("");



  let { id } = useParams();
  const { provider, address, chainID, checkWrongNetwork } = useWeb3Context();
  const dispatch = useDispatch();

    const projectDetails = useSelector((state) => {
        return state.projects[id];
    });
    React.useEffect(() => {
        if (projectDetails === undefined) {
            dispatch(
                fetchProjectDetails({
                    address: id,
                    provider,
                    networkID: DEFAULT_NETWORK,
                })
            );
        }
    }, []);
    React.useEffect(() => {
        if (projectDetails && projectDetails.loading === false) {
            setProjectLoading(false);
            let projectTokenAddress = projectDetails.tokenInfo.projectTokenAddress;
        }
    }, [projectDetails]);

  const projectContract = new ethers.Contract(id, PublicSale, provider);
  const stableCoinContract = new ethers.Contract(
    getAddress("STABLE_COIN_ADDRESS"),
    StableCoin,
    provider
  );
  const pendingTransactions = useSelector((state) => {
    return state.pendingTransactions;
  });

  const setMax = () => {
    setQuantity(Math.max(canInvest - invested, 0));
  };

  const onSeekApproval = async () => {
    if (await checkWrongNetwork()) return;
    await dispatch(
      changeApproval({
        address,
        idoAddress: id,
        provider,
        networkID: chainID,
      })
    );
  };

  const onInvest = async () => {
    if (await checkWrongNetwork()) return;
    if (quantity === "" || parseFloat(quantity) === 0) {
      dispatch(warning({ text: "Quantity id mandatory" }));
    } else {
      await dispatch(
        invest({
          address,
          value: String(quantity),
          provider,
          networkID: chainID,
          idoAddress: id,
        })
      );
      setQuantity("");
    }
  };

  const checkAllowance = () => {
    if (!provider) {
      dispatch(warning({ text: messages.please_connect_wallet }));
      return;
    }
    return stableCoinContract.allowance(address, id).then((data) => {
      return setAllowance(data > 0);
    });
  };

  const updateRasiedAmounts = () => {
    projectContract.getAmountInfo().then((data) => {
      const amountToRaised = data.totalAmountToRaise_ / Math.pow(10, 18);
      const amountRaised = data.totalAmountRaised_ / Math.pow(10, 18);
      setAmountToRaised(amountToRaised);
      setAmountRaised(amountRaised);
      const complition = (amountRaised * 100) / amountToRaised;
      !isNaN(complition) && progress !== complition && setProgress(complition);
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
    projectContract.userToTokenAmount(address).then((data) => {
      setInvested(data / Math.pow(10, 18));
    });
    projectContract.checkMaxTokenForUser(address).then((data) => {
      setCanInvest(data / Math.pow(10, 18));
    });
  };

  React.useEffect(() => {
    if (address) {
      updateUserTokens();
      checkAllowance();
    }
  }, [address]);

  return (
    <>
      {projectLoading && <p>Loading</p>}
      {!projectLoading && (
        <div className="project-details-wrapper">
          <div className="details mt-5 p-5">
            <div className="d-flex justify-content-between flex-wrap">
              <div className="d-flex align-items-center mb-3">
                <span className="icon">
                  <img
                    alt="Project icon"
                    height="55px"
                    width="55px"
                    src={ipfsURL + projectDetails.imageIpfsId.logoImageId}
                  ></img>
                </span>
                <span className="project-name ms-3">
                  {projectDetails.projectInfo.name}
                </span>
              </div>
              <div className="d-flex  align-items-center mb-3">
                {projectDetails.projectInfo.socials &&
                  projectDetails.projectInfo.socials.twitter && (
                    <a
                      className="social-links me-3"
                      href={projectDetails.projectInfo.socials.twitter}
                      target="_blank"
                    >
                      <i className="bi-twitter"></i>
                    </a>
                  )}
                {projectDetails.projectInfo.socials &&
                  projectDetails.projectInfo.socials.website && (
                    <a
                      className="social-links me-3"
                      href={projectDetails.projectInfo.socials.website}
                      target="_blank"
                    >
                      <i className="bi-globe"></i>
                    </a>
                  )}
                {projectDetails.projectInfo.socials &&
                  projectDetails.projectInfo.socials.telegram && (
                    <a
                      className="social-links me-3"
                      href={projectDetails.projectInfo.socials.telegram}
                      target="_blank"
                    >
                      <i className="bi-telegram"></i>
                    </a>
                  )}
                {projectDetails.projectInfo.socials &&
                  projectDetails.projectInfo.socials.discord && (
                    <a
                      className="social-links me-3"
                      href={projectDetails.projectInfo.socials.discord}
                      target="_blank"
                    >
                      <i className="bi-discord"></i>
                    </a>
                  )}
                {projectDetails.projectInfo.socials &&
                  projectDetails.projectInfo.socials.github && (
                    <a
                      className="social-links me-3"
                      href={projectDetails.projectInfo.socials.github}
                      target="_blank"
                    >
                      <i className="bi-github"></i>
                    </a>
                  )}
              </div>
            </div>
            <div>
              <p className="description">
                {projectDetails.projectInfo.description}
              </p>
            </div>
          </div>
          <div className="additional-details d-flex mt-5 flex-wrap">
            <div className="graph mb-5">
              <img
                alt={`Project Banner`}
                src={ipfsURL + projectDetails.imageIpfsId.bannerImageId}
              />
            </div>
            <div className="screening p-4 mb-5 flex-sm-grow-1">
              <div className="d-flex flex-row">
                <CheckCircle color="success" className="me-3" />
                <p className="text-white">Metrics advised by Oracle Finance</p>
              </div>
              <div className="d-flex flex-row ">
                <Cancel color="error" className="me-3" />
                <p className="text-white">Controlled Cap Table</p>
              </div>
            </div>
          </div>
          <div className="progress-container d-flex flex-wrap">
            <div className="graph mb-5 p-4">
              <div className="d-flex justify-content-between progress-details">
                <span>
                  Amount to raise:{" "}
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2,
                  }).format(amountToRaised)}
                </span>
                <span>
                  Amount raised:{" "}
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2,
                  }).format(amountRaised)}
                </span>
              </div>
              <div>
                <LinearProgress variant="determinate" value={progress} />
              </div>
            </div>
            <div className="screening p-4 mb-5 flex-sm-grow-1">
              {address && (
                <>
                  <OutlinedInput
                    type="number"
                    placeholder="Amount"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    id="outlined-basic"
                    variant="outlined"
                    className="outline-input"
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton onClick={setMax} edge="end">
                          Max
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  {address && allowance ? (
                    <Button
                      onClick={() => {
                        if (isPendingTxn(pendingTransactions, "investing"))
                          return;
                        onInvest();
                      }}
                      variant="outlined"
                    >
                      {txnButtonText(
                        pendingTransactions,
                        "investing",
                        "Invest"
                      )}
                    </Button>
                  ) : (
                    <Button
                      onClick={() => {
                        if (
                          isPendingTxn(
                            pendingTransactions,
                            "approve_investment"
                          )
                        )
                          return;
                        onSeekApproval();
                      }}
                      variant="outlined"
                    >
                      {txnButtonText(
                        pendingTransactions,
                        "approve_investment",
                        "Approve"
                      )}
                    </Button>
                  )}
                  <p className="investment-details mt-3">
                    Invested:{" "}
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                      maximumFractionDigits: 2,
                      minimumFractionDigits: 2,
                    }).format(invested)}
                  </p>
                  <p className="investment-details">
                    Total you can Invest:{" "}
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                      maximumFractionDigits: 2,
                      minimumFractionDigits: 2,
                    }).format(canInvest)}
                  </p>
                </>
              )}
              {!address && <ConnectMenu></ConnectMenu>}
            </div>
          </div>
          <div className="table-section d-flex mb-5 p-4 flex-column">
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
                {/*<Tab value="schedule" label="Schedule" />*/}
                {/*<Tab value="alloc" label="Your Allocation" />*/}
              </Tabs>
            </div>
            {activeTab === "p-details" && (
              <div className="d-flex flex-wrap">
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
                        <td>Oracle Finance</td>
                      </tr>
                      <tr>
                        <td>Token Symbol</td>
                        <td>ORFI</td>
                      </tr>
                      <tr>
                        <td>Total Supply </td>
                        <td> Elastic Supply</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="spacer"></div>
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
                      <td>2022-04-07 05:00:00 UTC</td>
                    </tr>
                    <tr>
                      <td>Closes</td>
                      <td>2022-04-08 05:00:00 UTC</td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            {/*{activeTab === "schedule" && (*/}
            {/*  <div></div>*/}
            {/*)}*/}
            {/*{activeTab === "alloc" && <div>Your Allocation</div>}*/}
          </div>
        </div>
      )}
    </>
  );
}
