const api = {
    key: "d74e151d600b7e06e43333d442a0b729",
    base: "http://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
    if (evt.keyCode == 13) {
        getResults(searchbox.value);
    }
}

function getResults(query) {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
        return weather.json();
    }).then(displayResults)
}

function displayResults(weather) {
    console.log(weather)
    let city = document.querySelector('.location .city');
    city.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${weather.name}, ${weather.sys.country}`;
    
    let now = new Date();
    let date = document.querySelector('.current .date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`

    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main; 

    let hi = document.querySelector('.wind')
    hi.innerHTML = `Wind<span class="blank">|</span>${Math.round(weather.wind.speed)}km/h`

    let low = document.querySelector('.hum')
    low.innerHTML = `Hum<span class="blank">|</span>${(weather.main.humidity)}%`

    if(weather.weather[0].main === "Clouds"){
        document.getElementById("icon").src = "http://openweathermap.org/img/wn/03d@2x.png"
    }
    if(weather.weather[0].main === "Rain"){
        document.getElementById("icon").src = "http://openweathermap.org/img/wn/09d@2x.png"
    }
    if(weather.weather[0].main === "Clear"){
        document.getElementById("icon").src = "http://openweathermap.org/img/wn/02d@2x.png"
    }
    if(weather.weather[0].main === "Snow"){
        document.getElementById("icon").src = "http://openweathermap.org/img/wn/13d@2x.png"
    }
}

function dateBuilder(d) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

    let date = d.getDate();
    let month = months[d.getMonth()];

    return `Today, ${date} ${month}`;
}

