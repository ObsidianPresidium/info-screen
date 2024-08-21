import os
import json

owm_key = input("Enter your OpenWeatherMap API key: ")
spotify_client_id = input("Enter your Spotify client id: ")
spotify_client_secret = input("Enter your Spotify client secret: ")
spotify_refresh_token = input("Enter your Spotify refresh token: ")

spotify_dict = {
    "client_id": spotify_client_id,
    "client_secret": spotify_client_secret,
    "refresh_token": spotify_refresh_token
}

print("Dumping API keys")
if not os.path.exists("runtime-data"):
    os.mkdir("runtime-data")
with open("runtime-data/openweathermap.key", "w", encoding="utf-8") as f:
    f.write(owm_key)
with open("runtime-data/spotify.key", "w", encoding="utf-8") as f:
    json.dump(spotify_dict, f)


print("Setup of development environment complete.")