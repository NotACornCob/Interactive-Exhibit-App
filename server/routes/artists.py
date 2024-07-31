from config import db, api, app, request, g, Api, make_response
from models.artist import Artist
from flask_restful import Resource 

class ArtistsResource(Resource):
    def get(self):
        artists = [artist.to_dict(only=('name','bio','id')) for artist in Artist.query.all()]
        return artists, 201
        pass

    def post(self): 
        data = request.get_json()
        name = data.get("name")
        bio = data.get("bio")
        try:
            artist = Artist(name=name, bio=bio)
            db.session.add(artist)
            db.session.commit()
            return artist.to_dict(), 201
        except:
            return {"errors": ["validation errors"]}, 400

api.add_resource(ArtistsResource, '/api/artists', endpoint='artists')