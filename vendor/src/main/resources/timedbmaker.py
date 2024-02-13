import datetime
import random

def create_full_sql_script(timetables, tickettype_info, seat_rows, seat_prices, estimated_start_id):
    filename = 'complete_timetable.sql'
    
    with open(filename, 'w') as file:
        next_timetable_id = estimated_start_id

        status_options = ['예약가능', '예약중', '예약완료']
        status_weights = [80, 10, 10]

        for timetable in timetables:
            artId = timetable["artId"]
            categoryId = timetable["categoryId"]
            start_date = datetime.datetime.strptime(timetable["start_date"], "%Y-%m-%d")
            end_date = datetime.datetime.strptime(timetable["end_date"], "%Y-%m-%d")
            show_length = timetable["show_length"]
            start_time = datetime.datetime.strptime(timetable["start_time"], "%H:%M")
            end_time = datetime.datetime.strptime(timetable["end_time"], "%H:%M")

            insert_values = []
            while start_date <= end_date:
                current_start_time = start_time
                while current_start_time + datetime.timedelta(hours=show_length) <= end_time:
                    current_end_time = current_start_time + datetime.timedelta(hours=show_length)
                    insert_values.append(f"({artId}, {categoryId}, '{start_date.strftime('%Y-%m-%d')}', '{current_start_time.strftime('%H:%M:%S')}', '{current_end_time.strftime('%H:%M:%S')}', 1)")
                    current_start_time += datetime.timedelta(hours=show_length)
                start_date += datetime.timedelta(days=1)

            if insert_values:
                file.write(f"-- timetableId {next_timetable_id} ~ {next_timetable_id + len(insert_values) - 1}\n")
                file.write("INSERT INTO timetable (art_id, category_id, date, start_time, end_time, status) VALUES\n")
                file.write(",\n".join(insert_values))
                file.write(";\n\n")
                timetable_insert_count = len(insert_values) # 삽입되는 타임테이블 행의 수

            # ticket_type 데이터 삽입
            if categoryId == 1 and artId in tickettype_info:
                tickettype_values = []
                for i in range(timetable_insert_count):
                    for user_type, price in tickettype_info[artId].items():
                        tickettype_values.append(f"({next_timetable_id + i}, '{user_type}', {price})")
                if tickettype_values:
                    file.write("INSERT INTO ticket_type (timetable_id, user_type, price) VALUES\n")
                    file.write(",\n".join(tickettype_values))
                    file.write(";\n\n")

            # seat 데이터 삽입
            if categoryId in [2, 3] and artId in seat_rows and artId in seat_prices:
                seat_insert_values = []
                for i in range(timetable_insert_count):
                    for row, type in seat_rows[artId].items():
                        for num in range(1, 9):  # 1부터 8까지 좌석 번호
                            seat_number = f"{row}{num}"
                            price = seat_prices[artId][type]
                            status = random.choices(status_options, weights=status_weights, k=1)[0]
                            seat_insert_values.append(f"({next_timetable_id + i}, '{seat_number}', '{status}', '{type}', {price})")
                if seat_insert_values:
                    file.write("INSERT INTO seat (timetable_id, seat_number, status, type, price) VALUES\n")
                    file.write(",\n".join(seat_insert_values))
                    file.write(";\n\n")

            next_timetable_id += timetable_insert_count

    return filename

# 타임테이블, 티켓 타입, 좌석 정보 예제 데이터
timetables = [
    {"artId": 1, "categoryId": 1, "start_date": "2024-03-01", "end_date": "2024-03-15", "show_length": 3, "start_time": "10:00", "end_time": "22:00"},
    {"artId": 2, "categoryId": 2, "start_date": "2024-02-01", "end_date": "2024-02-15", "show_length": 2, "start_time": "12:00", "end_time": "20:00"},
    {"artId": 3, "categoryId": 2, "start_date": "2024-02-06", "end_date": "2024-02-15", "show_length": 2, "start_time": "12:00", "end_time": "20:00"},
    {"artId": 4, "categoryId": 1, "start_date": "2024-02-11", "end_date": "2024-02-15", "show_length": 1, "start_time": "10:00", "end_time": "22:00"},
    {"artId": 5, "categoryId": 3, "start_date": "2024-02-11", "end_date": "2024-02-15", "show_length": 6, "start_time": "10:00", "end_time": "22:00"}
]

tickettype_info = {
    1: {"청소년": 5000, "성인": 10000, "유아": 1000},
    4: {"일반": 10000},
}

seat_rows = {
    2: {"A": "VIP", "B": "S", "C": "R", "D": "R"},
    3: {"A": "VIP", "B": "S", "C": "R", "D": "R"},
    5: {"A": "R", "B": "R", "C": "R", "D": "R"}
}

seat_prices = {
    2: {"VIP": 20000, "R": 15000, "S": 10000},
    3: {"VIP": 20000, "R": 15000, "S": 10000},
    5: {"R": 15000}
}

# 함수 실행으로 SQL 파일 생성
create_full_sql_script(timetables, tickettype_info, seat_rows, seat_prices, estimated_start_id=1)

print("SQL 파일이 생성되었습니다.")