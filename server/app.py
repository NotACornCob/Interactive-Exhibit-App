from config import app, send, join_room
from models.exhibit import Exhibit
from models.review import Review
from routes.exhibits import *
from routes.users import *
from routes.reviews import *
from models.installation import Installation
from routes.installations import *
from routes.teams import *
import json


""" @app.route('/')
def index():
    return render_template('socket.html')
 """
@socketio.on('connect')
def handle_connect():
    print('server side connect')


@socketio.on('message')
def handle_message(message):
    print('userdata sent')
    socketio.emit('data',User.query.order_by(User.id.desc()).first().username)

@socketio.on('review')
def handle_review():
    socketio.emit('review_data',Review.query.order_by(Review.id.desc()).first().user.username)
    print('review data sent')

@socketio.on('interact')
def handle_interact(user_id, installation_id):
    received_usernames = set()
    user = User.query.filter(User.id == user_id).first()
    points = User.query.filter(User.id == user_id).first().points
    installation = Installation.query.filter(Installation.id == installation_id).first()
    installation.user_id = user_id
    installation.user = user
    db.session.commit()
    print(installation.user_id)

    username = user.username

    if username not in received_usernames:
        socketio.emit('interact_data', username)
        received_usernames.add(username)
        print('interact data sent')

@socketio.on('user')
def handle_user(id):
    user = User.query.filter(User.id == id).first()
    points = User.query.filter(User.id == id).first().points
    socketio.emit('user_data', {'username': user.username, 'points': points})

@socketio.on('users')
def handle_users(users):
    updated_users = []

    for user in users:
        user_id = user['id']
        points = User.query.filter(User.id == user_id).first().review_points + User.query.filter(User.id == user_id).first().interaction_points
        user['points'] = points
        updated_users.append(user)
    sorted_users = sorted(updated_users, key=lambda user: user['points'], reverse=True)
    socketio.emit('users_data', sorted_users)

@socketio.on('teams')
def handle_teams(teams):
    updated_teams = []

    for team in teams:
        team_id = team['id']
        points = sum(team.points for team in Team.query.filter(Team.id == team_id).first().users)
        team['points'] = points
        updated_teams.append(team)
    sorted_teams = sorted(updated_teams, key=lambda team: team['points'], reverse=True)
    socketio.emit('teams_data', sorted_teams)

@socketio.on('disconnect')
def handle_disconnect():
    print('server side disconnect')

@socketio.on('join')
def on_join(data):
    username = data['username']
    room = data['room']
    join_room(room)
    send(username + ' has entered the room.', to=room)
""" 
@socketio.on('custom_event')
def handle_custom_event(data):
    socketio.emit ("You sent:" + data)

@socketio.on('data')
def handle_message(data):
    print("data from the front end: ", str(data))
    socketio.emit("data", {'data': data, 'id': request.sid})

@socketio.on('my event')
def handle_my_custom_event(json):
    socketio.emit('my response', json)
 """

@socketio.on('delete')
def handle_delete(data):
    print('Deleted:', data)
socketio.emit('deleted', 'Server possibly deleted your data:')

if __name__ == "__main__":
  socketio.run(app, port=5555, debug=True)
