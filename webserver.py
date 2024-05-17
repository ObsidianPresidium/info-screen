import socket
import sys
from http.server import HTTPServer, SimpleHTTPRequestHandler
from actions import match_action
import shutil
import time
from getopt import getopt

do_get_on_startup = False
global get_function

def parseargs():
    global do_get_on_startup
    opts, args = getopt(sys.argv[1:], 'g', ["do-get"])
    for opt, arg in opts:
        if opt in ("-g", "--do-get"):
            do_get_on_startup = True

parseargs()

class Handler(SimpleHTTPRequestHandler):
    global get_function
    def _set_headers(self):
        self.send_response(200)
        self.send_header('Content-type', 'text/html')
        self.end_headers()

    def do_GET(self):
        f = self.send_head()
        if f:
            try:
                shutil.copyfileobj(f, self.wfile)
            finally:
                f.close()

    def do_HEAD(self):
        self._set_headers()

    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        match_action(post_data.decode("utf-8"))
        self.do_GET()

class Webserver(HTTPServer):
    def __init__(self):
        HTTPServer.__init__(self, ("127.0.0.1", 8080), Handler)


httpd = Webserver()

def webserver():
    print("Serving")
    httpd.serve_forever()


port_occupied = True
while port_occupied:
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        port_occupied = s.connect_ex(("127.0.0.1", 8080)) != 0
        if port_occupied:
            print("Port 8080 occupied, waiting")
            time.sleep(1)
webserver()