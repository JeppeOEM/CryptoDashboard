import asyncio
from http.server import BaseHTTPRequestHandler, HTTPServer
import json
import pandas as pd
import psycopg2
import websockets
from binance.client import Client
import os
#gets password from docker-compose env
#passw = os.environ['PASSWORD']

#user = os.environ['USER']
client = Client()

dict_ = client.get_exchange_info()

sym = [i['symbol'] for i in dict_['symbols'] if i['symbol'].endswith('USDT')]
print(len(sym))

sym = [i.lower() + '@kline_1m' for i in sym]

stream_these = "/".join(sym)
connection = psycopg2.connect(user="postgres", password="password", host="timescaledb", port="5432", database="postgres")
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
        print(e)

    return df


async def on_message(message):
    json_message = json.loads(message)
    df = manipulate(json_message)
    print(df)
    for index, row in df.iterrows():
        query = "INSERT INTO raw_trade_data (TIME, SYMBOL, PRICE, QUANTITY) VALUES (%s, %s, %s, %s)"
        record_to_insert = (index, row[1], row[0], 23)
        try:
            cursor.execute(query, record_to_insert)
            connection.commit()
        except psycopg2.Error as e:
            print(f"Error during insertion: {e}")

async def connect():
    async with websockets.connect("wss://stream.binance.com:9443/ws/" + stream_these) as websocket:
        while True:
            message = await websocket.recv()
            await on_message(message)



class HTTPRequestHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type', 'text/html')
        self.end_headers()
        count = query_row_count()
        #needs encode because of wfile
        self.wfile.write(b"<html><body><h1>this many rows in db {}!</h1></body></html>".format(count)).encode('utf-8')

def start_http_server():
    server_address = ('0.0.0.0', 8000)
    httpd = HTTPServer(server_address, HTTPRequestHandler)
    print('HTTP server started on port 8000...')
    httpd.serve_forever()


#async def main():
    # Start WebSocket connection
#    ws_task = asyncio.create_task(connect())
    # Start HTTP server
#    start_http_server()

async def main():
    ws_task = asyncio.create_task(connect())
    http_task = asyncio.to_thread(start_http_server)

    await asyncio.gather(ws_task, http_task)

if __name__ == '__main__':
    asyncio.run(main())
