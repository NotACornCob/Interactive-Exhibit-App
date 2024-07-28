from config import db
from sqlalchemy_serializer import SerializerMixin

class Installation(db.Model, SerializerMixin):
    __tablename__ = "installations"