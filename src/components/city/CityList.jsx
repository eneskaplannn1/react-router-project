import { useCities } from "../../context/CitiesContext";
import Message from "../Message";
import Spinner from "../spinner/Spinner";
import CityItem from "./CityItem";
import classes from "./CityList.module.css";

export default function CityList() {
  const { cities, isLoading } = useCities([]);
  if (isLoading) return <Spinner />;
  if (cities.length === 0)
    return (
      <Message message="No cities had found click the map for adding new city" />
    );

  return (
    <ul className={classes.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}
