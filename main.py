#!/usr/bin/env python3
from anyserver import AnyServer

app = AnyServer()
app.templates('./templates')
app.static("./public")

@app.get('/')
@app.renders('index')
def ping(req, resp):
    return {"ping": "pong"}

def main():
    app.start()


if __name__ == '__main__':
    main()
