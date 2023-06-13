const Weather = ({weather}) => {

  const flagStyle = {
    border: '1px #000 solid'
  }

  return (
    weather.length === 0 ?
      null
    :
      <div>
        <h2>Weather in {weather.name}</h2>
        <div>Temperature: {weather.main.temp.toFixed(0)} &#8451;</div> 
        <div><img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          style={flagStyle} alt={weather.weather[0].description} title={weather.weather[0].description}></img></div> 
        <div>Wind: {weather.wind.speed.toFixed(0)} m/s</div> 
      </div>
  )
}

export default Weather