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
  
  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

const data = [
  {
    cityName: "Lisbon",
    country: "Portugal",
    emoji: "🇵🇹",
    date: "2027-10-31T15:59:59.138Z",
    notes: "My favorite city so far!",
    position: {
      lat: 38.727881642324164,
      lng: -9.140900099907554,
    },
    id: 73930385,
  },
  {
    cityName: "Madrid",
    country: "Spain",
    emoji: "🇪🇸",
    date: "2027-07-15T08:22:53.976Z",
    notes: "",
    position: {
      lat: 40.46635901755316,
      lng: -3.7133789062500004,
    },
    id: 17806751,
  },
  {
    cityName: "Barselona",
    country: "Spain",
    emoji: "🇪🇸",
    date: "2027-07-15T08:22:53.976Z",
    notes: "",
    position: {
      lat: 40.46635901755316,
      lng: -3.7133789062500004,
    },
    id: 17806751,
  },
  {
    cityName: "Berlin",
    country: "Germany",
    emoji: "🇩🇪",
    date: "2027-02-12T09:24:11.863Z",
    notes: "Amazing 😃",
    position: {
      lat: 52.53586782505711,
      lng: 13.376933665713324,
    },
    id: 98443197,
  },
  {
    cityName: "Munih",
    country: "Germany",
    emoji: "🇩🇪",
    date: "2027-02-12T09:24:11.863Z",
    notes: "Amazing 😃",
    position: {
      lat: 52.53586782505711,
      lng: 13.376933665713324,
    },
    id: 98443,
  },
];

function useCities() {
  const context = useContext(CitiesContext);
  if (!context)
    throw new Error(
      "you did not used useCities custom hook inside context provider"
    );
  return context;
}

export { ContextProvider, useCities };
