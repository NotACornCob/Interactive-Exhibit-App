from config import db, api, app, request, g, Api, make_response
from models.installation import Installation
from flask_restful import Resource

@app.before_request
def run_logic_before_any_route():
    if request.endpoint == "/api/installations":
        id = request.view_args.get('id')
        g.installation = Installation.query.get(id)
        if not g.installation:
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
        artist_id = data.get("artist_id")
        exhibit_id = data.get("exhibit_id")
        try:
            installation = Installation(name=name, image_url=image_url, description=description, artist_id=artist_id, exhibit_id=exhibit_id)
            db.session.add(installation)
            db.session.commit()
            return installation.to_dict(), 201
        except:
            return {"errors": ["validation errors"]}, 400

api.add_resource(InstallationsResource, '/api/installations', endpoint="installations") 

class InstallationsResource(Resource):
    def get(self, id):
        installation = Installation.query.get(id)
        return installation.to_dict(), 201
        pass
    
    def patch(self, id):
        installation = Installation.query.get(id)
        data = request.get_json()
        for key, value in data.items():
            if hasattr(installation, key):
                setattr(installation, key, value)
            else: 
                return {"message": f"{key} is not an attribute of installation"}, 422
            db.session.add(installation)
            db.session.commit()
            return installation.to_dict(), 200
        
    def delete(self,id):
        installation = Installation.query.get(id)
        db.session.delete(installation)
        db.session.commit(),
        return {}, 204

api.add_resource(InstallationsResource, "/api/installations/<int:id>", endpoint="installation")