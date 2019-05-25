#! /usr/bin python3
from flask import Flask, render_template, request
from flask_sqlalchemy import SQLAlchemy
from config import DevConfig

app = Flask(__name__)
app.config.from_object(DevConfig)
db = SQLAlchemy(app)

@app.route('/')
def home():
    tmpData = FeelData.query.first()
    return render_template('index.html',
                           like=tmpData.like,
                           dislike=tmpData.dislike
                           )

@app.route('/vote', methods=['GET', 'POST'])
def vote():
    if request.method == 'POST':
        data = request.form.get('option')
        tmpData = FeelData.query.first()
        print("data :",data, " tmpData :", tmpData)
        if(data == '0'):
            FeelData.query.filter_by(id=1).update({'like': tmpData.like+1})
        elif(data == '1'):
            FeelData.query.filter_by(id=1).update({'dislike': tmpData.dislike + 1})
        db.session.commit()
    return ''


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)

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