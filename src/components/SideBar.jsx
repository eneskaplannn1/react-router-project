import AppNav from "./AppNav";
import Logo from "./Logo";
import classes from "./SideBar.module.css";
function SideBar() {
  return (
    <div className={classes.sidebar}>
      <Logo />
      <AppNav />
      <p>List of cities</p>
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
