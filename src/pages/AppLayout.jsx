import SideBar from "../components/SideBar";
import classes from "./AppLayout.module.css";
function AppLayout() {
  return (
    <div className={classes.app}>
      <SideBar />
      
    </div>
  );
}

export default AppLayout;
