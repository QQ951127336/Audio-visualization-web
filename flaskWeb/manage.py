from flask_script import Manager, Server
from main import app, db, FeelData

manager = Manager(app)
manager.add_command("server", Server())

@manager.shell
def make_shell_context():
    return dict(app=app, db=db, FeelData=FeelData)

if __name__ == "__main__":
    manager.run()