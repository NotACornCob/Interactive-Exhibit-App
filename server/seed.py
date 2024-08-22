from config import app, db
from models.exhibit import Exhibit
from models.review import Review
from models.user import User
from models.installation import Installation
from models.team import Team

if __name__ == "__main__":
  with app.app_context():
    
    print("Deleting Exhibits")
    Exhibit.query.delete()

    print("Deleting Reviews")
    Review.query.delete()

    print("Deleting Users")
    User.query.delete()

    print("Deleting Installations")
    Installation.query.delete()

    print("Deleting Teams")
    Team.query.delete()
    
    db.session.commit()

    print("Generating Exhibits...")

    exhibit1 = Exhibit(name="Destination: Arcade", location="Central Plaza", exhibit_img="../src/assets/Arcade_City.0.jpg")
    exhibit2 = Exhibit(name="Toy Hall of Fame", location="Eastman Wing", exhibit_img="../src/assets/5849687bee2c359984dbe4d84ebc7303.jpg")
    exhibit3 = Exhibit(name="Destination D&D", location="Briar Wing", exhibit_img="../src/assets/DragonExhibit-4.jpg")
    exhibit4 = Exhibit(name="Interactive Arts & Sciences Exhibit", location="Central Plaza", exhibit_img="../src/assets/aias-strong-1.jpg")
    
    exhibits=[exhibit1,exhibit2,exhibit3,exhibit4]
    db.session.add_all(exhibits)
    db.session.commit()

    print("Generating Users...")

    user1 = User(username="Yolo_Baggins", team_id=1)
    user2 = User(username="Rogier", team_id=2)
    user3 = User(username="Alexander_Ironfist", team_id=1)
    user4 = User(username="Miquella", team_id=2)
    user5 = User(username="Sir_Ansbach", team_id=1)

    users =[user1,user2,user3,user4,user5]
    db.session.add_all(users)
    db.session.commit()

    print("Generating Installations...")

    installation1 = Installation(name="Giant Tetris", image_url="../src/assets/madlab-tetris-arcade-2.jpg", exhibit_id=exhibit1.id, user_id=user1.id)
    installation2 = Installation(name="Mega Donkey Kong", image_url="../src/assets/Giant-Donkey-Kong-scaled.webp", exhibit_id=exhibit1.id)
    installation3 = Installation(name="Ultimate Space Invaders", image_url="../src/assets/57-1536x1152.jpeg", exhibit_id=exhibit1.id)
    installation4 = Installation(name="Erector Set Display", image_url="../src/assets/Erector-sq.jpg", exhibit_id=exhibit2.id)
    installation5 = Installation(name="Masters of the Universe Display", image_url="../src/assets/Masters-sq.jpg", exhibit_id=exhibit2.id)
    installation6 = Installation(name="Yo-Yo Display", image_url="../src/assets/Duncan-yo-yo-sq.jpg", exhibit_id=exhibit2.id)
    installation7 = Installation(name="Original D&D Supplement I", image_url="../src/assets/Greyhawk-Supplement-cover-Image.jpg", exhibit_id=exhibit3.id)
    installation8 = Installation(name="Rare Dice Display", image_url="../src/assets/120c2fda-3818-4855-83c7-3fda3888db87.png", exhibit_id=exhibit3.id)
    installation9 = Installation(name="One-Shot Campaign Station",image_url="../src/assets/1496346624114-Ryan-Devoto-image-8.jpeg",  exhibit_id=exhibit3.id)
    installation10 = Installation(name="Comptuer Space (1971)", image_url="../src/assets/Computer-Space-1971-arcade-cabinet-presented-at-the-Game-On-2004-exhibition-in-Lille.png", exhibit_id=exhibit4.id)
    installation11 = Installation(name="Videogame History Timeline", image_url="../src/assets/High-Score-Timeline-700-1024x498 (1).jpg", exhibit_id=exhibit4.id)
    installation12 = Installation(name="John Romero's Apple II", image_url="../src/assets/apple-II-1200x1200.jpg", exhibit_id=exhibit4.id)

    installations=[installation1,installation2,installation3,installation4,installation5,installation6,installation7,installation8,installation9,installation10,installation11,installation12]
    db.session.add_all(installations)
    db.session.commit()

    print("Generating Reviews...")

    review1 = Review(title="Best In Show", body="Probably the best exhibit I've ever seen.", user_id=user1.id, exhibit_id = exhibit1.id)
    review2 = Review(title="This Was Great", body="Word can never do it justice.", user_id=user1.id, exhibit_id = exhibit2.id)
    review3 = Review(title="I've Seen Better", body="Just being honest...", user_id=user2.id, exhibit_id = exhibit2.id)
    review4 = Review(title="Must See", body="Wow, just wow.", user_id=user3.id, exhibit_id = exhibit3.id)
    review5 = Review(title="Snoozing", body="Love the museum, but this was a miss for me.", user_id=user4.id, exhibit_id = exhibit4.id)

    print("Generating Installations")

    reviews = [review1,review2,review3,review4,review5]
    db.session.add_all(reviews)
    db.session.commit()

    print("Generating Teams...")

    team1 = Team(name="The Avengers")
    team2 = Team(name="The Fellowship")

    teams = [team1,team2]
    db.session.add_all(teams)
    db.session.commit()
    
    print("seeding complete!")