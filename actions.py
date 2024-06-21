import os
import subprocess
import sys
import time
from func import preprocess, is_dev_env

print(f"{is_dev_env=}")

def match_action(rfile):
    if rfile == "action=git-pull":
        git_pull()
    elif rfile == "action=reboot":
        reboot()
    elif rfile == "action=poweroff":
        poweroff()

def git_pull():
    if not is_dev_env:
        os.system("git pull origin master")
    preprocess()

def reboot():
    if is_dev_env:
        print("Goodbye, pretending to reboot :)")
    else:
        os.system("sudo reboot")

def poweroff():
    if is_dev_env:
        print("Goodbye, pretending to power-off :)")
    else:
        os.system("sudo poweroff")

def restart_webserver():
    print("Restarting Python process")
    subprocess.Popen(["python3", "main.py", "--do-get"], start_new_session=True)
    sys.exit(0)