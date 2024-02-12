import random
from typing import Optional, Tuple

from recommend.common.config import config
from recommend.data.art import Art
from recommend.db.connect import get_spark_session, get_mysql_connection
from pyspark.ml.recommendation import ALSModel

from recommend.db.repository import get_art_count, get_all_arts

MODEL_PATH = config['model']['path']

spark = get_spark_session('articket_app')

als_model = None
count = 0
arts = {
    None: [],
    'SHOW': [],
    'MUSICAL': [],
    'PLAY': []
}


def update_context():
    global als_model
    global count
    global arts
    (als_model, count, arts) = _load_recommendations(MODEL_PATH)


def _load_recommendations(model_path: str) -> Tuple[ALSModel, int, dict[str | None, list[Art]]]:
    # Load model
    als_model = None
    try:
        als_model = ALSModel.load(model_path)
    except:
        pass

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

    return (als_model, count, arts)


def get_recommendations(user_id: int, category: Optional[str] = None) -> list[int]:
    recs = None
    if als_model is not None:
        recs = als_model.recommendForUserSubset(spark.createDataFrame([[user_id]], ['user_id']), count)
    if recs is not None:
        recs = map(lambda art: art.id, recs.select('recommendations').collect())
    else:
        # 카테고리에서 랜덤 순서로 아트 선택
        recs = map(lambda art: art.id, random.sample(arts[category], len(arts[category])))
    # TODO: art_id list -> art와 사용자 별로 조회수가 가장 적은 shorts 중 임의의 1개 선택
    return [1, 2, 3]