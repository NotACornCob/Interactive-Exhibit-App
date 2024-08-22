from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin
from models.user import User
from models.exhibit import Exhibit

from config import db, bcrypt

class Review(db.Model, SerializerMixin):
    __tablename__ = 'reviews'
    
    id= db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    body = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(User.id))
    exhibit_id = db.Column(db.Integer, db.ForeignKey(Exhibit.id))
    user = db.relationship('User', back_populates='reviews')
    exhibit = db.relationship('Exhibit', back_populates='reviews')
    serialize_rules = ('-exhibit.reviews', '-user.reviews' )

    def __repr__(self):
        return f'<Review id={self.id} title={self.title}, body={self.body} user_id={self.user_id} exhibit_id={self.exhibit_id}, >'
    pass