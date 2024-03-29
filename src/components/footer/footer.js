import "./footer.css";
import whitepaper from "../../assets/img/whitepaper.png";

export function Footer() {
  const downloadWhitepaper = () => {
    window.open(
      "https://docs.oracledao.finance/whitepaper-and-roadmap/whitepaper",
      "_blank"
    );
  };
  return (
    <div>
      <footer id="contactus" className="d-flex justify-content-between my-5 ">
        <div className="d-flex flex-column me-3">
          <span className="logo mb-3"></span>
        </div>
        <ul className="list-group">
          <li className="list-group-item">
            <a
              className="nav-link"
              target="_blank"
              href="https://twitter.com/Oracle_Finance"
            >
              Twitter
            </a>
          </li>
          <li className="list-group-item">
            <a
              className="nav-link"
              target="_blank"
              href="https://discord.gg/ARMF5kDctx"
            >
              Discord
            </a>
          </li>
          <li className="list-group-item">
            <a
              className="nav-link"
              target="_blank"
              href="https://www.instagram.com/oracle_finance/"
            >
              Instagram
            </a>
          </li>
          <li className="list-group-item">
            <a
              className="nav-link"
              target="_blank"
              href="https://oraclefinance.medium.com/an-introduction-to-oracle-finance-d539c2030c8a"
            >
              Medium
            </a>
          </li>
          <li className="list-group-item">
            <a
              className="nav-link"
              target="_blank"
              href="https://docs.oracledao.finance/"
            >
              GitBook
            </a>
          </li>
        </ul>
        <ul className="list-group">
          <li className="list-group-item">
            <a
              className="nav-link"
              href="https://docs.oracledao.finance/whitepaper-and-roadmap/whitepaper"
              target="_blank"
            >
              Whitepaper
            </a>
          </li>
          <li className="list-group-item">
            <a
              className="nav-link"
              href="https://docs.oracledao.finance/"
              target="_blank"
            >
              Docs
            </a>
          </li>
          <li className="list-group-item">
            <a
              className="nav-link"
              href="https://tinyurl.com/OFAmbassador"
              target="_blank"
            >
              Become an Ambassador
            </a>
          </li>
        </ul>
        <ul class="list-group">
          <li class="list-group-item">
            <button
              type="button"
              class="nav-link whitepaper-download"
              onClick={() => downloadWhitepaper()}
            >
              <img class="img-fluid" src={whitepaper} />
              Whitepaper
            </button>
          </li>
        </ul>
      </footer>
      <p className="copyright">&copy; Oracle Finance, All Rights Reserved</p>
    </div>
  );
}
