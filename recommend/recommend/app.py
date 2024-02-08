from flask import Flask, request, jsonify

from recommend.db.connect import get_mysql_connection
from recommend.db.repository import *

app = Flask(__name__)


@app.route('/shorts/recommend')
def recommend_shorts():
    # TODO: 실제 구현으로 변경하기
    user_id = request.args.get('userId')
    category = request.args.get('category')
    con = get_mysql_connection()
    res = {}
    res['likes'] = get_user_art_like_count(con)
    res['orders'] = get_user_art_order_count(con)
    res['clicks'] = get_user_art_detail_click_count(con)
    res['time'] = get_user_art_shorts_watch_time_sqrt_sum(con)
    con.close()
    return jsonify([
        {'shorts_id': 1, 'art_id': 1, 'type': 'IMAGE',
         'url': 'https://img1.daumcdn.net/thumb/R1280x0/?fname=http://t1.daumcdn.net/brunch/service/user/2YQ4/image/dhMK4SAz8Z8zioLbl16pSDvsYR4.jpg'},
        {'shorts_id': 2, 'art_id': 1, 'type': 'IMAGE',
         'url': 'https://image.kkday.com/v2/image/get/w_960%2Cc_fit%2Cq_55%2Ct_webp/s1.kkday.com/product_35943/20230622023629_Dl3aG/jpg'},
        {'shorts_id': 3, 'art_id': 2, 'type': 'IMAGE',
         'url': 'https://lh3.googleusercontent.com/proxy/hKWfK7J3qEV8w76QdaZVV907_9bUV-VTtxLwA9Pfe_LrM0lhHzba0Bsy-JjMlAVbuZEKI_SZUP3hIbYxERWR3ws4T5M_Bh1-VU5Rd1SrKfCh1lpyVv-Ep6phChGaiQ'}
    ])


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000)
