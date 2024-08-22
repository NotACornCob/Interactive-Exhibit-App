from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin
from config import db, bcrypt
from models.team import Team

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id= db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False, unique=True)
    reviews = db.relationship('Review', back_populates='user')
    interactions = db.relationship('Installation', back_populates='user')
    team_id = db.Column(db.Integer, db.ForeignKey(Team.id))
    team = db.relationship('Team', back_populates='users')
    serialize_rules = ('-reviews.users','-exhibit.user', '-exhibits.users', '-exhibit.users' '-reviews.user', '-installation.user', '-installations.user', '-interactions', '-team.users')

    @property
    def review_points(self):
        from models.review import Review
        review_count = Review.query.filter_by(user_id=self.id).count()
        return review_count * 5
    
    @property
    def interaction_points(self):
        from models.installation import Installation
        interaction_count = Installation.query.filter_by(user_id=self.id).count()
        return interaction_count * 3
    
    @property
    def points(self):
        return self.review_points + self.interaction_points

    def __repr__(self):
        return f'<User id={self.id} username={self.username} points={self.points}>'
    pass