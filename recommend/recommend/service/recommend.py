from typing import Optional

from recommend.common.config import config
from recommend.db.connect import get_spark_session, get_mysql_connection
from pyspark.ml.recommendation import ALSModel

from recommend.db.repository import get_art_count, get_all_arts

MODEL_PATH = config['model']['path']

# Load model
spark = get_spark_session()
als_model = ALSModel.load(MODEL_PATH)

# Load default values
con = get_mysql_connection()
count = get_art_count(con)
arts = {
    None: get_all_arts(con),
    'SHOW': get_all_arts(con, 'SHOW'),
    'MUSICAL': get_all_arts(con, 'MUSICAL'),
    'PLAY': get_all_arts(con, 'PLAY')
}
con.close()


def get_recommendations(user_id: int, category: Optional[str] = None):
    recs = als_model.recommendForUserSubset(spark.createDataFrame([[user_id]], ['user_id']), count)
    if recs is not None:
        recs = map(lambda art: art.id, recs.select('recommendations').collect())
    else:
        recs = map(lambda art: art.id, arts[category])
    # TODO: art_id list -> art와 사용자 별로 조회수가 가장 적은 shorts 중 임의의 1개 선택
