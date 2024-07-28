from config import db
from sqlalchemy_serializer import SerializerMixin
from artist import Artist
from exhibit import Exhibit
from sqlalchemy.orm import validates

class Installation(db.Model, SerializerMixin):
    __tablename__ = "installations"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    image_url = db.Column(db.String)
    description = db.Column(db.String)
    user_rating = db.Column(db.Integer)
    user_review = db.Column(db.String)

    exhibit = db.Column(db.Integer, db.ForeignKey(Exhibit.id))
    artist = db.Column(db.Integer, db.ForeignKey(Artist.id))

    

    