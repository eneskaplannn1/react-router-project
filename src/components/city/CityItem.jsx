import classes from "./CityItem.module.css";
function CityItem({ city }) {
  console.log(city);
  const { date, emoji, cityName } = city;

  return (
    <li className={classes.cityItem}>
      <span className={classes.emoji}>{emoji}</span>
      <h3 className={classes.name}>{cityName}</h3>
      <time className={classes.date}>{date}</time>
      <button className={classes.deleteBtn}>&times;</button>
    </li>
  );
}

export default CityItem;
