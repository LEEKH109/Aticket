import random
from typing import Optional, Tuple

from pyspark.ml.recommendation import ALSModel

from recommend.config import get_config
from recommend.data.art import Art
from recommend.db.connect import get_spark_session, get_mysql_connection
from recommend.db.repository import get_art_count, get_all_arts, get_min_viewed_shorts_for_each_art

MAX_RECOMMEND = 100

config = get_config()

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
    model_path = config['model']['path']
    (als_model, count, arts) = _load_recommendations(model_path)


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
    if recs is not None and len(recs) > 0:
        recs = list(map(lambda art: art.id, recs.select('recommendations').collect()))
    else:
        # 카테고리에서 랜덤 순서로 아트 선택
        recs = list(map(lambda art: art.id, random.sample(arts[category], len(arts[category]))))

    print('recs:', recs)

    con = get_mysql_connection()
    shorts = get_min_viewed_shorts_for_each_art(con, user_id, recs)
    con.close()

    return shorts[:MAX_RECOMMEND]
