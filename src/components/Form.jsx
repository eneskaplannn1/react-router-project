// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import Button from "../utilits/Button";
import { useNavigate, useSearchParams } from "react-router-dom";
import ButtonBack from "../utilits/ButtonBack";
import Spinner from "./spinner/Spinner";
import Message from "./Message";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCities } from "../context/CitiesContext";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [cityName, setCityName] = useState("");
  const [countryName, setCountryName] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState("");

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [isErrorGeocoding, setIsErrorGeocoding] = useState(null);

  const { createCity } = useCities();

  useEffect(() => {
    if (!lng && !lat) return;
    async function fetchCityData() {
      setIsLoadingGeocoding(true);
      setIsErrorGeocoding(null);
      const res = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
      );
      const data = await res.json();
      if (!data.countryCode) setIsErrorGeocoding("Click somewhere else 😊");
      setCityName(data.city);
      setCountryName(data.countryName);
      setEmoji(data.countryCode);
      try {
      } catch (err) {
        setIsErrorGeocoding(err.message);
      } finally {
        setIsLoadingGeocoding(false);
      }
    }
    fetchCityData();
  }, [lat, lng]);

  function handleSubmit(e) {
    e.preventDefault();

    if (!cityName || !startDate) return;
    const city = {
      cityName,
      countryName,
      emoji,
      startDate,
      notes,
      position: { lat, lng },
    };
    createCity(city);
    navigate("/app/cities");
  }

  if (isLoadingGeocoding) return <Spinner />;
  if (isErrorGeocoding) return <Message message={isErrorGeocoding} />;
  if (!lat && !lng)
    return <Message message="Start by clicking somewhere in map😊" />;

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <ReactDatePicker
          id="date"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <ButtonBack />
      </div>
    </form>
  );
}

export default Form;
