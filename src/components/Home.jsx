import React, { useEffect, useState } from "react";
import { Spin, message } from 'antd';
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

function Home() {
  const loginStatus = localStorage.getItem('loginStatus')
  const API_KEY = "SXf5j27iyJ8l2RD2NKeG9g==MtAQ5hxWGhgubrNt";
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [cityName, setCityName] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [wheatherData, setWheatherData] = useState(null);
  const [showSpin, setShowSpin] = useState(false);
  const wheatherCodes = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Depositing rime fog",
    51: "Drizzle: Light",
    53: "Drizzle: Moderate",
    55: "Drizzle: Dense intensity",
    61: "Rain: Slight",
    63: "Rain: Moderate ",
    65: "Rain: Heavy intensity",
    66: "Freezing Rain: Light",
    67: "Freezing Rain: Heavy intensity",
    71: "Snow fall: Slight",
    73: "Snow fall: Moderate",
    75: "Snow fall: Heavy intensity",
    77: "Snow grains",
    80: "Rain showers: Slight",
    81: "Rain showers: Moderate",
    82: "Rain showers: Violent",
    85: "Snow showers Slight",
    86: "Snow showers Heavy",
    95: "Thunderstorm: Slight or Moderate",
    96: "Thunderstorm with slight ",
    99: "Thunderstorm with Heavy hail ",
  }
  const error = (message) => {
    messageApi.open({
      type: 'error',
      content: message,
    });
  };
  useEffect(() => {
    if (loginStatus === "logout") {
      navigate("/login");
    }
  }, [loginStatus, navigate]);
  function onSearchButtonClicked() {
    setShowSpin(true);
    fetch(`https://api.api-ninjas.com/v1/geocoding?city=${cityName}`, {
      headers: {
        'X-Api-Key': `${API_KEY}`
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data.length === 0) {
          error("City not found");
          setShowSpin(false);
        }
        else {
          fetch(`https://api.open-meteo.com/v1/forecast?latitude=${data[0].latitude}&longitude=${data[0].longitude}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m`)
            .then(response => response.json())
            .then(data => {
              setShowSpin(false);
              setWheatherData(data);
              setShowResult(true);
            }).catch(() => {
              error("Something went wrong, please try again.");
              setShowSpin(false)
            });
        }
      });
  }
  return (
    <div className="home-container">
      {showSpin && <Spin size="Large" style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        background: "black",
        opacity: "0.6"
      }} />}
      {contextHolder}
      <div className="home-content">
        <div className="search-bar-container">
          <div className="search-bar-input-container">
            <input className="search-bar-input" placeholder="Enter city name" value={cityName} onChange={(e) => { setCityName(e.target.value); setShowResult(false); }}></input>
            <label className="search-input-label" onClick={onSearchButtonClicked}>Search</label>
          </div>
        </div>
        <div className="wheather-info-display-container-wrapper">
          <div className="wheather-info-display-container">
            <h1>City name</h1>
            <label>{wheatherData && showResult && cityName}</label>
          </div>
          <div className="wheather-info-display-container">
            <h1>Temperature</h1>
            {wheatherData && showResult && <label>{wheatherData.current_weather.temperature} degree</label>}
          </div>
          <div className="wheather-info-display-container">
            <h1>Condition</h1>
            {wheatherData && showResult && <label>{wheatherCodes[wheatherData.current_weather.weathercode]}</label>}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
