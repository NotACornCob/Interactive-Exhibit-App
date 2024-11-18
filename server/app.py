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
    user = User.query.order_by(User.id.desc()).first()
    new_user = user.username
    room = 'REC'
    join_room(room)
    print(new_user + ' has entered the ' + room + ' room.')
    socketio.emit('data', new_user, room='REC')

@socketio.on('review')
def handle_review():
    socketio.emit('review_data',Review.query.order_by(Review.id.desc()).first().user.username)
    print('review data sent')



@socketio.on('interact')
def handle_interact(user_id, installation_id):
    try:
        user = User.query.filter(User.id == user_id).first()
        installation = Installation.query.filter(Installation.id == installation_id).first()
        
        # Update interaction points
        user.interaction_points += 10  # or whatever point value you want
        installation.user_id = user_id
        installation.user = user
        
        db.session.commit()
        
        # Emit updated leaderboard data
        emit_updated_leaderboards()
        
        socketio.emit('interact_data', user.username)
        print(f'User {user.username} interacted and gained points')
    except Exception as e:
        print(f"Error in handle_interact: {e}")

@socketio.on('user')
def handle_user(id):
    user = User.query.filter(User.id == id).first()
    points = User.query.filter(User.id == id).first().points
    socketio.emit('user_data', {'username': user.username, 'points': points})

@socketio.on('users')
def handle_users(users):
    try:
        updated_users = []
        for user_data in User.query.all():  # Query all users directly from database
            user_dict = {
                'id': user_data.id,
                'username': user_data.username,
                'team_id': user_data.team_id,
                'points': user_data.review_points + user_data.interaction_points  # Calculate total points
            }
            updated_users.append(user_dict)
        
        # Sort users by points
        sorted_users = sorted(updated_users, key=lambda x: x['points'], reverse=True)
        print("Emitting users data:", sorted_users)  # Debug log
        socketio.emit('users_data', sorted_users)
    except Exception as e:
        print(f"Error in handle_users: {e}")

@socketio.on('teams')
def handle_teams(teams):
    try:
        updated_teams = []
        for team_data in Team.query.all():  # Query all teams directly from database
            # Calculate team points by summing all team members' points
            team_points = sum(
                user.review_points + user.interaction_points 
                for user in team_data.users
            )
            
            team_dict = {
                'id': team_data.id,
                'name': team_data.name,
                'points': team_points,
                'users': [
                    {
                        'id': user.id,
                        'username': user.username,
                        'team_id': user.team_id,
                        'points': user.review_points + user.interaction_points
                    } 
                    for user in team_data.users
                ]
            }
            updated_teams.append(team_dict)
        
        # Sort teams by points
        sorted_teams = sorted(updated_teams, key=lambda x: x['points'], reverse=True)
        print("Emitting teams data:", sorted_teams)  # Debug log
        socketio.emit('teams_data', sorted_teams)
    except Exception as e:
        print(f"Error in handle_teams: {e}")

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

# Add this function to emit updated leaderboard data
def emit_updated_leaderboards():
    # Emit updated user data
    try:
        updated_users = []
        for user_data in User.query.all():
            user_dict = {
                'id': user_data.id,
                'username': user_data.username,
                'team_id': user_data.team_id,
                'points': user_data.review_points + user_data.interaction_points
            }
            updated_users.append(user_dict)
        
        sorted_users = sorted(updated_users, key=lambda x: x['points'], reverse=True)
        socketio.emit('users_data', sorted_users)
        
        # Also update team data
        updated_teams = []
        for team_data in Team.query.all():
            team_points = sum(
                user.review_points + user.interaction_points 
                for user in team_data.users
            )
            
            team_dict = {
                'id': team_data.id,
                'name': team_data.name,
                'points': team_points,
                'users': [
                    {
                        'id': user.id,
                        'username': user.username,
                        'team_id': user.team_id,
                        'points': user.review_points + user.interaction_points
                    } 
                    for user in team_data.users
                ]
            }
            updated_teams.append(team_dict)
        
        sorted_teams = sorted(updated_teams, key=lambda x: x['points'], reverse=True)
        socketio.emit('teams_data', sorted_teams)
        
    except Exception as e:
        print(f"Error updating leaderboards: {e}")

# Similarly for reviews
@socketio.on('review')
def handle_review():
    try:
        review = Review.query.order_by(Review.id.desc()).first()
        user = review.user
        
        # Update review points
        user.review_points += 5  # or whatever point value you want
        db.session.commit()
        
        # Emit updated leaderboard data
        emit_updated_leaderboards()
        
        socketio.emit('review_data', user.username)
        print(f'User {user.username} reviewed and gained points')
    except Exception as e:
        print(f"Error in handle_review: {e}")

if __name__ == "__main__":
  socketio.run(app, port=5555, debug=True)
