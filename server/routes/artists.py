from config import api, Api
from models.artist import Artist
from flask_restful import Resource 

class ArtistsResource(Resource):
    def get(self):
        artists = [artist.to_dict() for artist in Artist.query.all()]
        return artists, 201
        pass

api.add_resource(ArtistsResource, '/artists')