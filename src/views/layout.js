import { Outlet } from "react-router-dom";

import Footer from "../components/footer";
import Header from "../components/header";

function Layout() {
  return (
    <>
      <Header></Header>
      <div className="flex-grow-1">
        <Outlet />
      </div>
      <Footer></Footer>
    </>
  );
}
export default Layout;
