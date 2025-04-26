import { useEffect, useState } from 'react'
import './App.css'
import Landing from './components/Landing'
import WeatherUI from './components/WeatherUI'

function App() {
  const [coordinates, setCoordinates] = useState({})
  const [isNotSearched, setIsNotSearched] = useState(true)
  const [weatherData,  setweatherData] = useState();
  return (
    <>
      {isNotSearched && <Landing setIsNotSearched={setIsNotSearched} setCoordinates={setCoordinates}/>}
      {isNotSearched || <WeatherUI coordinates={coordinates} setweatherData={setweatherData} weatherData={weatherData} setIsNotSearched={setIsNotSearched}/>}
    </>
  )
}

export default App
