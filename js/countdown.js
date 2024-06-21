let countdown = {
    el: {
        days: document.querySelector(".countdown__days"),
        hours: document.querySelector(".countdown__hours"),
        minutes: document.querySelector(".countdown__minutes"),
        seconds: document.querySelector(".countdown__seconds")
    },
    settings: {
        countdownDate: new Date("2024-06-27 19:00:00 UTC+0200")
    }
};

countdown = Object.assign(countdown, {
    pluralize: function(word, number) {
        return (number == 1) ? word:word + "s";
    }
});

countdown = Object.assign(countdown, {
    setCountdown: function() {
        const now = new Date();
        const delta = countdown.settings.countdownDate - now;
        const seconds = Math.floor((delta / 1000) % 60);
        const minutes = Math.floor((delta / 1000 / 60) % 60);
        const hours = Math.floor((delta / 1000 / 60 / 60) % 24);
        const days = Math.floor((delta / 1000 / 60 / 60 / 24));

        countdown.el.seconds.innerHTML = `${seconds} ${countdown.pluralize("second", seconds)}`
        countdown.el.minutes.innerHTML = `${minutes} ${countdown.pluralize("minute", minutes)}`
        countdown.el.hours.innerHTML = `${hours} ${countdown.pluralize("hour", hours)}`
        countdown.el.days.innerHTML = `${days} ${countdown.pluralize("day", days)}`
    }
});

countdown.interval = setInterval(countdown.setCountdown, 1000);