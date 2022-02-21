import { Outlet } from "react-router-dom";

import Footer from "../components/footer";
import Header from "../components/header";

function Layout() {
  return (
    <>
      <Header></Header>
      <Outlet />
      <Footer></Footer>
    </>
  );
}
export default Layout;
