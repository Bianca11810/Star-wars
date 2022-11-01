"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, People, Favorites, Planets
from api.utils import generate_sitemap, APIException

# from flask_jwt_extended import create_access_token
# from flask_jwt_extended import get_jwt_identity
# from flask_jwt_extended import jwt_required


api = Blueprint('api', __name__)



@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

# get all characters
@api.route('/people', methods=['GET'])
def getAllPeople():
  people = People.query.all()
  if people is None:
    return jsonify(msg="This page does not exist")
  else:
    return jsonify(data=[person.serialize() for person in people]) 

# get one Character
@api.route('/characters/<int:id>', methods=['GET'])
def getOneCharacters(id):
  person = People.query.get(id)
  if person is None:
    return jsonify(msg="This page does not exist")
  else:
    return jsonify(data=person.serialize())

# get all planets
@api.route('/planets', methods=['GET'])
def getAllPlanets():
  planets = Planets.query.all()
  if planets is None:
    return jsonify(msg="This page does not exist")
  else:
    return jsonify(data=[planet.serialize() for planet in planets]) 

# get one planet
@api.route('/planets/<int:id>', methods=['GET'])
def getOnePlanets(id):
  planet = Planets.query.get(id)
  if planet is None:
    return jsonify(msg="This page does not exist")
  else:
    return jsonify(data=planet.serialize())

@api.route('/users', methods=['GET'])
def getAllUsers():
  user = Users.query.all()
  if user is None:
    return jsonify(msg="This page does not exist")
  else:
    return jsonify(data=[user.serialize() for user in Users]) 

# get all favorites
@api.route('/favorites', methods=['GET'])
def getAllFavorites():
  # receive the token
  # get user id through token
  favorites = getUserFavorite(1)
  favorites = [favorite.serialize() for favorite in favorites]
  return jsonify(favorites=favorites)

#add a fave
@api.route('/addfavorites', methods=['POST'])
def addFavorite():
  request_body = request.get_json()
  print(request_body)
  favorite = Favorites(fave_id = request_body["fave_id"],
                    name = request_body["name"],
                    item_type = request_body["item_type"],
                    user_id = 1)

  db.session.add(favorite)   
  db.session.commit()
  favorites = getUserFavorite(1)
  favorites = [favorite.serialize() for favorite in favorites]
  return jsonify(favorites=favorites)

# remove favorite
@api.route('/deletefav/<int:id>', methods=['DELETE'])
def removeFav(id):
  Favorites.query.filter_by(id=id).delete()
  db.session.commit()
  # return the updated list
  favorites = getUserFavorite(1)
  favorites = [favorite.serialize() for favorite in favorites]
  return jsonify(favorites=favorites)


# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.
@api.route("/login", methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    # get user from db
    # user = Users.query.filter_by(email='test')
    # print(user)
    # if not user:
    #     return jsonify({"msg": "user doesn't exist"}), 401
    # if user['password'] != password:
    #     return jsonify({"msg": "wrong password"}), 401

    if email == 'test' and password == 'test' :

      #get all favorites for user
      favorites = getUserFavorite(1)
      favorites = [favorite.serialize() for favorite in favorites]
      access_token = create_access_token(identity=email)
      return jsonify(access_token=access_token, favorites=favorites)

    return jsonify(msg="wrong user")

def getUserFavorite(id):
  favorites = Favorites.query.all()
  if favorites is None:
    return "This page does not exist"
  else:
    f = []
    for fav in favorites: 
      if fav.user_id == id:
        f.append(fav)
    return f