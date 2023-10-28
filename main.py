#!/usr/bin/env python3
from anyserver import AnyServer

app = AnyServer()
app.static("./public")


def main():
    app.start()


if __name__ == '__main__':
    main()
