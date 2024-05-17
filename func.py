import subprocess
import socket
import types

is_dev_env = False if socket.gethostname() == "raspberrypi" else True


def get_output(command:str):
    return subprocess.run(command.split(" "), stdout=subprocess.PIPE, stderr=subprocess.STDOUT).stdout.decode("utf-8").rstrip()


def check_if_host_changed():
    with open("runtime-data/last-update.txt", "r", encoding="utf-8") as f:
        old_commit_hash = f.read()
    new_commit_hash = get_output("git rev-parse --short HEAD")
    files_changed = get_output(f"git diff --name-only {old_commit_hash} {new_commit_hash}")

    return ".py" in files_changed


def preprocess():
    preprocess_dict = {
        "$INFO-SCREEN-GIT-COMMITS": get_output("git rev-list --count HEAD"),
        "$INFO-SCREEN-GIT-COMMIT-HASH": get_output("git rev-parse --short HEAD"),
        "$INFO-SCREEN-DEV-ENV-MESSAGE": "(Development Environment)" if is_dev_env else "",
        "$INFO-SCREEN-HOST-CHANGED": check_if_host_changed
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