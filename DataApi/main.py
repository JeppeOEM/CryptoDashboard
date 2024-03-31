from typing import Union

from fastapi import FastAPI, APIRouter
from endpoints import markov
from endpoints import optimize

app = FastAPI()

app.include_router(markov.router)
app.include_router(optimize.router)




@app.get("/")
def read_root():
    return {"Hello": "World"}

