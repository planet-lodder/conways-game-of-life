
import os

from anyserver import TemplateRouter
import yaml

THIS_DIR = os.path.dirname(os.path.realpath(__file__))
GAME_DIR = './static/game'
BASE_DIR = '/game'

# Define a router that we can load some routes into
router = TemplateRouter(prefix='/game-of-life', base=f'{THIS_DIR}/templates')
groups = {
    "basic": "Basic Concepts",
    "simple": "Simple Examples",
    "ships": "Gliders and ships",
    "signals": "Signal Generators",
    "complex": "Large & Complex Examples",
    "other": "Other",
}


def loadPresets():
    presets = {}

    # Load the presets into memory
    with open(f'{GAME_DIR}/presets.yaml', 'r') as file:
        data = yaml.safe_load(file.read())
        presets = data

    # Scan for additional presets
    path = f'{GAME_DIR}/presets'
    for file in sorted(os.listdir(path)):
        is_img = file.endswith(".png") or file.endswith(
            ".jpg") or file.endswith(".jpeg") or file.endswith(".gif")
        if (is_img):
            presets[file] = {
                "group": "other",
                "title": os.path.splitext(file)[0],
                "image": f'{BASE_DIR}/presets/{file}',
            }

    # Return all presets that was found
    return presets


def loadEngines():
    engines = []
    path = f'{GAME_DIR}/engines'
    for file in sorted(os.listdir(path)):
        if (file.endswith(".js")):
            engines.append(os.path.splitext(file)[0])
    return engines


@router.get('')
@router.renders('index')
def index(req, resp):
    return {
        "group": req.query.get('group'),
        "groups": groups,
        "preset": req.query.get('preset'),
        "presets": loadPresets(),
        "engines": loadEngines()
    }
