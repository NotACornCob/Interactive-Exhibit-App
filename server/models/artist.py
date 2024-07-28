from config import db
from sqlalchemy_serializer import SerializerMixin

class Artist(db.Model, SerializerMixin):
    __tablename__ = "artists"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    bio = db.Column(db.String)
