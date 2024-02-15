import mysql.connector
from mysql.connector.abstracts import MySQLConnectionAbstract
from mysql.connector.pooling import PooledMySQLConnection
from pyspark.sql import SparkSession

from recommend.config import get_config


def get_mysql_connection() -> PooledMySQLConnection | MySQLConnectionAbstract:
    return mysql.connector.connect(**get_config()['database'])


def get_spark_session(name: str) -> SparkSession:
    return SparkSession.builder.appName(name).getOrCreate()
