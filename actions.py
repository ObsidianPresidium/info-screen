import os
import socket

is_dev_env = False if socket.gethostname() == "raspberrypi" else True

def match_action(rfile):
    if rfile == "action=git-pull" and not is_dev_env:
        git_pull()

def git_pull():
    os.system("git pull origin master")