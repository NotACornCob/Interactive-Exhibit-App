from config import db
from sqlalchemy_serializer import SerializerMixin

class Artist(db.Model,SerializerMixin):
    __tablename__ = "artists"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    bio = db.Column(db.String)
    installations = db.relationship('Installation', back_populates='artist')

    def __repr__(self):
        return f'<artist id = {self.id}, name={self.name} bio={self.bio}>'
    
    