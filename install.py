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
service_dict = {
    "INFO_SCREEN_CURRENT_DIRECTORY": os.getcwd(),
    "INFO_SCREEN_CURRENT_USER": os.getlogin(),
    "INFO_SCREEN_MAIN_SCRIPT_PATH": f"{os.getcwd()}/main.py"
}
browser_autostart = """
[autostart]
1 = chromium-browser --start-maximized --start-fullscreen 127.0.0.1:8080/index-preprocessed.html"""

with open("info-screen.service", "r") as f:
    lines = f.read()

for (replace_string, replace_with) in service_dict.items():
    lines = lines.replace(replace_string, replace_with)

with open("info-screen.service.new", "w") as f:
    f.write(lines)

print("Creating and enabling systemd service")
os.system("sudo mv info-screen.service.new /etc/systemd/system/info-screen.service")
os.system("sudo systemctl enable info-screen.service")

print("Creating autostart entry for web interface")
with open(f"{os.getenv('HOME')}/.config/wayfire.ini", "a+") as f:
    if f.read()[-1:] != "\n":
        f.write("\n")
    f.write(browser_autostart)

print("Dumping API keys")
if not os.path.exists("runtime-data"):
    os.mkdir("runtime-data")
with open("runtime-data/openweathermap.key", "w", encoding="utf-8") as f:
    f.write(owm_key)
with open("runtime-data/spotify.key", "w", encoding="utf-8") as f:
    json.dump(spotify_dict, f)


print("Install complete! Reboot the system to start info-screen.")