
import os

from anyserver import TemplateRouter
import yaml

THIS_DIR = os.path.dirname(os.path.realpath(__file__))
GAME_DIR = './static'

# Define a router that we can load some routes into
router = TemplateRouter(prefix='/game-of-life', base=f'{THIS_DIR}/templates')
groups = {
    "basic": "Basic Concepts",
    "simple": "Simple Examples",
}


def loadPresets():
    presets = {}

    # Load the presets into memory
    with open(f'{GAME_DIR}/presets.yaml', 'r') as file:
        data = yaml.safe_load(file.read())
        presets = data

    # Return all presets that was found
    return presets

@router.get('')
@router.renders('index')
def index(req, resp):
    return {
        "group": req.query.get('group'),
        "groups": groups,
        "preset": req.query.get('preset'),
        "presets": loadPresets(),
    }
