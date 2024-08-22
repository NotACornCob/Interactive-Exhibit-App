from config import db, api, app, request, g, Api, make_response
from models.exhibit import Exhibit
from flask_restful import Resource

class ExhibitsResource(Resource):
    def get(self):
        exhibits = [exhibit.to_dict() for exhibit in Exhibit.query.all()]
        return exhibits, 201
        pass

    def post(self): 
        data = request.get_json()
        name = data.get("name")
        location = data.get("location")
        exhibit_img = data.get("exhibit_img")
        try:
            exhibit = Exhibit(name=name, location=location, exhibit_img=exhibit_img)
            db.session.add(exhibit)
            db.session.commit()
            return exhibit.to_dict(), 201
        except:
            return {"errors": ["validation errors"]}, 400

api.add_resource(ExhibitsResource,'/api/exhibits', endpoint='exhibits')