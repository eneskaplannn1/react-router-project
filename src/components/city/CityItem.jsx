import { Link } from "react-router-dom";
import classes from "./CityItem.module.css";
function CityItem({ city }) {
  console.log(city);
  const { date, emoji, cityName, id, position } = city;

  return (
    <li>
      <Link
        className={classes.cityItem}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={classes.emoji}>{emoji}</span>
        <h3 className={classes.name}>{cityName}</h3>
        <time className={classes.date}>{date}</time>
        <button className={classes.deleteBtn}>&times;</button>
      </Link>
    </li>
  );
}

export default CityItem;
