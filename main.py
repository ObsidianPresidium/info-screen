from webserver import webserver
import threading
import socket

is_dev_env = False if socket.gethostname() == "raspberrypi" else True

server_thread = threading.Thread(target=webserver)
server_thread.start()