import { Outlet } from "react-router-dom";

import Footer from "../components/footer";
import Header from "../components/header/header";
import "../components/styles.css"

function Layout() {
  return (
    <div class = "main">
      <Header></Header>
      <div className="flex-grow-1">
        <Outlet />
      </div>
      <Footer></Footer>
    </div>
  );
}
export default Layout;
