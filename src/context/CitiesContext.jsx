import { createContext, useContext, useEffect, useState } from "react";

const CitiesContext = createContext();

function ContextProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
  }, []);

  
  const [curCity, setCurCity] = useState({});
  async function getCity(id) {
    const res = await fetch(`http://localhost:9000/cities/${id}`);
    const data = await res.json();
    setCurCity(data);
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        curCity,
        getCity,
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
