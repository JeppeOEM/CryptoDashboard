import { useEffect, useState } from 'react';
import { Box, Button, Grid, GridItem as ChakraGridItem } from '@chakra-ui/react';
import { GridItemSize } from '../../types/GridItemSize';
import GridItem from '../../models/GridItem';
import useGridItem from '../../hooks/useGridItem';
import CounterStore from '../../ReuseableStores/CounterStore';

// interface GridItem {
//   id: number;
//   size: GridItemSize;
// }
interface ICounterStore {
counter: number;
increment: () => void;
decrease: () => void;
reset: () => void;
}


const GridDashboard = () => {
//imposible to infer the type of the Object returned from the create method of useCounterStore
const { counter, increment, decrease, reset } = new CounterStore().useCounterStore() as unknown as ICounterStore;
  const { data: gridItemsLoad, isLoading, error } = useGridItem(); //isLoading, error from the React Query
  console.log(gridItemsLoad)
  const [gridItems, setGridItems] = useState<GridItem[]>([...gridItemsLoad || []]);
  console.log(gridItems)
  const addItem = async (size: GridItemSize) => {
    try {
      const newItem: GridItem = { id: gridItems.length, size };
      setGridItems((prevItems) => [...prevItems, newItem]);
    } catch (error) {
      console.error('Error while adding item:', error);
    }
  };

const removeItem = (id: number) => {
    setGridItems((prevItems) => prevItems.filter((item) => item.id !== id));
    decrease()
  };
  useEffect(() => {
    if (gridItemsLoad) {
      setGridItems(gridItemsLoad); // Update gridItems when gridItemsLoad is available
      increment()
      console.log(counter)
    }
  }, [gridItemsLoad]);
  // handle the API call after the state has been updated
  // to avoid double posting to the backend
  // useEffect(() => {
  //   (async () => {
  //     try {
  //       console.log(gridItems)
  //       await SectionService.create(gridItems);
  //     } catch (error) {
  //       console.error('Error while adding item:', error);
  //     }
  //   })();
  // }, [gridItems]);


  return (
    <Box>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      <Button onClick={() => addItem('small')}>Add Small Item</Button>
      <Button onClick={() => addItem('medium')}>Add Medium Item</Button>
      <Button onClick={() => addItem('large')}>Add Large Item</Button>

      <Grid templateColumns="repeat(12, 1fr)" gap={6}>
        {gridItems.map((item) => (
          <ChakraGridItem
            key={item.id}
            colSpan={item.size === 'small' ? 2 : item.size === 'medium' ? 4 : 8}
            rowSpan={item.size === 'small' ? 2 : item.size === 'medium' ? 4 : 8}
            bg="blue.500"
          ><Button onClick={() => removeItem(item.id)}> </Button>
            {item.size} item
          </ChakraGridItem>
        ))}
      </Grid>
    </Box>
  );
};

export default GridDashboard;
