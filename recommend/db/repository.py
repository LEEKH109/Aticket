from mysql.connector.abstracts import MySQLConnectionAbstract


def get_user_art_like_count(con: MySQLConnectionAbstract) -> list[tuple[int, int, int]]:
    cur = con.cursor()
    cur.execute("")  # [user_id, art_id, like_count]
    result = cur.fetchall()
    cur.close()
    return result


def get_user_art_order_count_sqrt(con: MySQLConnectionAbstract) -> list[tuple[int, int, int]]:
    cur = con.cursor()
    cur.execute("")  # [user_id, art_id, order_count_sqrt]
    result = cur.fetchall()
    cur.close()
    return result


def get_user_art_detail_click_rate(con: MySQLConnectionAbstract) -> list[tuple[int, int, float]]:
    cur = con.cursor()
    cur.execute("")  # [user_id, art_id, click_rate]
    result = cur.fetchall()
    cur.close()
    return result


def get_user_art_shorts_watch_time_sqrt_sum(con: MySQLConnectionAbstract) -> list[tuple[int, int, float]]:
    cur = con.cursor()
    cur.execute()  # [user_id, art_id, watch_time_sqrt_sum]
    result = cur.fetchall()
    cur.close()
    return result
