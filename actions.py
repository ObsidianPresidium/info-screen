import os
import subprocess
import sys
import time
from func import preprocess, is_dev_env

print(f"{is_dev_env=}")

def match_action(rfile):
    if rfile == "action=git-pull":
        git_pull()

def git_pull():
    if is_dev_env:
        print("Git pull called, 'simulating' wait time")
        time.sleep(2)
    else:
        os.system("git pull origin master")
    preprocess()

def restart_webserver():
    print("Restarting Python process")
    subprocess.Popen(["python3", "main.py", "--do-get"], start_new_session=True)
    sys.exit(0)