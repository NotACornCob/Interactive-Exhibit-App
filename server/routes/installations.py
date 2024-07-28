from config import db, api, Api
from models.installation import Installation
from flask_restful import Resource

class InstallationsResource(Resource):
    def get(self):
        pass

api.add_resource(InstallationsResource, '/artists')