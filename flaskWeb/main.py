from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from config import DevConfig

app = Flask(__name__)
app.config.from_object(DevConfig)
db = SQLAlchemy(app)

@app.route('/')
def home():
    return '<h1>Hello World!</h1>'

if __name__ == '__main__':
    app.run()

class FeelData(db.Model):
    __tablename__ = 'feel_data'
    id = db.Column(db.Integer(), primary_key=True)
    dislike = db.Column('dislike', db.Integer())
    like = db.Column('like', db.Integer())

    def __init__(self):
        self.dislike = 0
        self.like = 0

    def __repr__(self):
        return "<Data '{} {}'>".format(self.like, self.dislike)