import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const initialState = { user: null, isAuthenticated: false };

const DUMMY_USER = {
  name: "John",
  email: "johndoe@gmail.com",
  password: "johndoe",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function reducer(state, action) {
  if (action.type === "LOGIN")
    return { ...state, user: action.payload, isAuthenticated: true };
  if (action.type === "LOG_OUT")
    return { ...state, user: null, isAuthenticated: false };
  return state;
}

function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function login(email, password) {
    if (email === DUMMY_USER.email && password === DUMMY_USER.password) {
      dispatch({ type: "LOGIN", user: DUMMY_USER });
    }
  }
  function logout() {
    dispatch({ type: "LOG_OUT" });
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error(
      "you did not used useCities custom hook inside context provider"
    );
  return context;
}

export { AuthProvider, useAuth };
