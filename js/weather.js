let weather = {
    el: {
        temp: document.querySelector(".weather__temp"),
        text: document.querySelector(".weather__text")
    },
    settings: {
        key: data.owmKey,
        city: "copenhagen",
        units: "metric",
        updateInterval: 30  // update interval in minutes
    },
    current: {
        dataObject: new Object(),
        temperature: "Fetching weather details...",
        description: ""
    }
}

weather = Object.assign(weather, {
    setWeather: function() {
        weather.el.temp.innerHTML = `${Math.round(weather.current.temperature)} &deg;${(weather.settings.units === "metric") ? "C":"F"}`;
        weather.el.text.innerHTML = weather.current.description;
    }
});

weather = Object.assign(weather, {
    getWeather: function() {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${weather.settings.city}&appid=${weather.settings.key}&units=${weather.settings.units}`)
        .then(response => response.json())
        .then(returnData => {
            console.log(returnData);
            const main = returnData.main;
            const _weather = returnData.weather;
            weather.current.dataObject = data;

            weather.current.temperature = main.temp;
            weather.current.description = _weather[0].description;
            
            weather.setWeather();
        });
    }
});

weather.getWeather();
weather.getInterval = setInterval(function() {
    weather.getWeather();
}, weather.settings.updateInterval * 60 * 1000); 