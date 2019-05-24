from flask_script import Manager, Server
from flask_migrate import Migrate, MigrateCommand
from main import app, db, FeelData

migrate = Migrate(app, db)

manager = Manager(app)
manager.add_command("server", Server())
manager.add_command('db', MigrateCommand)

@manager.shell
def make_shell_context():
    return dict(app=app, db=db, FeelData=FeelData)

def initData():
    db.create_all()
    data = FeelData.query.first()
    if data == None:
        data = FeelData()
        db.session.add(data)
        db.session.commit()

if __name__ == "__main__":
    initData()
    manager.run()

