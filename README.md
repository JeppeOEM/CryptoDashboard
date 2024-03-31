### Semester Project in the full-stack elective


spin up a timescale database
```
docker run -d --name timescaledb -p 127.0.0.1:5432:5432 \
-e POSTGRES_PASSWORD=password timescale/timescaledb-ha:pg16
```
connect to it
```
docker exec -it timescaledb psql -U postgres
```
