from webserver import webserver
import threading
import socket
import subprocess

is_dev_env = False if socket.gethostname() == "raspberrypi" else True

def get_output(command:str):
    return subprocess.run(command.split(" "), stdout=subprocess.PIPE, stderr=subprocess.STDOUT).stdout.decode("utf-8")[:-1]

preprocess_dict = {
    "$INFO-SCREEN-GIT-COMMITS": get_output("git rev-list --count HEAD"),
    "$INFO-SCREEN-GIT-COMMIT-HASH": get_output("git rev-parse --short HEAD"),
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
        contents = contents.replace(variable, value)
    with open(f"{new_file}", "w", encoding="utf-8") as f:
        f.write(contents)
    print(" ✓")

print("\nAll done!")
server_thread = threading.Thread(target=webserver)
server_thread.start()
print("Webserver started")