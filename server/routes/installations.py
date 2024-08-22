from config import db, api, app, request, g, Api, make_response
from models.exhibit import Exhibit
from flask_restful import Resource
from models.installation import Installation

class InstallationsResource(Resource):
    def get(self):
        installations = [installation.to_dict() for installation in Installation.query.all()]
        return installations, 201
        pass

    def post(self): 
        data = request.get_json()
        name = data.get("name")
        image_url = data.get("image_url")
        exhibit_id = data.get("exhibit_id")
        try:
            installation = Installation(name=name, image_url=image_url, exhibit_id=exhibit_id)
            db.session.add(installation)
            db.session.commit()
            return installation.to_dict(), 201
        except:
            return {"errors": ["validation errors"]}, 400


api.add_resource(InstallationsResource, '/api/installations', endpoint="installations") 
