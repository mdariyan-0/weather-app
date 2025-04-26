import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const WeatherUI = ({ coordinates, weatherData, setweatherData, setIsNotSearched }) => {
  const [hourlyTemp, setHourlyTemp] = useState()
  const [imageUrl, setImageUrl] = useState()
  const createGraphData = (obj) =>{
    let data = {
      
    }
  }
  const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
  const aqiIndex = (data)=>{
    let value;
    let value2;
    switch (data) {
      case 1:
        value = "green"
        value2 = "Good"
        break;
      case 2:
        value = "yellow"
         value2 = "Moderate"
        break;
      case 3:
        value = "orange"
         value2 = "Unhealthy for sensitive groups"
        break;
      case 4:
        value = "red"
         value2 = "Unhealthy"
        break;
      case 5:
        value = "purple"
         value2 = "Very Unhealthy"
        break;
      case 6:
        value = "maroon"
         value2 = "Hazardous"
        break;
    }
    return {value1: value, text: value2}
  }
  
  let UNSPLASH_API = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
  const generateWeatherBg = async () => {
    let image = await fetch(
      `https://api.unsplash.com/search/photos?query=${weatherData.current?.condition.text}&client_id=${UNSPLASH_API}`
    );
    let coverUrl = await image.json()
    console.log(coverUrl);
    
    document.getElementsByClassName("weather-overview")[0].style.background = `url(${coverUrl.results[0].urls?.full})`
  };
  const fetchWeather = async () => {
    let rawData = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=e1f4156f008e41b5947143413240410&q=${coordinates.lat.toFixed(
        4
      )},${coordinates.lon.toFixed(4)}&days=1&aqi=yes`
    );
    let data = await rawData.json();
    setweatherData(data);
  };
  
  useEffect(()=>{
    if(coordinates.lat){
      fetchWeather()
    }
  },[coordinates])
  useEffect(() => {
    document.body.style.background = "#2A7B9B";
    document.body.style.background =
      "linear-gradient(rgba(87, 199, 133, 1) 0%, rgba(42, 123, 155, 1) 30%, rgba(87, 199, 133, 1) 100%)";
  }, []);



  useEffect(()=>{
    if(weatherData?.forecast){
      
      let hourlyData = weatherData.forecast.forecastday[0].hour.map((e)=>{
        return {time: new Date(e.time).toLocaleTimeString().slice(0,5), Temperature: e.temp_c}
      })
      setHourlyTemp(hourlyData)
      generateWeatherBg()
    }
    
  }, [weatherData])



  return (
    <>
 <div className="ui-page">
  
 {weatherData?.location ? <><div className="weather-overview">
          <div className="header container">
          <h1>ALTITUDE</h1>
          <ul>
            <li onClick={()=>{
              setIsNotSearched(true)
              document.body.style.backgroundImage = "url(./bg.jpg)"
              document.body.style.backgroundSize = "cover"
              setweatherData()
            }}>Home</li>
          </ul>
          </div>
            <div className="overview container">
            <div className="location"><h2>{weatherData.location?.name + " , " + weatherData.location?.region}</h2></div>
            <div className="feels-like" style={{textAlign: "center"}}><h4>Feels like {`${weatherData.current?.feelslike_c} C`}</h4>
            <h4>{weatherData.current?.condition.text}</h4></div>
          </div>
        </div>
        <div className="weather-data">
          <div>
            <img src="./temperature.png" alt="" className="dataImg" />
            <h4 className="dataHead">Temperature</h4>
            <hr />
            <p className="data">{weatherData.current?.temp_c} C</p>
          </div>
          <div>
            <img src="./humidity.png" alt="" className="dataImg" />
            <h4 className="dataHead">Humidity</h4>
            <hr />
            <p className="data">{weatherData.current?.humidity} %</p>
          </div>
          <div>
            <img src="./precipitation.png" alt="" className="dataImg" />
            <h4 className="dataHead">Precipitation</h4>
            <hr />
            <p className="data">{weatherData.current?.precip_mm} mm</p>
          </div>
          <div>
            <img src="./wind.png" alt="" className="dataImg" />
            <h4 className="dataHead">Wind</h4>
            <hr />
            <p className="data">{`${weatherData.current?.wind_kph} kmph  ${weatherData.current?.wind_dir}`}</p>
          </div>
          <div>
            <img src="./uv-index.png" alt="" className="dataImg" />
            <h4 className="dataHead">UV Index</h4>
            <hr />
            <p className="data">{weatherData.current?.uv}</p>
          </div>
          <div>
            <img src="./visibility.png" alt="" className="dataImg" />
            <h4 className="dataHead">Visibility</h4>
            <hr />
            <p className="data">{weatherData.current?.vis_km} KM</p>
          </div>
          <div>
            <img src="./pressure.png" alt="" className="dataImg" />
            <h4 className="dataHead">Pressure</h4>
            <hr />
            <p className="data">{weatherData.current?.pressure_mb} mb</p>
          </div>
          <div>
            <img src="./air-quality.png" alt="" className="dataImg" />
            <h4 className="dataHead">Air Quality Index <div title={aqiIndex(weatherData.current?.air_quality["us-epa-index"]).text} style={{backgroundColor: aqiIndex(weatherData.current?.air_quality["us-epa-index"]).value1, boxShadow: `0px 0px 8px ${aqiIndex(weatherData.current?.air_quality["us-epa-index"]).value1}`}}></div></h4>
            <hr />
            <p className="data">{weatherData.current?.air_quality["us-epa-index"]}</p>
          </div>
        <hr className="divider"/>
        </div>
        <div className="weather-data">
        <div>
            <img src="./sunrise.png" alt="" className="dataImg" />
            <h4 className="dataHead">Sunrise</h4>
            <p className="data">{weatherData.forecast.forecastday[0]?.astro.sunrise}</p>
          </div>
        <div>
            <img src="./sunset.png" alt="" className="dataImg" />
            <h4 className="dataHead">Sunset</h4>
            <p className="data">{weatherData.forecast.forecastday[0]?.astro.sunset}</p>
          </div>
        <div>
            <img src="./night.png" alt="" className="dataImg" />
            <h4 className="dataHead">Moon Phase</h4>
            <p className="data">{weatherData.forecast.forecastday[0]?.astro.moon_phase}</p>
          </div>
        </div>
        <div className="graph">
      <h2 style={{textDecoration: "underline"}}>Temperature Graph</h2>
      <div className="graphData">
        <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={hourlyTemp?.length? hourlyTemp : null}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          padding={{
            left: 10,
          }}
        >
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Temperature" stroke="#000000" activeDot={{ r: 8 }} />
        </LineChart>
         </ResponsiveContainer>
         </div>
        </div>
        <div className="footer">
          <h3><h2 className="foot-logo">ALTITUDE</h2> by Md Ariyan</h3>
          <h3 className="foot-images"><a target="_blank" href="https://www.linkedin.com/in/md-ariyan-585a31309/"><img src="./linkedin.svg" alt="" /></a><a target="_blank" href="https://github.com/mdariyan-0/"><img src="./github.svg" alt="" /></a><a target="_blank" href="https://www.instagram.com/generational.trauma/"><img src="./instagram.svg" alt="" /></a></h3>
          </div></> : <h2 style={{position : "absolute", top: "50%", left: "50%", transform: "translateX(-50%) translateY(-50%)"}}>Loading Data...</h2> }
      </div> 
   </> 
  );
};

export default WeatherUI;
