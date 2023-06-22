import { createContext, useContext, useEffect, useReducer } from "react";

const CitiesContext = createContext();
const initialState = { cities: [], isLoading: false, curCity: {}, newCity: 0 };

function reducer(state, action) {
  if (action.type === "getCityWithId")
    return { ...state, curCity: action.payload };

  if (action.type === "cities/loaded")
    return { ...state, cities: action.payload };

  if (action.type === "loading") return { ...state, isLoading: true };

  if (action.type === "NotLoading") return { ...state, isLoading: false };

  if (action.type === "cities/deleted" || action.type === "cities/created")
    return { ...state, newCity: state.newCity + 1 };
}

function ContextProvider({ children }) {
  const [{ cities, isLoading, curCity, newCity }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    dispatch({ type: "loading" });
    async function Fetch() {
      try {
        const res = await fetch("http://localhost:9000/cities");
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch (err) {
        throw new Error("something went wrong");
      } finally {
        dispatch({ type: "NotLoading" });
      }
    }
    Fetch();
  }, [newCity, dispatch]);

  async function getCity(id) {
    if (Number(id) === curCity.id) return;
    dispatch({ type: "loading" });
    const res = await fetch(`http://localhost:9000/cities/${id}`);
    const data = await res.json();
    dispatch({ type: "getCityWithId", payload: data });
  }
  async function deleteCity(id) {
    await fetch(`http://localhost:9000/cities/${id}`, {
      method: "DELETE",
    });
    dispatch({ type: "cities/deleted" });
  }

  async function createCity(newCity) {
    await fetch(`http://localhost:9000/cities`, {
      method: "POST",
      body: JSON.stringify(newCity),
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch({ type: "cities/created" });
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        curCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (!context)
    throw new Error(
      "you did not used useCities custom hook inside context provider"
    );
  return context;
}

export { ContextProvider, useCities };
