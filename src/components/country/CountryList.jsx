import Message from "../Message";
import Spinner from "../spinner/Spinner";
import CountryItem from "./CountryItem";
import classes from "./CountryList.module.css";

export default function CountryList({ cities, isLoading }) {
  if (isLoading) return <Spinner />;

  if (cities.length === 0)
    return (
      <Message message="No cities had found click the map for adding new city" />
    );

  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country)) {
      return [...arr, { country: city.country, emoji: city.emoji }];
    } else {
      return [...arr];
    }
  }, []);

  return (
    <ul className={classes.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.id} />
      ))}
    </ul>
  );
}
