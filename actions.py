import os

def match_action(rfile):
    if rfile == "action=git-pull":
        git_pull()

def git_pull():
    os.system("git pull origin master")