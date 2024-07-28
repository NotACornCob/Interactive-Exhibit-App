from models.installation import Installation
from flask_restful import Resource
from config import app, api, Api

class HomeResource(Resource):
    def get(self):
        installations = [installation.to_dict() for installation in Installation.query.all()]
        return installations, 201

api.add_resource(HomeResource, '/api/')