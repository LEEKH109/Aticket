import requests
from pyspark.ml.recommendation import ALS
from pyspark.sql.functions import lit
from pyspark.sql.types import StructType, StructField, IntegerType, FloatType

from recommend.config import get_config
from recommend.db.connect import get_mysql_connection, get_spark_session
from recommend.db.repository import (
    get_user_art_detail_click_count,
    get_user_art_like_count,
    get_user_art_order_count,
    get_user_art_shorts_watch_time_sqrt_sum)

LIKE_COUNT_WEIGHT = 1.0
ORDER_COUNT_WEIGHT = 0.5
CLICK_RATE_WEIGHT = 0.1
WATCH_TIME_WEIGHT = 0.1

config = get_config()


def train():
    spark = get_spark_session('articket_train')
    con = get_mysql_connection()

    schema = StructType([
        StructField('user_id', IntegerType()),
        StructField('art_id', IntegerType()),
        StructField('rating', FloatType()),
    ])

    like_count_df = (spark.createDataFrame(get_user_art_like_count(con), schema)
                     .withColumn('weight', lit(LIKE_COUNT_WEIGHT)))
    order_count_df = (spark.createDataFrame(get_user_art_order_count(con), schema)
                      .withColumn('weight', lit(ORDER_COUNT_WEIGHT)))
    click_rate_df = (spark.createDataFrame(get_user_art_detail_click_count(con), schema)
                     .withColumn('weight', lit(CLICK_RATE_WEIGHT)))
    watch_time_df = (spark.createDataFrame(get_user_art_shorts_watch_time_sqrt_sum(con), schema)
                     .withColumn('weight', lit(WATCH_TIME_WEIGHT)))

    union_df = like_count_df.union(order_count_df).union(click_rate_df).union(watch_time_df)

    als = ALS(maxIter=5, regParam=0.01, userCol='user_id', itemCol='art_id', ratingCol='rating', implicitPrefs=True,
              coldStartStrategy='drop')
    als_model = als.fit(union_df)
    als_model.write().overwrite().save(config['model']['path'])

    con.close()
    spark.stop()


if __name__ == "__main__":
    print('Training start')
    train()
    print('Training done')
    try:
        response = requests.post(config['model']['update'])
        if response.status_code // 100 == 2:
            print('update success')
        else:
            print('update fail: non-success response code')
    except:
        print('update fail: Cannot connect to main server')
