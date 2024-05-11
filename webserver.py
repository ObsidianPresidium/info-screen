from http.server import HTTPServer, SimpleHTTPRequestHandler
from actions import match_action
import shutil

class Handler(SimpleHTTPRequestHandler):
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

httpd = HTTPServer(("127.0.0.1", 8080), Handler)

def webserver():
    httpd.serve_forever()