import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import styles from "./User.module.css";

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function User() {
  const user = FAKE_USER;
  const navigate = useNavigate();
  const { logout, isAuthenticated } = useAuth();

  function handleClick() {
    logout();
    navigate("/");
  }

  if (!isAuthenticated) return;

  return (
    <div className={styles.user}>
      <img src={user.avatar} alt={user.name} />
      <span>Welcome, {user.name}</span>
      <button onClick={handleClick}>Logout</button>
    </div>
  );
}

export default User;


