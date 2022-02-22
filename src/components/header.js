import * as React from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { ReactComponent as Logo } from "../assets/svg/logo.svg";
import ConnectMenu from "./connect-button";

const links = [
  {
    id: 1,
    text: "Fundraising",
    path: "/",
  },
  {
    id: 2,
    text: "Stake",
    path: "/stake",
  },
  {
    id: 3,
    text: "Hub",
    path: "/hub",
  },
];

function CustomLink({ children, to, ...props }) {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });

  return (
    <div>
      <Link className={`nav-link ${match && "active"}`} to={to} {...props}>
        {children}
      </Link>
    </div>
  );
}

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark copyright">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <Logo />
        </a>
        <span></span>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex justify-content-center">
            {links.map((link) => (
              <li className="nav-item " key={link.id}>
                <CustomLink to={link.path}>{link.text}</CustomLink>
              </li>
            ))}
            <li>
              <ConnectMenu></ConnectMenu>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Header;
