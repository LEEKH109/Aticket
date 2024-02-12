from flask import Flask, request, jsonify

from recommend.service.recommend import get_recommendations

app = Flask(__name__)


@app.route('/shorts/recommend')
def recommend_shorts():
    # TODO: 실제 구현으로 변경하기
    user_id = int(request.args.get('userId') or 0)
    category = request.args.get('category')
    recommendations = get_recommendations(user_id, category)
    return jsonify(recommendations)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8083)
