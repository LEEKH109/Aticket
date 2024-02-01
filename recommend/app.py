import configparser

import mysql.connector
from flask import Flask

app = Flask(__name__)

config = configparser.ConfigParser()
config.read('application.ini')

db = mysql.connector.connect(
    host=config['database']['host'],
    user=config['database']['user'],
    passwd=config['database']['password'],
    database=config['database']['db']
)


@app.route('/')
def index():
    return 'Hello World!'


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
