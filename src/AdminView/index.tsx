import { Outlet } from "react-router-dom";
import SideBar from "./Components/Sidebar";

const AdminView = () => {
  return (
    <div className="flex gap-3">
      <SideBar />
      <Outlet />
    </div>
  );
};

export default AdminView;
