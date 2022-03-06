import { Outlet } from "react-router-dom";

import { Header, Footer } from "../components";

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
