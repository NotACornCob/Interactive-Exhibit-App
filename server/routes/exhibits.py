from config import api, Api
from models.exhibit import Exhibit
from flask_restful import Resource

class ExhibitsResource(Resource):
    def get(self):
        exhibits = [exhibit.to_dict() for exhibit in Exhibit.query.all()]
        return exhibits, 201
        pass

api.add_resource(ExhibitsResource,'/exhibits')