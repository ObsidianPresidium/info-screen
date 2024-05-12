const clockLogic = {
    el: {
        clock: document.querySelector(".clock__text")
    },

    settings: {
        usePrefixedZeroInHour: true,
        useSimulatedTime: false,
        simulatedTime: new Date("2024-05-12 06:00:00")
    },

    runClock: function(notFirstRun=false, lastDate=null) {
        let now;
        if (!clockLogic.settings.useSimulatedTime) {
            now = new Date();
        } else {
            if (notFirstRun) {
                now = new Date(lastDate.getTime() + 60000);
            } else {
                now = new Date(clockLogic.settings.simulatedTime.getTime());
            }
        }
        const nextTickTime = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();
        setTimeout(function() {
            clockLogic.updateClock(now);
            clockLogic.runClock(true, now);
        }, nextTickTime);
    },

    timeString: function(currentTime) {
        return `${(currentTime.getHours() < 10 && clockLogic.settings.usePrefixedZeroInHour) ? "0":""}${currentTime.getHours()}` + 
        ":" + 
        `${(currentTime.getMinutes() < 10) ? "0":""}${currentTime.getMinutes()}`;
    },

    updateClock: function(now) {
        clockLogic.el.clock.innerHTML = clockLogic.timeString(now);
    }
}

clockLogic.updateClock((clockLogic.settings.useSimulatedTime) ? clockLogic.settings.simulatedTime : new Date());
clockLogic.runClock();