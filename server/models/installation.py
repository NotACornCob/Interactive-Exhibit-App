from config import db
from sqlalchemy_serializer import SerializerMixin
from models.artist import Artist
from models.exhibit import Exhibit

class Installation(db.Model,SerializerMixin):
    __tablename__ = "installations"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    image_url = db.Column(db.String)
    description = db.Column(db.String)
    artist_id = db.Column(db.Integer, db.ForeignKey(Artist.id))
    exhibit_id = db.Column(db.Integer, db.ForeignKey(Exhibit.id))
    artist = db.relationship('Artist', back_populates='installations', cascade='delete')
    exhibit = db.relationship('Exhibit', back_populates='installations', cascade='delete')

    def __repr__(self):
        return f'<installation name={self.name}, description={self.description}, artist_id={self.artist} exhibit_id={self.exhibit} user_rating={self.user_rating} user_review={self.user_review}'