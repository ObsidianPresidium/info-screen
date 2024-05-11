from webserver import webserver
import threading
import os

server_thread = threading.Thread(target=webserver)
server_thread.start()