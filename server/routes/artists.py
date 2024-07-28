from config import api, Api
from models.artist import Artist
from flask_restful import Resource 

class ArtistsResource(Resource):
    def get(self):
        pass

api.add_resource(ArtistsResource, '/artists')