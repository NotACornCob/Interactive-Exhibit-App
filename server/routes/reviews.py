from config import db, api, app, request, g, Api, make_response, socketio, render_template, send
from models.review import Review
from models.user import User
from flask_restful import Resource
from flask_socketio import SocketIO,emit

@app.before_request
def run_logic_before_any_route():
    if request.endpoint == "/api/reviews":
        id = request.view_args.get('id')
        g.installation = Review.query.get(id)
        if not g.installation:
            return {"error": "installation does not exist"}


class ReviewsResource(Resource):
    def get(self):
        reviews = [review.to_dict() for review in Review.query.all()]
        return reviews, 201
        pass

    def post(self): 
        data = request.get_json()
        title = data.get("title")
        body = data.get("body")
        user_id = data.get("user_id")
        exhibit_id = data.get("exhibit_id")
        try:
            review = Review(title=title, body=body, user_id=user_id, exhibit_id=exhibit_id)
            db.session.add(review)
            db.session.commit()
            return review.to_dict(), 201
        except:
            return {"errors": ["validation errors"]}, 400

api.add_resource(ReviewsResource, '/api/reviews', endpoint="reviews") 

class ReviewsResource(Resource):

    def get(self, id):
        installation = Review.query.get(id)
        return installation.to_dict(), 201
        pass
    
    def patch(self, id):
        review = Review.query.get(id)
        data = request.get_json()
        for key, value in data.items():
            if hasattr(review, key):
                setattr(review, key, value)
            else: 
                return {"message": f"{key} is not an attribute of review"}, 422
        db.session.add(review)
        db.session.commit()
        return review.to_dict(), 200
        
    def delete(self,id):
        installation = Review.query.get(id)
        db.session.delete(installation)
        db.session.commit()
        return {}, 204
    
api.add_resource(ReviewsResource, "/api/reviews/<int:id>", endpoint="review")