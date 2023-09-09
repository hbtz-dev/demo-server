# demo-server

basic hello world server

The server looks for a port to listen on in order of priority:
- The first command line argument
- `process.env["PORT"]`

If the server receives a SIGTERM, it will wait five seconds before shutting down.
