import Map from "../components/Map";
import SideBar from "../components/SideBar";
import User from "../components/User";
import classes from "./AppLayout.module.css";
function AppLayout() {
  return (
    <div className={classes.app}>
      <SideBar />
      <User />
      <Map />
    </div>
  );
}

export default AppLayout;
