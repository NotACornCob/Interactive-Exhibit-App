from config import db, api, app, request, g, Api, make_response
from models.team import Team
from flask_restful import Resource

class TeamsResource(Resource):
    def get(self):
        teams = [team.to_dict() for team in Team.query.all()]
        return teams, 201
        pass

api.add_resource(TeamsResource,'/api/teams', endpoint='teams')