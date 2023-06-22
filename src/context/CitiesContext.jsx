import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

const CitiesContext = createContext();

function ContextProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [newCity, setNewCity] = useState(0);
  useEffect(() => {
    setIsLoading(true);
    async function Fetch() {
      try {
        const res = await fetch("http://localhost:9000/cities");
        const data = await res.json();
        setCities(data);
      } catch (err) {
        throw new Error("something went wrong");
      } finally {
        setIsLoading(false);
      }
    }
    Fetch();
  }, [newCity]);

  const [curCity, setCurCity] = useState({});

  async function getCity(id) {
    const res = await fetch(`http://localhost:9000/cities/${id}`);
    const data = await res.json();
    setCurCity(data);
  }
  async function deleteCity(id) {
    const res = await fetch(`http://localhost:9000/cities/${id}`, {
      method: "DELETE",
    });
    console.log(res);
    setNewCity((prev) => prev - 1);
  }

  async function createCity(newCity) {
    await fetch(`http://localhost:9000/cities`, {
      method: "POST",
      body: JSON.stringify(newCity),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setNewCity((prev) => prev + 1);
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
