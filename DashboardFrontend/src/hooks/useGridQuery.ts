import { useQuery } from "@tanstack/react-query";
import {GridItemClient} from "../services/ApiClientInstances"
import type GridItem from "../models/GridItem";
import {GridItemClass} from "../models/GridItem";

const useGridQuery = () => {
  const fetchGridItems = async () => {
    //input the id of the grid you want to fetch
    const response = await GridItemClient.getAll(238);
    console.log(response.gridConfig)
    const gridItemsData = JSON.parse(response.gridConfig);
    const gridItems = gridItemsData.map((item: GridItem) => new GridItemClass(item));
    return gridItems;
  };

  return useQuery<GridItem[], Error>({
    queryKey: ["gridItems"],
    queryFn: fetchGridItems,
  });
};

export default useGridQuery;
