import { useNavigate, useSearchParams } from "react-router-dom";
import classes from "./Map.module.css";

function Map() {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return (
    <div className={classes.mapContainer}>
      Map
      {lat}
      {lng}
    </div>
  );
}

export default Map;
