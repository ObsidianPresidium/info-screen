let spotify = {
    el: {
        artist: document.querySelector(".spotify__artist"),
        cover: document.querySelector(".spotify__cover"),
        title: document.querySelector(".spotify__title")
    },
    endpoints: {
        nowPlaying: "https://api.spotify.com/v1/me/player/currently-playing",
        token: "https://accounts.spotify.com/api/token"
    },
    keys: {
        clientId: window.data.spotifyClientId,
        clientSecret: window.data.spotifyClientSecret,
        refreshToken: window.data.spotifyRefreshToken
    },
    settings: {
        updateInterval: 2  // Update interval in seconds
    }
}

spotify = Object.assign(spotify, {
    setCover: function(coverSrc) {
        if (coverSrc === "none") {
            spotify.el.cover.src = "assets/icon/bx-album.svg";
            spotify.el.cover.style.height = "8rem";
            spotify.el.cover.style.width = "8rem";
        } else {
            spotify.el.cover.src = coverSrc;
            spotify.el.cover.style.height = "10rem";
            spotify.el.cover.style.width = "10rem";
        }
    },
    getAccessToken: async function() {
        const basic = btoa(`${spotify.keys.clientId}:${spotify.keys.clientSecret}`);

        const params = new URLSearchParams();
        params.append("grant_type", "refresh_token");
        params.append("refresh_token", spotify.keys.refreshToken);

        const response = await fetch(spotify.endpoints.token, {
            method: "POST",
            headers: {
                Authorization: `Basic ${basic}`,
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: params
        });

        return response.json();
    }
});

spotify = Object.assign(spotify, {
    resetEls: function() {
        spotify.el.title.innerHTML = "";
        spotify.setCover("none");
        spotify.el.artist.innerHTML = "";
    },
    getNowPlaying: function() {
        const { accessToken } = spotify.getAccessToken();

        const response = fetch(spotify.endpoints.nowPlaying, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            }
        });

        if (response.status === 204) {
            return "Not playing";
        } else if (response.status !== 200) {
            return "Error";
        }

        const song = response.json();
        const albumCover = song.item.album.images[0].url;
        const artist = song.item.artists.map((artist) => artist.name).join(', ');
        const isPlaying = song.is_playing;
        const title = song.item.name;
        const timePlayed = song.progress_ms;
        const timeTotal = song.item.duration_ms;

        return {
            song,
            albumCover,
            artist,
            isPlaying,
            title,
            timePlayed,
            timeTotal
        }
    }
});

spotify = Object.assign(spotify, {
    updateDom: function() {
        const song = spotify.getNowPlaying();
        try {
            if (song === "Not playing" || !song.isPlaying) {
                spotify.resetEls();
                spotify.el.title.innerHTML = "Not Playing";
            }
        } catch (e) {
            spotify.resetEls();
            spotify.el.title.innerHTML = "Error";
            throw e;
            return;
        }

        spotify.el.title.innerHTML = song.title;
        spotify.el.artist.innerHTML = song.artist;
        spotify.setCover(song.albumCover);
    }
});

spotify = Object.assign(spotify, {
    domUpdater: setInterval(spotify.updateDom, spotify.settings.updateInterval)
});