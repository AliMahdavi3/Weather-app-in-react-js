import React, { useState, useEffect } from "react";
import "./App.css";
import PersianDate from "./components/PersianDate";
import { useDispatch, useSelector } from "react-redux";
import getWeatherInfo from "./redux/weather/weatherAction";
import { Spinner } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';


function Weather() {
  const { loading, data, error } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [query, setQuery] = useState("");

  const handleGetWeather = (e) => {
    e.preventDefault();
    dispatch(getWeatherInfo(query));
    setQuery("");
  };

  const [backMode, setBackMode] = useState("usual");

  useEffect(() => {
    if (!data.main) {
      return;
    }
    let temp = data.main.temp;
    if (temp < 12) {
      setBackMode("cold");
    } else if (temp < 23) {
      setBackMode("usual");
    } else {
      setBackMode("warm");
    }
  }, [data]);

  return (
    <div className={`back_${backMode}`}>
      <div className="input-container">
        <form onSubmit={handleGetWeather}>
          <input
            type="text"
            className="input"
            placeholder={data.name || "جستجوی شهر یا کشور"}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </form>
      </div>

      <div className="text-span">
        <PersianDate />
      </div>

      {loading ? (
        <div className="spinner">
          <span className="spinner-bootstrap"><Spinner animation="border" variant="danger" /></span>
        </div>
      ) : data.main ? (
        <>
          <div className="degree">
            <span className="degree-span">
              <span>{Math.round(data.main.temp)}</span>°C
            </span>
          </div>

          <div className="weather">
            <h1>{data.weather[0].main}</h1>
          </div>
        </>
      ) : error ? (
        <h3>نام شهر را به درستی وارد کنید</h3>
      ) : (
        <h3>مکان مورد نظر را جستجو کنید</h3>
      )}
    </div>
  );
}

export default Weather;
