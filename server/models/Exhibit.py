from config import db
from sqlalchemy_serializer import SerializerMixin

class Exhibit(db.Model, SerializerMixin):
    __tablename__ = "exhibits"