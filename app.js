const latitude = document.querySelector(".latitude")
const longitude = document.querySelector(".longitude")
const todayDate = document.querySelector(".today")
const city = document.querySelector(".city-name")
const countryName = document.querySelector(".country-name")
const temperatureDescription=document.querySelector(".temperature-description")
const weatherIcon = document.querySelector(".weather-icon")
const temperatureData=document.querySelector(".temperature-data")
const minTemp=document.querySelector(".min-temp")
const maxTemp=document.querySelector(".max-temp")
const temperatureFeelsLike=document.querySelector(".feels-like")
const windDetails=document.querySelector(".wind-details")
const pressureDetails=document.querySelector(".pressure-details")
const humidityDetails=document.querySelector(".humidity-details")
const cityForm=document.querySelector("#city-form")
const cityName=document.querySelector("#city-name")
const container = document.querySelector(".container")

const date = new Date()


const year=["January","February","March","April","May","June","July","August","September","October","November","December"]
todayDate.innerText=`${year[date.getMonth()]}  ${date.getDate()}`


const background=["drizzle","fogg","heavyrain","leaf","lightening","mist","rain","river","snowfall","sunny","thunderstorm","winter"]

function changeBackground(){
    container.style.backgroundImage=`linear-gradient(to bottom ,rgba(0,0,0,.4),rgba(0,0,0,.4)) ,url(./background/${background[Math.floor(Math.random()* background.length)]}.jpg)`
}


const getWeather=async(cityInput)=>{

    try{
        const cityApi = `http://api.openweathermap.org/data/2.5/weather?q=${cityInput.toLowerCase()}&appid=bb1b7cd7c487631650125659ab721e79`
        const response = await fetch(cityApi)
        const data = await response.json()
        const {temp,feels_like,humidity,pressure,temp_max,temp_min} = data.main
        const {description,icon} = data.weather[0]
        const {lat,lon} = data.coord
        const {country} =data.sys
        const {speed}=data.wind
        latitude.innerText=lat
        longitude.innerText=lon
        city.innerText=data.name
        countryName.innerText=country
        temperatureDescription.innerText=description
        weatherIcon.src=`./icons/${icon}.png`
        temperatureData.innerText=Math.floor(temp-273.15)
        minTemp.innerText=`↓ ${Math.floor(temp_min-273.15)}  °C`
        maxTemp.innerText=`↑ ${Math.floor(temp_max-273.15)}  °C`
        temperatureFeelsLike.innerText=`Feels like ${Math.floor(feels_like-273.15)} °C`
        windDetails.innerText= `${speed} m/s`
        pressureDetails.innerText=`${pressure/1000} Ba`
        humidityDetails.innerText=`${humidity} %`
    
            
      

    }
    catch(error){
     
        alert("city not found :(")

    }

}




window.addEventListener('load',()=>{
    let long
    let lat
    cityName.value=null
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(position =>{
          long = position.coords.longitude
          lat=position.coords.latitude

          const api =`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=bb1b7cd7c487631650125659ab721e79`

          fetch(api)
          .then(response =>{
              return response.json()
          })
          .then(data=>{
              const {temp,feels_like,humidity,pressure,temp_max,temp_min} = data.main
              const {description,icon} = data.weather[0]
              const {lat,lon} = data.coord
              const {country} =data.sys
              const {speed}=data.wind
              latitude.innerText=lat
              longitude.innerText=lon
              city.innerText=data.name
              countryName.innerText=country
              temperatureDescription.innerText=description
              weatherIcon.src=`./icons/${icon}.png`
              temperatureData.innerText=Math.floor(temp-273.15)
              minTemp.innerText=`↓ ${Math.floor(temp_min-273.15)}  °C`
              maxTemp.innerText=`↑ ${Math.floor(temp_max-273.15)}  °C`
              temperatureFeelsLike.innerText=`Feels like ${Math.floor(feels_like-273.15)} °C`
              windDetails.innerText= `${speed} m/s`
              pressureDetails.innerText=`${pressure/1000} Ba`
              humidityDetails.innerText=`${humidity} %`
              

          })
      })
    }
    else{
        alert("please allow location access")
    }
})


cityForm.addEventListener('submit',e=>{
    e.preventDefault()

    getWeather(cityName.value)
    cityName.value=""
   
   
})




setInterval(changeBackground,7500)