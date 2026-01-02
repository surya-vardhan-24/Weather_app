  const apikey = "ec7d5eb2df6d619979c8d42478abb583";

 //const apikey = "46f80a02ecae410460d59960ded6e1c6"
const weatherDataEl = document.querySelector("#weather-data");

const cityInputEl  = document.querySelector("#city-input");

const formEl = document.querySelector("form");

formEl.addEventListener("submit",(event)=>{
    event.preventDefault();
    const cityValue = cityInputEl.value
    console.log(cityValue);
    getWeatherData(cityValue);
})

async function getWeatherData(cityValue){
    try{
        const res = await fetch(`https://api.openweathermap.org/data2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`);
        if(!res.ok){
            throw new Error("Network response was not okay")
        }
        const data = await res.json();
        
        const temp = Math.round(data.main.temp);
        const description = data.weather[0].description ;
        const icon = data.weather[0].icon;
        const details = [
            `Feels like ${Math.round(data.main.feels_like)}`,
            `Humidity : ${data.main.humidity}%`,
            `wind speed: ${data.wind.speed} m/s`,
        ]

        weatherDataEl.querySelector(".icon").innerHTML = ` <img src="https://openweathermap.org/img/wn/${icon}.png" alt="Weather-Icon">`

        weatherDataEl.querySelector(".temperature").textContent = `${temp} c`;

        weatherDataEl.querySelector(".description").textContent = `${description}`;

        weatherDataEl.querySelector(".details").innerHTML = details.map(
            (details) => `<div>${details}</div>`
        ).join("");

    }catch(error){
        
        weatherDataEl.querySelector(".icon").innerHTML = "";
        weatherDataEl.querySelector(".temperature").textContent ="";

        weatherDataEl.querySelector(".description").textContent = "An Error HAPPEND "

        weatherDataEl.querySelector(".details").innerHTML ="";
    }
} 