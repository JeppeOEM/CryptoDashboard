

from database.db import get_db
import json
from trading_engine.Backtest import Backtest
from trading_engine.Strategy import Strategy
from trading_engine.call_optimizer import call_optimizer
from trading_engine.process_conds import process_conds
import pickle
import pandas as pd

import json
from pydantic import BaseModel
import pandas as pd
from typing import List, Union
from fastapi import APIRouter, HTTPException
router = APIRouter()



@router.get('/get_optimizer_params/', tags=["optimization"])
async def get_optimizer_param(user_id: int, condition_id: int, strategy_id: int, side: Union[str, None] = None):
    try:
        db = get_db()
        params = db.execute(
            'SELECT * FROM {} WHERE fk_strategy_id = ? AND fk_user_id = ? AND fk_condition_id = ? AND side = ?',
            (strategy_id, user_id, condition_id, side)
        ).fetchone()
        print(dict(params), "PARAMS")
        if params:
            return dict(params)
        else:
            raise HTTPException(status_code=404, detail="Params not found")
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))


class OptiData(BaseModel):
    user_id: int
    condition_id: int
    strategy_id: int
    params: str
    params_class: str
    


@router.post('/optimizer_params/', tags=['optimization'])
def optimizer_params(opti_data: OptiData):
    db = get_db()

    params = opti_data.params
    params_class = opti_data.params_class
    user_id = opti_data.user_id
    strategy_id = opti_data.strategy_id
    # fk_list_id = data['fk_list_id']
    # list_row = data['list_row']
    list_row = 1
    try:
        for param in params:
            name, operator, data_type, opti_min, opti_max, side, fk_list_id, fk_condition_id = param
            fk_list_id = int(fk_list_id)


            exist_query = db.execute(
                'SELECT 1 FROM optimization_params WHERE fk_strategy_id = ? AND fk_condition_id = ? AND fk_user_id = ? AND side = ?',
                (id, fk_condition_id, user_id, side)
            )

            exist = exist_query.fetchone()

            if exist:
                db.execute(
                    'UPDATE optimizations_params SET optimization_name = ?, operator = ?, data_type = ?, optimization_min = ?, optimization_max = ?, fk_list_id = ?, list_row = ? '
                    'WHERE fk_strategy_id = ? AND fk_condition_id = ? AND fk_user_id = ? AND side = ?',
                    (name, operator, data_type, opti_min, opti_max,
                     fk_list_id, list_row, strategy_id, fk_condition_id, user_id, side)
                )
            else:
                db.execute(
                    'INSERT INTO optimizations_params '
                    '(fk_strategy_id, fk_user_id, optimization_name, data_type, class, operator, '
                    'optimization_min, optimization_max, fk_list_id, list_row, fk_condition_id, side) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                    (strategy_id, user_id, name, data_type, params_class,
                     operator, opti_min, opti_max, fk_list_id, list_row, fk_condition_id, side)
                )

        db.commit()
        return {'message': 'optimization saved/updated'}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))


class OptiParams(BaseModel):
    user_id: int
    strategy_id: int
    name: str
    candles: int
    exchanges: List[str]
    

@router('/optimize/', tags=['optimization'])
def optimize(opti_params: OptiParams):
    try:
        exchanges = opti_params.exchanges
        candles = opti_params.candles
        # symbol = data['symbol']
        name = opti_params.name
        strategy_id = opti_params.strategy_id
        # s = Strategy(exchange, init_candles, symbol, name, description)
        # s.addIndicators([
        #     {"kind": "rsi", "length": 15},
        # ])

        # df = s.create_strategy()
        df = pd.read_pickle(f"data/pickles/{name}.pkl")
        # params: df, pop_size, generations, strategy_id
        optimization_result = call_optimizer(df, 5, 5, strategy_id)
        result_json = json.dumps(optimization_result)
        db = get_db()
        db.execute(
            'INSERT INTO optimization_results'
            '(fk_strategy_id, fk_user_id, result) VALUES (?, ?, ?)',
            (strategy_id, g.user['id'], result_json)
        )
        db.commit()
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))

    print(optimization_result)

    # columns = s.column_dict()

    return {"message": "optimization complete"}

class OptiResults(BaseModel):
    strategy_id: int
    user_id: int


@router('/optimization_results/', tags=['optimization'])
def optimization_results(opti_result: OptiResults):
    strategy_id = opti_result.strategy_id
    user_id = opti_result.user_id
    db = get_db()
    rows = db.execute(
        'SELECT * FROM optimization_results '
        'WHERE fk_strategy_id = ? AND fk_user_id = ? '
        'ORDER BY optimization_result_id DESC',
        (strategy_id, user_id)
    ).fetchall()

    result_list = [dict(row) for row in rows]

    return result_list


class Backtest(BaseModel):
    id: int
    name: str

@router.post('/backtest/', tags=["optimization"])
def backtest(backtest: Backtest):
    id = backtest.id
    name = backtest.name
    buy, sell = get_conds(id)
    print(buy, sell)
    # selected_conds_buy = data['conds_buy']
    buy[0].insert(0, "b")
    # selected_conds_sell = data['conds_sell']
    sell[0].insert(0, "s")
    df = pd.read_pickle(f"data/pickles/{name}.pkl")

    df = process_conds(df, buy, sell)
    # df_bytes = pickle.dumps(df)
    # cache.set('df_cache_key', df_bytes)
    df.to_pickle(f"data/pickles/{name}.pkl")

    print("start backtest")
    bt = Backtest()
    result = bt.run(df)
    json_string = {"message": f'{result}'}
    return json_string
