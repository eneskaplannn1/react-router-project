import classes from "./Button.module.css";

function Button({ children, type, onClick }) {
  console.log(type);
  return (
    <button onClick={onClick} className={`${classes.btn} ${classes[type]}`}>
      {children}
    </button>
  );
}

export default Button;
