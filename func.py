import subprocess
import socket
import types
import json

is_dev_env = False if socket.gethostname() == "raspberrypi" else True


def get_output(command:str):
    return subprocess.run(command.split(" "), stdout=subprocess.PIPE, stderr=subprocess.STDOUT).stdout.decode("utf-8").rstrip()


def check_if_host_changed():
    with open("runtime-data/last-update.txt", "r", encoding="utf-8") as f:
        old_commit_hash = f.read()
    new_commit_hash = get_output("git rev-parse --short HEAD")
    files_changed = get_output(f"git diff --name-only {old_commit_hash} {new_commit_hash}")

    return ".py" in files_changed

def get_spotify(key_type):
    with open("runtime-data/spotify.key", "r", encoding="utf-8") as f:
        keys = json.load(f)
    return keys[key_type]

def get_spotify_client_id():
    return get_spotify("client_id")

def get_spotify_client_secret():
    return get_spotify("client_secret")

def get_spotify_refresh_token():
    refresh_token = get_spotify("refresh_token")
    refresh_token = refresh_token.replace("{", "\\{")
    refresh_token = refresh_token.replace("}", "\\}")
    refresh_token = refresh_token.replace("\"", "\\\"")
    return refresh_token


def get_owm_key():
    with open("runtime-data/openweathermap.key", "r", encoding="utf-8") as f:
        return f.read().rstrip()


def preprocess():
    preprocess_dict = {
        "$INFO-SCREEN-GIT-COMMITS": get_output("git rev-list --count HEAD"),
        "$INFO-SCREEN-GIT-COMMIT-HASH": get_output("git rev-parse --short HEAD"),
        "$INFO-SCREEN-DEV-ENV-MESSAGE": "(Development Environment)" if is_dev_env else "",
        "$INFO-SCREEN-HOST-CHANGED": check_if_host_changed,
        "$INFO-SCREEN-OWM-KEY": get_owm_key,
        "$INFO-SCREEN-SPOTIFY-CLIENT-ID": get_spotify_client_id,
        "$INFO-SCREEN-SPOTIFY-CLIENT-SECRET": get_spotify_client_secret,
        "$INFO-SCREEN-SPOTIFY-REFRESH-TOKEN": get_spotify_refresh_token
    }
    preprocess_files = ["index.html"]
    print("Preprocessing files...")
    for file in preprocess_files:
        # Make preprocessed name
        dot_index = file.index(".")
        new_file = f"{file[:dot_index]}-preprocessed{file[dot_index:]}"

        print(f"  --> {file}", end="")
        with open(file, "r", encoding="utf-8") as f:
            contents = f.read()

        for (variable, value) in preprocess_dict.items():
            if isinstance(value, types.FunctionType):
                value = str(value())

            contents = contents.replace(variable, value)

        with open(f"{new_file}", "w", encoding="utf-8") as f:
            f.write(contents)
        print(" ✓")

    print()