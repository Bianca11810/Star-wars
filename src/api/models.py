from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.ext.hybrid import hybrid_property
from werkzeug.security import generate_password_hash, check_password_hash
import os
import sys
from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy import create_engine

db = SQLAlchemy()

class User(db.Model):
    __tablename__ ='User'
    id = db.Column(db.Integer, primary_key = True, unique = True)
    name = db.Column(db.String(256))
    email = db.Column(db.String(256), unique = True)
    user_name = db.Column(db.String(256))
    password = db.Column(db.String(256))
    #favorites = db.Column(db.String(256))
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "user_name": self.user_name,
            #"favorites": self.favorites
            # do not serialize the password, its a security breach
        }
class Favorites(db.Model):
    __tablename__ = 'Favorites'
    id = db.Column(db.Integer, primary_key = True, unique = True)
    user_id = db.Column(db.Integer, ForeignKey('User.id'))
    fave_id = db.Column(db.Integer)
    item_type = db.Column(db.String(256))
    name = db.Column(db.String(256))

class Planets(db.Model):
    __tablename__ = 'Planets'
    id = db.Column(db.Integer, primary_key = True, unique = True)
    name = db.Column(db.String(256))
    rotation_period = db.Column(db.Integer)
    orbital_period = db.Column(db.Integer)
    diameter = db.Column(db.Integer)
    climate = db.Column(db.String(256))
    gravity = db.Column(db.String(256))
    terrain = db.Column(db.String(256))
    surface_water = db.Column(db.Integer)
    population = db.Column(db.Integer)

    def to_dict(self):
        return {}

class People(db.Model):
    __tablename__ = 'People'
    id = db.Column(db.Integer, primary_key = True, unique = True)
    name = db.Column(db.String(256))
    height = db.Column(db.Integer)
    mass = db.Column(db.Integer)
    hair_color = db.Column(db.String(256))
    skin_color = db.Column(db.String(256))
    eye_color = db.Column(db.String(256))
    birth_year = db.Column(db.String(256))
    gender = db.Column(db.String(256))

    def to_dict(self):
        return {}

# class starships(db.Model):
#      __tablename__ = 'starships'
#     id = Column(Integer, primary_key = True, unique = True)
#     name = Column(String(256)),
# 	model = Column(String(256)),
# 	manufacturer = Column(String(256)),
# 	crew = Column(Integer),
# 	passengers = Column(Integer),
# 	cargo_capacity = Column(Integer),
# 	consumables = Column(String(256)),
# 	hyperdrive_rating = Column(Integer),

#     def __repr__(self):
#         return '<User %r>' % self.username

#     def serialize(self):
#         return {
#             "id": self.id,
#             "email": self.email,
#             # do not serialize the password, its a security breach
#         }