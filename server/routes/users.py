from config import socketio
from flask import request, session, app
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
from models.user import User
from config import app, db, api

class UsersResource(Resource):
    def get(self):
        users = [user.to_dict() for user in User.query.all()]
        return users, 201
        pass

    def post(self):
        data = request.get_json()
        username = data.get("username")
        try: 
            user = User(username=username)
            db.session.add(user)
            db.session.commit()
            return user.to_dict(), 201
        except IntegrityError:
            return {"error": "Unprocessable Entity"}, 422
        
class CheckSessionResource(Resource):
    def get(self):
        user = User.query.filter(User.id == session.get('user_id')).first()
        if user:
            return user.to_dict()
        else:
            return {"message": "Unauthorized"}, 401
    pass

api.add_resource(UsersResource, '/api/users', endpoint='users')
api.add_resource(CheckSessionResource, '/api/check_session', endpoint='check_session')