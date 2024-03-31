### Semester Project in the full-stack elective
WORK IN PROGRESS

A  typescript frontend dashboard which combines diffrent python microservices and a .NET api.
It includes

- TelegramBotScript, which can buy and sell cryptocurrency directly on the blockchain based on telegrams messages.
- DataCollectorScript, collects market data from binance trading platform every second and saves it in a timescaleDB database
- DataApi a backtesting trading engine, which can optimize strategy parameters with a genetic algorithm
- .NET api api to handle everything with authentication and be the connection to the frontend

I am in the process of going through DataApi and refactoring it from flask to FastAPI, aswell as adapting it to a typescript frontend, 
instead of the basic jinja frontend it had before.

I still need to refactor and find a way to implement TelegramBotScript into the frontend

##Setup

spin up a timescaleDB database
```
docker run -d --name timescaledb -p 127.0.0.1:5432:5432 \
-e POSTGRES_PASSWORD=password timescale/timescaledb-ha:pg16
```
connect to it
```
docker exec -it timescaledb psql -U postgres
```
