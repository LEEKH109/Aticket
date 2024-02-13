from flask import Flask, request, jsonify

from recommend.service.recommend import get_recommendations, update_context

app = Flask(__name__)


@app.route('/shorts/recommend')
def recommend_shorts():
    user_id = int(request.args.get('userId') or 0)
    category = request.args.get('category')
    recommendations = get_recommendations(user_id, category)
    return jsonify(recommendations)


@app.route('/recommend/update')
def update_recommendations():
    update_context()


if __name__ == '__main__':
    update_context()
    app.run(host='0.0.0.0', port=8083)
