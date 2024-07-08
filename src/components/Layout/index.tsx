import Header from "../Header";
import Footer from "../Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="page-container flex-1 p-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
