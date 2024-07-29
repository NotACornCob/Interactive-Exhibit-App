from config import app, db
from models.exhibit import Exhibit
from models.artist import Artist
from models.installation import Installation

if __name__ == "__main__":
  with app.app_context():
    
    print("Deleting Artists")
    Artist.query.delete()

    print("Deleting Installations")
    Installation.query.delete()

    print("Deleting Exhibits")
    Exhibit.query.delete()
    db.session.commit()

    print("Generating Artists...")

    artist1 = Artist(name="Giovanni David", bio="A Genoese artist succinctly described by his biographer Federico Alizeri as ‘with few known works, a bizarre style, and an obscure, almost mysterious life’.")
    artist2= Artist(name="Michel Bruno Bellengé", bio="Michel Bruno Bellengé was born in Rouen into a family of fourteen children and began his training at the local drawing school. Having won three prizes there he began painting flowers on enamel, before graduating to works in oil and membership of the Académie Royale de Peinture et de Sculpture in Paris in 1764.")
    artist3= Artist(name="Giovanni Battista Cima", bio="Giovanni Battista Cima, also called Cima da Conegliano (c. 1459 – c. 1517), was an Italian Renaissance painter, who mostly worked in Venice.")
    artist4 = Artist(name="Giovanni David", bio="A Genoese artist succinctly described by his biographer Federico Alizeri as ‘with few known works, a bizarre style, and an obscure, almost mysterious life’.")
    artist5 = Artist(name="Giovanni David", bio="A Genoese artist succinctly described by his biographer Federico Alizeri as ‘with few known works, a bizarre style, and an obscure, almost mysterious life’.")
    artist6 = Artist(name="Giovanni David", bio="A Genoese artist succinctly described by his biographer Federico Alizeri as ‘with few known works, a bizarre style, and an obscure, almost mysterious life’.")
    artist7 = Artist(name="Giovanni David", bio="A Genoese artist succinctly described by his biographer Federico Alizeri as ‘with few known works, a bizarre style, and an obscure, almost mysterious life’.")
    artist8 = Artist(name="Giovanni David", bio="A Genoese artist succinctly described by his biographer Federico Alizeri as ‘with few known works, a bizarre style, and an obscure, almost mysterious life’.")
    artist9 = Artist(name="Giovanni David", bio="A Genoese artist succinctly described by his biographer Federico Alizeri as ‘with few known works, a bizarre style, and an obscure, almost mysterious life’.")
    artist10 = Artist(name="Giovanni David", bio="A Genoese artist succinctly described by his biographer Federico Alizeri as ‘with few known works, a bizarre style, and an obscure, almost mysterious life’.")
    artist11 = Artist(name="Giovanni David", bio="A Genoese artist succinctly described by his biographer Federico Alizeri as ‘with few known works, a bizarre style, and an obscure, almost mysterious life’.")
   

    artists=[artist1,artist2,artist3,artist4,]
    db.session.add_all(artists)
    db.session.commit()

    print("Generating Exhibits...")

    exhibit1 = Exhibit(name="European Paintings, 1500-1800", location="Central Wing")
    exhibit2 = Exhibit(name="Modern Art", location="2nd Floor Plaza")
    exhibit1 = Exhibit(name="European Paintings, 1500-1800", location="Central Wing")
    exhibit2 = Exhibit(name="Modern Art", location="2nd Floor Plaza")
    exhibit1 = Exhibit(name="European Paintings, 1500-1800", location="Central Wing")
    exhibit2 = Exhibit(name="Modern Art", location="2nd Floor Plaza")
    exhibit1 = Exhibit(name="European Paintings, 1500-1800", location="Central Wing")
    exhibit2 = Exhibit(name="Modern Art", location="2nd Floor Plaza")

    exhibits=[exhibit1,exhibit2]
    db.session.add_all(exhibits)
    db.session.commit()

    print("Generating Installations...")

    installation1 = Installation(name="A Nightmare", image_url="../src/assets/ANightmare.jpg", description="A bare-breasted woman lights a torch from a brazier held by Death, accompanied by his scythe, while above her hovers a winged demon holding thunderbolts and snakes in his hands. At the upper left sits King Minos, judge of the dead, attended by the three-headed dog Cerberus.", artist=artist1.id, exhibit=exhibit1.id)
    installation2 = Installation(name="Vase of Flowers in a Niche", image_url="../src/assets/VaseofFlowersinaNiche.jpg", description="Intended to be inserted into decorative paneling over a door, this painting makes most sense when seen from below. From this vantage point, the dramatic perspective, shadows, and underbelly of the vase trick the eye into believing this is not a painting at all, but the thing itself.", artist=artist2.id, exhibit=exhibit1.id)
    installation3 = Installation(name="Three Saints: Roch, Anthony Abbot, and Lucy", image_url="../src/assets/ThreeSaints.jpg", description="Three saints, each a protector and healer, are invoked in this altarpiece. Anthony Abbot, patron saint of those with infectious diseases, stands elevated at the center.", artist=artist3.id, exhibit=exhibit1.id)
    installation4 = Installation(name="A Nightmare", image_url="../src/assets/ANightmare.jpg", description="A bare-breasted woman lights a torch from a brazier held by Death, accompanied by his scythe, while above her hovers a winged demon holding thunderbolts and snakes in his hands. At the upper left sits King Minos, judge of the dead, attended by the three-headed dog Cerberus.", artist=artist1.id, exhibit=exhibit1.id)
    installation5 = Installation(name="Vase of Flowers in a Niche", image_url="../src/assets/VaseofFlowersinaNiche.jpg", description="Intended to be inserted into decorative paneling over a door, this painting makes most sense when seen from below. From this vantage point, the dramatic perspective, shadows, and underbelly of the vase trick the eye into believing this is not a painting at all, but the thing itself.", artist=artist2.id, exhibit=exhibit1.id)
    installation6 = Installation(name="Three Saints: Roch, Anthony Abbot, and Lucy", image_url="../src/assets/ThreeSaints.jpg", description="Three saints, each a protector and healer, are invoked in this altarpiece. Anthony Abbot, patron saint of those with infectious diseases, stands elevated at the center.", artist=artist3.id, exhibit=exhibit1.id)
    installation7 = Installation(name="A Nightmare", image_url="../src/assets/ANightmare.jpg", description="A bare-breasted woman lights a torch from a brazier held by Death, accompanied by his scythe, while above her hovers a winged demon holding thunderbolts and snakes in his hands. At the upper left sits King Minos, judge of the dead, attended by the three-headed dog Cerberus.", artist=artist1.id, exhibit=exhibit1.id)
    installation8 = Installation(name="Vase of Flowers in a Niche", image_url="../src/assets/VaseofFlowersinaNiche.jpg", description="Intended to be inserted into decorative paneling over a door, this painting makes most sense when seen from below. From this vantage point, the dramatic perspective, shadows, and underbelly of the vase trick the eye into believing this is not a painting at all, but the thing itself.", artist=artist2.id, exhibit=exhibit1.id)
    installation9 = Installation(name="Three Saints: Roch, Anthony Abbot, and Lucy", image_url="../src/assets/ThreeSaints.jpg", description="Three saints, each a protector and healer, are invoked in this altarpiece. Anthony Abbot, patron saint of those with infectious diseases, stands elevated at the center.", artist=artist3.id, exhibit=exhibit1.id)
    installation10 = Installation(name="A Nightmare", image_url="../src/assets/ANightmare.jpg", description="A bare-breasted woman lights a torch from a brazier held by Death, accompanied by his scythe, while above her hovers a winged demon holding thunderbolts and snakes in his hands. At the upper left sits King Minos, judge of the dead, attended by the three-headed dog Cerberus.", artist=artist1.id, exhibit=exhibit1.id)
    installation11 = Installation(name="Vase of Flowers in a Niche", image_url="../src/assets/VaseofFlowersinaNiche.jpg", description="Intended to be inserted into decorative paneling over a door, this painting makes most sense when seen from below. From this vantage point, the dramatic perspective, shadows, and underbelly of the vase trick the eye into believing this is not a painting at all, but the thing itself.", artist=artist2.id, exhibit=exhibit1.id)
    installation12 = Installation(name="Three Saints: Roch, Anthony Abbot, and Lucy", image_url="../src/assets/ThreeSaints.jpg", description="Three saints, each a protector and healer, are invoked in this altarpiece. Anthony Abbot, patron saint of those with infectious diseases, stands elevated at the center.", artist=artist3.id, exhibit=exhibit1.id)
    installation13 = Installation(name="A Nightmare", image_url="../src/assets/ANightmare.jpg", description="A bare-breasted woman lights a torch from a brazier held by Death, accompanied by his scythe, while above her hovers a winged demon holding thunderbolts and snakes in his hands. At the upper left sits King Minos, judge of the dead, attended by the three-headed dog Cerberus.", artist=artist1.id, exhibit=exhibit1.id)
    installation14 = Installation(name="Vase of Flowers in a Niche", image_url="../src/assets/VaseofFlowersinaNiche.jpg", description="Intended to be inserted into decorative paneling over a door, this painting makes most sense when seen from below. From this vantage point, the dramatic perspective, shadows, and underbelly of the vase trick the eye into believing this is not a painting at all, but the thing itself.", artist=artist2.id, exhibit=exhibit1.id)
    installation15 = Installation(name="Three Saints: Roch, Anthony Abbot, and Lucy", image_url="../src/assets/ThreeSaints.jpg", description="Three saints, each a protector and healer, are invoked in this altarpiece. Anthony Abbot, patron saint of those with infectious diseases, stands elevated at the center.", artist=artist3.id, exhibit=exhibit1.id)
    
    installations=[installation1,installation2]
    db.session.add_all(installations)
    db.session.commit()

    print("seeding complete!")