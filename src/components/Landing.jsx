import React, { useEffect, useRef, useState } from "react";
import useDebounce from "../hooks/debounce";
const Landing = ({setIsNotSearched,setCoordinates}) => {
  const [cities, setCities] = useState([]);
  const [value, setValue] = useState("");
  let OWM_API = import.meta.env.VITE_COORDINATES
  const autoSearch = document.getElementsByClassName("autoSearch")[0];
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const debouncedValue = useDebounce(value, 400);
  
  const fetchCity = async () => {
    let rawData = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${debouncedValue}&limit=5&appid=${OWM_API}`
    );
    let data = await rawData.json();
    let primCityArr = [];
    data.map((e) => {
      let city = {
        coordinates: { lat: e.lat, lon: e.lon },
        text: `${e.name}, ${e.state ? e.state : ""}, ${e.country}`,
      };
      primCityArr.push(city);
      setCities(primCityArr);
    });
  };
  const handleListClick = (e) => {
    setCoordinates(e.coordinates)
    setValue(e.text)
    setCities([])
    setIsNotSearched(false)
    autoSearch.style.display = "none"
  }
  useEffect(() => {
    if (debouncedValue) {
        fetchCity();
    }else{
        setCities([])
    }
  }, [debouncedValue]);
  useEffect(() => {
    let arr = document.getElementById("arrow");
    setInterval(() => {
      arr.style.transform = "translateY(-10px)";
    }, 600);
    setInterval(() => {
      arr.style.transform = "translateY(10px)";
    }, 1200);
  }, []);
  return (
    <>
      <div className="outer-block">
        <div className="inner-block">
          <div className="heading">
            <h1>ALTITUDE</h1>
          </div>
          <div className="info">
            <p>
              Start Searching the weather of your area by adding the location
              below
            </p>
          </div>
          <div className="image" id="arrow">
            <img src="./arrow.svg" alt="&darr;" />
          </div>
          <div className="search">
            <input
              type="text"
              value={value}
              onFocus={()=>{
                autoSearch.style.display = "block"
              }}
              onChange={(e) => {
                handleChange(e);
              }}
              name="search"
              className="search"
            />
            <div className="autoSearch">
              <ul>
                {cities != ""
                  ? cities.map((e, index) => {
                      return (
                        <li onClick={()=>{handleListClick(e)}} className="cityList" key={index}>
                          {e.text}
                        </li>
                      );
                    })
                  : null}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
