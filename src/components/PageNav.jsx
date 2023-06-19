import { NavLink } from "react-router-dom";
import classes from "./PageNav.module.css";
import Logo from "../utilits/Logo";

function PageNav() {
  return (
    <nav className={classes.nav}>
      <ul>
        <Logo />
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/product">Products</NavLink>
        </li>
        <li>
          <NavLink to="/login" className={classes.ctaLink}>
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;
