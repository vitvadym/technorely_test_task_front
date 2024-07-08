import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.scss";
import clsx from "clsx";

const SideBar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebar__links}>
        <NavLink
          className={({ isActive }) =>
            clsx(styles.sidebar__links_link, {
              "bg-slate-400": isActive,
            })
          }
          to={"users"}
        >
          Users
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            clsx(styles.sidebar__links_link, {
              "bg-slate-400": isActive,
            })
          }
          to={"companies"}
        >
          Companies
        </NavLink>
      </div>
    </div>
  );
};

export default SideBar;
