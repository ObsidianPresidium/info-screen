import subprocess
import sys
import os
from func import preprocess, get_output

print("Writing host version")
if not os.path.exists("runtime-data"):
    os.mkdir("runtime-data")
with open("runtime-data/last-update.txt", "w", encoding="utf-8") as f:
    f.write(get_output("git rev-parse --short HEAD"))

preprocess()

print("All done!")
# server_thread = threading.Thread(target=webserver)
# server_thread.start()

print("Starting webserver process")
arg_list = ["python3", "webserver.py"] + sys.argv[1:]
subprocess.run(arg_list)
