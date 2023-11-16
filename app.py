
import os

from anyserver import TemplateRouter

THIS_DIR = os.path.dirname(os.path.realpath(__file__))

# Define a router that we can load some routes into
router = TemplateRouter(prefix='/game-of-life', base=f'{THIS_DIR}/templates')


@router.get('')
@router.renders('index')
def index(req, resp):
    return {}  # Render the initial index.html page


@router.get('/browse')
@router.renders('browse')
def index(req, resp):
    path = f'{THIS_DIR}/static/presets'
    presets = []
    for file in os.listdir(path):
        is_img = file.endswith(".png") or file.endswith(
            ".jpg") or file.endswith(".jpeg") or file.endswith(".gif")
        if (is_img):
            presets.append({
                "src": file,
                "title": os.path.splitext(file)[0]
            })
    return {
        "presets": presets
    }
