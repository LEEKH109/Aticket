from configparser import ConfigParser
import os

_config = ConfigParser()
read = _config.read(os.path.join(os.path.dirname(__file__), 'config.ini'))
if len(read) == 0:
    raise Exception('Failed to read config.ini')


def get_config():
    return _config
