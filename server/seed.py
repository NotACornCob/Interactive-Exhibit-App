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
    artist3= Artist(name="Giovanni Battista Cima", bio="Giovanni Battista Cima, also called Cima da Conegliano (c. 1459 – c. 1517), was an Italian Renaissance painter, who mostly worked in Venice.")
    artist4 = Artist(name="Sakai Hōitsu", bio="Sakai Hōitsu was a Japanese painter of the Rinpa school. He is known for having revived the style and popularity of Ogata Kōrin, and for having created a number of reproductions of Kōrin's work.")
    artist5 = Artist(name="Itō Jakuchū", bio="Itō Jakuchū was a Japanese painter of the mid-Edo period when Japan had isolated itself from the outside world. Many of his paintings concern traditionally Japanese subjects, particularly chickens and other birds.")
    artist6 = Artist(name="George Calab Bingham", bio="George Caleb Bingham was an American artist, soldier and politician known in his lifetime as the Missouri Artist. His paintings of American frontier life along the Missouri River exemplify the Luminist style.")
    artist7 = Artist(name="Unknown", bio="n/a.")

    artists=[artist1,artist2,artist3,artist4,artist5,artist6,artist7]
    db.session.add_all(artists)
    db.session.commit()

    print("Generating Exhibits...")

    exhibit1 = Exhibit(name="European Paintings, 1500-1800", location="Central Plaza")
    exhibit2 = Exhibit(name="American Art", location="Eastman Wing")
    exhibit3 = Exhibit(name="Asian Art", location="Rockefeller Wing")
    exhibit4 = Exhibit(name="Ancient Egyptian Art", location="Briar Wing")
    exhibits=[exhibit1,exhibit2,exhibit3,exhibit4]
    db.session.add_all(exhibits)
    db.session.commit()

    print("Generating Installations...")

    installation1 = Installation(name="A Nightmare", image_url="../src/assets/ANightmare.jpg", description="A bare-breasted woman lights a torch from a brazier held by Death, accompanied by his scythe, while above her hovers a winged demon holding thunderbolts and snakes in his hands. At the upper left sits King Minos, judge of the dead, attended by the three-headed dog Cerberus.", artist_id=artist1.id, exhibit_id=exhibit1.id)
    installation2 = Installation(name="Vase of Flowers in a Niche", image_url="../src/assets/VaseofFlowersinaNiche.jpg", description="Intended to be inserted into decorative paneling over a door, this painting makes most sense when seen from below. From this vantage point, the dramatic perspective, shadows, and underbelly of the vase trick the eye into believing this is not a painting at all, but the thing itself.", artist_id=artist2.id, exhibit_id=exhibit1.id)
    installation3 = Installation(name="Three Saints: Roch, Anthony Abbot, and Lucy", image_url="../src/assets/ThreeSaints.jpg", description="Three saints, each a protector and healer, are invoked in this altarpiece. Anthony Abbot, patron saint of those with infectious diseases, stands elevated at the center.", artist_id=artist3.id, exhibit_id=exhibit1.id)
    installation4 = Installation(name="Persimmon Tree", image_url="../src/assets/PersimmonTree1.jpg", description="A bare-breasted woman lights a torch from a brazier held by Death, accompanied by his scythe, while above her hovers a winged demon holding thunderbolts and snakes in his hands. At the upper left sits King Minos, judge of the dead, attended by the three-headed dog Cerberus.", artist_id=artist4.id, exhibit_id=exhibit3.id)
    installation5 = Installation(name="Fur Traders Descending the Missouri", image_url="../src/assets/FurTradersDescending.jpg", description=" Bingham, who began his career as a portraitist, produced this distinctive genre painting with little precedent in his oeuvre. The tranquil scene, with its luminous atmosphere, idealized the American frontier for the benefit of an Eastern audience.", artist_id=artist5.id, exhibit_id=exhibit2.id)
    installation6 = Installation(name="Golden Pheasant in the Snow", image_url="../src/assets/GoldenPheasantintheSnow.jpg", description="Jakuchū  expressed snow by using whitewash on the front and back, and thin black ink applied to the painting silk. It is a work in which a fantasy world is vividly depicted with intense colors.", artist_id=artist6.id, exhibit_id=exhibit3.id)
    installation7 = Installation(name="Bes-image of the god Hor-Asha-Khet", image_url="../src/assets/Bes-imageofthegodHor-Asha-Khet.jpg", description="This statue has the visual form known for the god Bes, but the form was actually adopted for depictions of numerous other gods, usually ones related to Horus. This association might be related to the protector role of Bes-type demons in relation to the newborn sun.", artist_id=artist7.id, exhibit_id=exhibit4.id)

    installations=[installation1,installation2,installation3,installation4,installation5,installation6,installation7]
    db.session.add_all(installations)
    db.session.commit()

    print("seeding complete!")