import './home.scss'
import { Box, Link } from "@mui/material";
import rocket from "../../assets/img/rocket.webp";
import advisory from '../../assets/img/advisory.png';
import audit from '../../assets/img/audit.png';
import fundraising from '../../assets/img/fundraising.png';

export function Home() {
    return (
        <div className="container pt-5">
            <div className="headline-root">
                <Box className="headline-left-box">
                    <section className="main-info">
                        <div>
                            <p>What is Oracle LaunchPad?</p>
                            <p>
                                Next Generation of effective fundraising.
                            </p>
                            <div>
                                <p>
                                    Breaking barriers for small investors to the IDO platform with a no-tier system.
                                    We aim to provide a high-quality investment opportunities for our investors.
                                </p>
                            </div>
                        </div>
                    </section>
                    <div className="project-button-div mt-3 mb-3">
                        <Link className="project-button" href="/projects" underline="none">
                            Projects
                        </Link>
                    </div>
                </Box>
                <Box className="headline-right-box">
                    <img
                        src={rocket}
                        alt="oracle-finance"
                        className="headline-img"
                    />
                </Box>
            </div>


            <section className="project-selection-text-container d-flex justify-content-center">
                <p>WHY ORACLE LAUNCHPAD?</p>
            </section>

            <section id="projects" className="mt-5 container-with-image d-flex p-3 align-items-center">
                <div className="section-text p-4">
                    <p>Dedicated selectivity</p>
                    <p>Project Selection Criteria</p>
                    <p>Project launching IDO on Oracle LaunchPad needs to meet specific criteria in terms of
                        idea, potential, project development and overall security.
                    </p>
                </div>
                <div className="section-image criteria d-none d-sm-block"></div>
            </section>

            <section className="mt-5 container-with-image d-flex p-3 align-items-center">
                <div className="section-image report d-none d-sm-block"></div>
                <div className="section-text p-4">
                    <p>Complete enthusiasm</p>
                    <p>Detailed Report Generation</p>
                    <p>Our teams of experts will evaluate each and every project and prepare a detailed report to
                        help investors make an informed decision.
                    </p>
                </div>
            </section>

            <section className="mt-5 container-with-image d-flex p-3 align-items-center">
                <div className="section-text p-4">
                    <p>New structure</p>
                    <p>Tierless System</p>
                    <p>Unlike other launchpads, Oracle LaunchPad does not have a tier system.
                        Investors who have staked ORFI tokens can take part in IDOs</p>
                </div>
                <div className="section-image tierless-system d-none d-sm-block"></div>
            </section>

            <section className="mt-5 our-help-container">
                <p>Our Help</p>
                <p>Supporting Features</p>
                <div className="p-4 right d-flex align-items-center">
                    <img src={fundraising} className="d-none d-sm-block" />
                    <div>
                        <p>Fundraising</p>
                        <p>As a fundraising platform, we can assist projects in raising fund effectively through our distribution mechanism, ensuring benefits for
                            both projects and investors.</p>
                    </div>
                </div>
                <div className="p-4 left d-flex align-items-center">
                    <img src={advisory} className="d-none d-sm-block" />
                    <div>
                        <p>Advisory</p>
                        <p>We assist projects in developing a cohesive growth and marketing strategy, as well as advising projects on the best course of action for
                            fund-raising and launch.</p>
                    </div>
                </div>
                <div className="p-4 right d-flex align-items-center">
                    <img src={audit} className="d-none d-sm-block" />
                    <div>
                        <p>Audit</p>
                        <p>Apart from promoting your projects, we can help you connect to our Audit partners to review, advice and secure your
                            project's Smart Contract.</p>
                    </div>
                </div>
            </section>

        </div>
    )
}