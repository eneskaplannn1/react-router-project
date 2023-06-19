import { Outlet } from "react-router-dom";
import AppNav from "./AppNav";
import Logo from "../utilits/Logo";
import classes from "./SideBar.module.css";
function SideBar() {
  return (
    <div className={classes.sidebar}>
      <Logo />
      <AppNav />
      <Outlet />

      <footer className={classes.footer}>
        <p className={classes.copyright}>
          {" "}
          &copy; copyright {new Date().getFullYear()} by Anonim
        </p>
      </footer>
    </div>
  );
}

export default SideBar;
