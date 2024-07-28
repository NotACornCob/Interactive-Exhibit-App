from config import db
from sqlalchemy_serializer import SerializerMixin

class Exhibit(db.Model, SerializerMixin):
    __tablename__ = "exhibits"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    location = db.Column(db.String)
