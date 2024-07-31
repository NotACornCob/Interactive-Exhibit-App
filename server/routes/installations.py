from config import db, api, app, request, g, Api, make_response
from models.installation import Installation
from flask_restful import Resource

@app.before_request
def run_logic_before_any_route():
    if request.endpoint == "/api/installations":
        id = request.view_args.get('id')
        installation = Installation.query.get(id)
        if not installation:
            return {"error": "installation does not exist"}

class InstallationsResource(Resource):
    def get(self):
        installations = [installation.to_dict() for installation in Installation.query.all()]
        return installations, 201
        pass

    def post(self): 
        data = request.get_json()
        name = data.get("name")
        image_url = data.get("image_url")
        description = data.get("description")
        artist = data.get("artist_id")
        exhibit = data.get("exhibit_id")
        try:
            installation = Installation(name=name, image_url=image_url, description=description, artist=artist, exhibit=exhibit)
            db.session.add(installation)
            db.session.commit()
            return installation.to_dict(), 201
        except:
            return {"errors": ["validation errors"]}, 400

api.add_resource(InstallationsResource, '/api/installations', endpoint="installations") 

class InstallationsResource(Resource):
    def get(self, id):
        installation = Installation.query.get(id)
        return make_response(installation.to_dict(), 201)
        pass


api.add_resource(InstallationsResource, "/api/installations/<int:id>", endpoint="installation")