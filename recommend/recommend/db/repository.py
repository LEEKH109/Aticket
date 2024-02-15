from typing import Optional

from mysql.connector.abstracts import MySQLConnectionAbstract

from recommend.data.art import Art


def get_user_art_like_count(con: MySQLConnectionAbstract) -> list[tuple[int, int, float]]:
    cur = con.cursor()
    cur.execute('''
        SELECT l.user_id, s.art_id, CAST(SUM(l.state) AS FLOAT) AS state_sum
          FROM (SELECT user_id, shorts_id, MAX(id) AS latest
                FROM likes
                GROUP BY user_id, shorts_id) AS latest_likes
          JOIN likes l
               ON latest_likes.user_id = l.user_id
               AND latest_likes.shorts_id = l.shorts_id
               AND latest_likes.latest = l.id
          JOIN shorts s
               ON latest_likes.shorts_id = s.id
         GROUP BY l.user_id, s.art_id
        HAVING state_sum > 0;''')  # [user_id, art_id, like_count]
    result = cur.fetchall()
    cur.close()
    return result


def get_user_art_order_count(con: MySQLConnectionAbstract) -> list[tuple[int, int, float]]:
    cur = con.cursor()
    cur.execute('''
        SELECT user_id, art_id, CAST(COUNT(*) AS FLOAT) AS sum_billing
          FROM billing
         GROUP BY user_id, art_id;''')  # [user_id, art_id, order_count]
    result = cur.fetchall()
    cur.close()
    return result


def get_user_art_detail_click_count(con: MySQLConnectionAbstract) -> list[tuple[int, int, float]]:
    cur = con.cursor()
    cur.execute('''
        SELECT v.user_id, s.art_id, CAST(SUM(view_detail) AS FLOAT) AS sum_detail 
          FROM viewlog v
               JOIN shorts s
               ON v.short_id = s.id 
         GROUP BY v.user_id, s.art_id;''')  # [user_id, art_id, click_count]
    result = cur.fetchall()
    cur.close()
    return result


def get_user_art_shorts_watch_time_sqrt_sum(con: MySQLConnectionAbstract) -> list[tuple[int, int, float]]:
    cur = con.cursor()
    cur.execute('''
        SELECT v.user_id, s.art_id, CAST(SUM(SQRT(view_time)) AS FLOAT) AS sum_time 
          FROM viewlog v
               JOIN shorts s
               ON v.short_id = s.id 
         GROUP BY v.user_id, s.art_id;''')  # [user_id, art_id, watch_time_sqrt_sum]
    result = cur.fetchall()
    cur.close()
    return result


def get_art_count(con: MySQLConnectionAbstract) -> int:
    cur = con.cursor()
    cur.execute('''
        SELECT COUNT(*)
          FROM arts''')
    result = cur.fetchone()
    cur.close()
    return result


def get_all_arts(con: MySQLConnectionAbstract, category: Optional[str] = None) -> list[Art]:
    cur = con.cursor()
    if category:
        cur.execute('''
            SELECT id, category
              FROM arts
             WHERE category = %s''',
                    (category,))
    else:
        cur.execute('''
            SELECT id, category
              FROM arts''')
    result = cur.fetchall()
    cur.close()
    return [Art(a[0], a[1]) for a in result]


def get_min_viewed_shorts_for_each_art(con: MySQLConnectionAbstract, user_id: int, arts: list[int]) -> list[int]:
    cur = con.cursor()
    arts_str = ','.join(map('ROW({})'.format, arts)) if len(arts) > 0 else 'ROW(-1)'
    cur.execute(f'''
        SELECT sub.id
          FROM (SELECT s.art_id, s.id,
                       ROW_NUMBER() OVER () as orn,
                       ROW_NUMBER() OVER (PARTITION BY s.art_id ORDER BY COUNT(*), RAND()) as rn
                  FROM (VALUES {arts_str}) AS input_art_ids (id)
                        LEFT JOIN shorts s
                             ON input_art_ids.id = s.art_id
                        LEFT JOIN (SELECT short_id
                                     FROM viewlog
                                    WHERE user_id = {user_id}) AS v
                             ON s.id = v.short_id
                 GROUP BY s.art_id, s.id
                 ORDER BY orn ASC) AS sub
         WHERE sub.rn = 1 AND sub.id IS NOT NULL;''')
    result = cur.fetchall()
    cur.close()
    return [row[0] for row in result]
