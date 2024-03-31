
from data_download.data_collector import TIMEFRAME
import pandas as pd 

def resample_timeframe(data: pd.DataFrame, tf: str) -> pd.DataFrame:
    return data.resample(TIMEFRAME[tf]).agg(
        {"open": "first", "high": "max", "low": "min",
            "close": "last", "volume": "sum"}
    )