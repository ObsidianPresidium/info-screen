import os

service_dict = {
    "INFO_SCREEN_CURRENT_DIRECTORY": os.getcwd(),
    "INFO_SCREEN_CURRENT_USER": os.getlogin(),
    "INFO_SCREEN_MAIN_SCRIPT_PATH": f"{os.getcwd()}/main.py"
}
browser_autostart = """
[autostart]
1 = chromium-browser --start-maximized --start-fullscreen 127.0.0.1:8080"""

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
with open(f"{os.getenv('HOME')}/.config/wayfire.ini", "ra") as f:
    if f.read()[-1] != "\n":
        f.write("\n")
    f.write(browser_autostart)

print("Install complete! Reboot the system to start info-screen.")