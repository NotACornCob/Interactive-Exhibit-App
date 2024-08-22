from config import db
from sqlalchemy_serializer import SerializerMixin

class Exhibit(db.Model, SerializerMixin):
    __tablename__ = "exhibits"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    location = db.Column(db.String)
    exhibit_img = db.Column(db.String)
    reviews = db.relationship("Review", back_populates='exhibit')
    installations = db.relationship("Installation", back_populates='exhibit')
    serialize_rules = ('-review.exhibits','-user.exhibits', '-installations.exhibit')

    def __repr__(self):
        return f'<exhibit id = {self.id}, name={self.name}, location={self.location} exhibit_img={self.exhibit_img}>'