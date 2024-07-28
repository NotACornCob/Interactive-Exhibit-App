from config import api, Api
from models.exhibit import Exhibit
from flask_restful import Resource

class ExhibitsResource(Resource):
    def get(self):
        pass

api.add_resource(ExhibitResource,'/exhibits')