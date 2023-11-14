
import os

from anyserver import TemplateRouter

THIS_DIR = os.path.dirname(os.path.realpath(__file__))

# Define a router that we can load some routes into
router = TemplateRouter(prefix='/game-of-life', base=f'{THIS_DIR}/templates')


@router.get('')
@router.renders('index')
def index(req, resp):
    return {}  # Render the initial index.html page
