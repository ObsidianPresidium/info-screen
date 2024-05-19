let weather = {
    el: {
        temp: document.querySelector(".weather__temp"),
        text: document.querySelector(".weather__text"),
        icon: document.querySelector(".weather__icon")
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
        iconCode: "&#xe038;",
        description: ""
    },
    weatherCodes: {
        "01": "e038",
        "02": "e040",
        "03": "e004",
        "04": "e004",
        "05": "e01b",
        "10": "e027",
        "11": "e034",
        "13": "e031",
        "50": "e00d"
    }
}

weather = Object.assign(weather, {
    setWeather: function() {
        weather.el.temp.innerHTML = `${Math.round(weather.current.temperature)} &deg;${(weather.settings.units === "metric") ? "C":"F"}`;
        weather.el.text.innerHTML = weather.current.description;
        weather.el.icon.innerHTML = weather.current.iconCode;
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
            weather.current.iconCode = `&#x${weather.weatherCodes[_weather[0].icon.slice(0, 2)]};`;
            
            weather.setWeather();
        });
    }
});

weather.getWeather();
weather.getInterval = setInterval(function() {
    weather.getWeather();
}, weather.settings.updateInterval * 60 * 1000); 