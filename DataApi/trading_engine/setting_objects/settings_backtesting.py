
TIMEFRAME = {"1m": "1Min", "5m": "5Min", "15m": "15Min",
            "30m": "30Min", "1h": "1H", "4h": "4H", "12h": "12H", "1d": "D"}


CONDITIONS = {
    "dynamic": {
        "conds_buy": ["name1112221", {"ind": "RSI_15"}, {"cond": "<"}, {"val": 47}],
        "conds_sell": ["nam22221322", {"ind": "RSI_15"}, {"cond": ">"}, {"val": 51}]
    },
}

STRAT_PARAMS = {
    "dynamic": {
        "RSI_BUY": {"name": "rsi sell val", "type": int, "min": 15, "max": 55},
        "RSI_SELL": {"name": "rsi sell val", "type": int, "min": 56, "max": 80},
    },

    "obv": {
        "ma_period": {"name": "MA Period", "type": int, "min": 2, "max": 200},
    },
    "ichimoku": {
        "kijun": {"name": "Kijun Period", "type": int, "min": 2, "max": 200},
        "tenkan": {"name": "Tenkan Period", "type": int, "min": 2, "max": 200},
    },
    "sup_res": {
        "min_points": {"name": "Min. Points", "type": int, "min": 2, "max": 20},
        "min_diff_points": {"name": "Min. Difference between Points", "type": int, "min": 2, "max": 100},
        "rounding_nb": {"name": "Rounding Number", "type": float, "min": 10, "max": 500, "decimals": 2},
        "take_profit": {"name": "Take Profit %", "type": float, "min": 1, "max": 40, "decimals": 2},
        "stop_loss": {"name": "Stop Loss %", "type": float, "min": 1, "max": 40, "decimals": 2},
    },
    "sma": {
        "slow_ma": {"name": "Slow MA Period", "type": int, "min": 2, "max": 200},
        "fast_ma": {"name": "Fast MA Period", "type": int, "min": 2, "max": 200},
    },
    "psar": {
        "initial_acc": {"name": "Initial Acceleration", "type": float, "min": 0.01, "max": 0.2, "decimals": 2},
        "acc_increment": {"name": "Acceleration Increment", "type": float, "min": 0.01, "max": 0.3, "decimals": 2},
        "max_acc": {"name": "Max. Acceleration", "type": float, "min": 0.05, "max": 1, "decimals": 2},
    },
}
