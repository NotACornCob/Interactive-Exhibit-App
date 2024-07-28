from config import db
from sqlalchemy_serializer import SerializerMixin

class Artist(db.Model, SerializerMixin):
    __tablename__ = "artists"