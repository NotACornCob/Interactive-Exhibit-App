from config import db, api, Api
from models.installation import Installation
from flask_restful import Resource

class InstallationsResource(Resource):
    def get(self):
        installations = [installation.to_dict() for installation in Installation.query.all()]
        return installations, 201
        pass

api.add_resource(InstallationsResource, '/installations')