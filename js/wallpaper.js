let wallpaper = {
    el: {
        wallpaper: document.querySelector(".wallpaper"),
        loader: document.querySelector(".wallpaper__loader"),
        image: document.querySelector(".wallpaper__image")
    },

    settings: {
        fadeTime: Number(getComputedStyle(document.querySelector(".wallpaper")).getPropertyValue("--fade-time").replace("s", "")),
        numWallpapers: 11,
        switchWallpaperInterval: 60,
        sourceFolder: "assets/img/wallpaper"
    },

    wallpapers: [],
};

wallpaper = Object.assign(wallpaper, {
    generateWallpaperIdArray: function() {
        let output = [];
        for (let i=0; i<wallpaper.settings.numWallpapers; i++) {
            output.push(i);
        }
        return output;
    },

    getShuffledWallpaper: function() {
        if (wallpaper.wallpaperIdArray.length === 0) {
            wallpaper.wallpaperIdArray = wallpaper.generateWallpaperIdArray();
        }
        const nextWallpaperIdId = Math.round(Math.random() * (wallpaper.wallpaperIdArray.length - 1));
        const nextWallpaperId = wallpaper.wallpaperIdArray[nextWallpaperIdId];
        wallpaper.wallpaperIdArray.splice(nextWallpaperIdId, 1);
        return wallpaper.wallpapers[nextWallpaperId];
    },

    loadFadeImage: function(imageSrc) {
        wallpaper.el.loader.src = imageSrc;
        wallpaper.el.loader.classList.add("dont-transition"); // this line prevents an error at initial run
        wallpaper.el.loader.classList.remove("dont-transition");
        wallpaper.el.loader.onload = function() {
            wallpaper.el.loader.style.opacity = 1;
            setTimeout(function() {
                wallpaper.el.image.src = imageSrc;
                wallpaper.el.loader.classList.add("dont-transition");
                wallpaper.el.loader.style.opacity = 0;
            }, wallpaper.settings.fadeTime * 1000);
        };
    },

    fadeInterval: setInterval(function() {
        wallpaper.loadFadeImage(wallpaper.getShuffledWallpaper());
    }, wallpaper.settings.switchWallpaperInterval * 1000),

    changeWallpaperNow: function() {
        clearInterval(wallpaper.fadeInterval);
        wallpaper.fadeInterval = setInterval(function() {
            wallpaper.loadFadeImage(wallpaper.getShuffledWallpaper());
        }, wallpaper.settings.switchWallpaperInterval * 1000);
      
        wallpaper.loadFadeImage(wallpaper.getShuffledWallpaper());
    },
});

wallpaper.wallpaperIdArray = wallpaper.generateWallpaperIdArray();

for (let i=0; i<wallpaper.settings.numWallpapers; i++) {
    wallpaper.wallpapers.push(`${wallpaper.settings.sourceFolder}/wallpaper-${i}.jpg`);
}

wallpaper = Object.assign(wallpaper, {
    initImageSrc: wallpaper.getShuffledWallpaper()
});





wallpaper.el.loader.src = wallpaper.initImageSrc;
wallpaper.el.image.src = wallpaper.initImageSrc;
