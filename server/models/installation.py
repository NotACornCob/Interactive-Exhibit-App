from config import db
from sqlalchemy_serializer import SerializerMixin
from models.exhibit import Exhibit
from models.user import User

class Installation(db.Model,SerializerMixin):
    __tablename__ = "installations"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    image_url = db.Column(db.String)
    exhibit_id = db.Column(db.Integer, db.ForeignKey(Exhibit.id))
    user_id = db.Column(db.Integer, db.ForeignKey(User.id))
    exhibit = db.relationship('Exhibit', back_populates='installations')
    user= db.relationship('User', back_populates='interactions')
    serialize_rules = ('-exhibit.installations', '-user.installations', '-review.installations', '-exhibit.reviews', '-user.reviews')

    def __repr__(self):
        return f'<Installation id={self.id} name={self.name}, image_url={self.image_url} exhibit_id={self.exhibit_id}>'
    pass