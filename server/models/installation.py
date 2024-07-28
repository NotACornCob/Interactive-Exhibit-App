from config import db
from sqlalchemy_serializer import SerializerMixin
from artist import Artist
from exhibit import Exhibit

class Installation(db.Model,SerializerMixin):
    __tablename__ = "installations"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    image_url = db.Column(db.String)
    description = db.Column(db.String)
    user_rating = db.Column(db.Integer)
    user_review = db.Column(db.String)
    artist = db.Column(db.Integer, db.ForeignKey(Artist.id))
    exhibit = db.Column(db.Integer, db.ForeignKey(Exhibit.id))

    def __repr__(self):
        return f'<installation name={self.name}, description={self.description}, artist_id={self.artist} exhibit_id={self.exhibit} user_rating={self.user_rating} user_review={self.user_review}'