from typing import Union

from fastapi import FastAPI, APIRouter
from endpoints import markov

app = FastAPI()

app.include_router(markov.router)




@app.get("/")
def read_root():
    return {"Hello": "World"}

#basic query
#http://127.0.0.1:8000/items/1?q=lol
@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}