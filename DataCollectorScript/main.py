import json
import pandas as pd
import psycopg2
import websockets
from binance.client import Client
import logging
import time
import asyncio

# Configure logging
logging.basicConfig(filename='error.log', level=logging.ERROR)

client = Client()

dict_ = client.get_exchange_info()

sym = [i['symbol'] for i in dict_['symbols'] if i['symbol'].endswith('USDT')]
print(len(sym))

sym = [i.lower() + '@kline_1m' for i in sym]

stream_these = "/".join(sym)
connection = psycopg2.connect(user="postgres", password="password", port="5432", database="postgres")
cursor = connection.cursor()

cursor.execute("SELECT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'raw_trade_data')")
table_exists = cursor.fetchone()[0]

if not table_exists:
    cursor.execute("""
        CREATE TABLE raw_trade_data (
            TIME TIMESTAMP,
            SYMBOL VARCHAR(50),
            PRICE NUMERIC,
            QUANTITY INTEGER
        )
    """)
    connection.commit()
    print("Table 'raw_trade_data' created successfully!")

def query_row_count():
    connection = psycopg2.connect(user="postgres", password="password", host="timescaledb", port="5432", database="postgres")
    cursor = connection.cursor()
    cursor.execute("SELECT COUNT(*) FROM raw_trade_data;")
    row_count = cursor.fetchone()[0]
    print("Number of rows in raw_trade_data table:", row_count)
    return row_count
    connection.close()

def manipulate(data):
    try:
        value_dict = data['k']
        price, sym = value_dict['c'], value_dict['s']
        event_time = pd.to_datetime([data['E']], unit='ms')
        df = pd.DataFrame([[price, sym]], index=event_time)
    except Exception as e:
        logging.error(f"Error in manipulation: {e}")
        df = None

    return df

def on_message(message):
    json_message = json.loads(message)
    df = manipulate(json_message)
    if df is not None:
        print(df)
        for index, row in df.iterrows():
            query = "INSERT INTO raw_trade_data (TIME, SYMBOL, PRICE, QUANTITY) VALUES (%s, %s, %s, %s)"
            record_to_insert = (index, row[1], row[0], 23)
            try:
                cursor.execute(query, record_to_insert)
                connection.commit()
            except psycopg2.Error as e:
                logging.error(f"Error during insertion: {e}")

def connect():
    while True:
        try:
            websocket = websockets.connect("wss://stream.binance.com:9443/ws/" + stream_these)
            asyncio.get_event_loop().run_until_complete(receive(websocket))
        except Exception as e:
            logging.error(f"Error during WebSocket connection: {e}")
            # Add a delay before attempting to reconnect
            time.sleep(5)  # You can adjust the delay time as needed

async def receive(websocket):
    while True:
        message = await websocket.recv()
        on_message(message)

if __name__ == '__main__':
    connect()
