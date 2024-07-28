from config import app
from models.artist import Artist
from models.exhibit import Exhibit
from models.installation import Installation

if __name__ == "__main__":
  app.run(port=5555, debug=True)
