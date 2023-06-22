import { useCities } from "../../context/CitiesContext";
import Message from "../Message";
import Spinner from "../spinner/Spinner";
import CountryItem from "./CountryItem";
import classes from "./CountryList.module.css";

export default function CountryList() {
  const { cities, isLoading } = useCities();

  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.countryName)) {
      return [...arr, { country: city.country, emoji: city.emoji }];
    } else {
      return [...arr];
    }
  }, []);
  console.log(isLoading);
  if (isLoading) return <Spinner />;

  if (cities.length === 0)
    return (
      <Message message="No cities had found click the map for adding new city" />
    );

  return (
    <ul className={classes.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.id} />
      ))}
    </ul>
  );
}
