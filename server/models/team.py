from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin
from config import db, bcrypt

class Team(db.Model, SerializerMixin):
    __tablename__ = 'teams'

    id= db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False, unique=True)
    users = db.relationship('User', back_populates='team')
    serialize_rules = ('-review.teams','-exhibit.teams', '-user.teams', '-installation.teams', '-interactions.teams', '-team.users', '-team.users.team', '-team.users.reviews', '-team.users.interactions', '-team.users.installations' '-team.users.teams', '-team.users.team.users', '-team.users.team.reviews', '-team.users.team.interactions', '-team.users.team.installations', '-team.users.team.teams', '-users.reviews', '-users.team')

@property
def points(self):
    user_points = [user.points for user in self.users]
    return sum(user_points)

def __repr__(self):
    return f'<Team id={self.id} name={self.name} users={self.users}>'
pass