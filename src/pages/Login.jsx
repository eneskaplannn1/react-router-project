import classes from "./Login.module.css";
import PageNav from "../components/PageNav";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("johndoe@gmail.com");
  const [password, setPassword] = useState("johndoe");

  console.log(isAuthenticated);
  useEffect(() => {
    if (isAuthenticated) navigate("/app");
  }, [isAuthenticated, navigate]);

  return (
    <main className={classes.login}>
      <PageNav />
      <form className={classes.form}>
        <div className={classes.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={classes.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <button
            className={classes.btn}
            onClick={(e) => {
              e.preventDefault();
              login(email, password);
            }}
          >
            Login
          </button>
        </div>
      </form>
    </main>
  );
}
