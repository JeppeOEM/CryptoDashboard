import { useEffect, useState } from 'react';
import { Box, Button, Grid, GridItem as ChakraGridItem } from '@chakra-ui/react';
import SectionService from '../services/SectionService';
import { GridItemSize } from '../types/GridItemSize';
import GridItem from '../models/GridItem';
import useGridItem from '../hooks/useGridItem';


// interface GridItem {
//   id: number;
//   size: GridItemSize;
// }

const GridDashboard = () => {
  const { data: gridItems, isLoading, error } = useGridItem();

  // const [gridItems, setGridItems] = useState<GridItem[]>([]);

  const addItem = async (size: GridItemSize) => {
    try {
      const newItem: GridItem = { id: gridItems.length, size };
      setGridItems((prevItems) => [...prevItems, newItem]);
    } catch (error) {
      console.error('Error while adding item:', error);
    }
  };

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

  const handleAddSmallItem = () => addItem('small');
  const handleAddMediumItem = () => addItem('medium');
  const handleAddLargeItem = () => addItem('large');

  return (
    <Box>
      {isLoading && <p>Loading...</p>}
      
      {error && <p>Error: {error.message}</p>}

      <Button onClick={handleAddSmallItem}>Add Small Item</Button>
      <Button onClick={handleAddMediumItem}>Add Medium Item</Button>
      <Button onClick={handleAddLargeItem}>Add Large Item</Button>

      <Grid templateColumns="repeat(12, 1fr)" gap={6}>
        {gridItems.map((item) => (
          <ChakraGridItem
            key={item.id}
            colSpan={item.size === 'small' ? 2 : item.size === 'medium' ? 4 : 8}
            rowSpan={item.size === 'small' ? 2 : item.size === 'medium' ? 4 : 8}
            bg="blue.500"
          >
            {item.size} item
          </ChakraGridItem>
        ))}
      </Grid>
    </Box>
  );
};

export default GridDashboard;
