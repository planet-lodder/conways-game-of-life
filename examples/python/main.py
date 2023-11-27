#!/usr/bin/env python3
from anyserver import AnyServer
from app import router as GAME_ROUTES

app = AnyServer()
app.register(GAME_ROUTES)
app.static("./static")


def main():
    app.start()

if __name__ == '__main__':
    main()
