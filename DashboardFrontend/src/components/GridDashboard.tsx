import { useEffect, useState } from 'react';
import { Box, Button, Grid, GridItem } from '@chakra-ui/react';

import SectionService from '../services/SectionService';
import { GridItemSize } from '../types/GridItemSize';
import DynamicGridItem from '../models/DynamicGridItem';

// interface DynamicGridItem {
//   id: number;
//   size: GridItemSize;
// }

const GridDashboard = () => {
  const [gridItems, setGridItems] = useState<DynamicGridItem[]>([]);

const addItem = async (size: GridItemSize) => {
  try {
    const newItem: DynamicGridItem = { id: gridItems.length, size };
    setGridItems((prevItems) => [...prevItems, newItem]);
  } catch (error) {
    console.error('Error while adding item:', error);
  }
  };

  // handle the API call after the state has been updated
  // to avoid double posting to the backend
  useEffect(() => {
    (async () => {
      try {
        await SectionService.create(gridItems);
      } catch (error) {
        console.error('Error while adding item:', error);
      }
    })();
  }, [gridItems]);

  const handleAddSmallItem = () => addItem('small');
  const handleAddMediumItem = () => addItem('medium');
  const handleAddLargeItem = () => addItem('large');

  return (
    <Box>
      <Button onClick={handleAddSmallItem}>Add Small Item</Button>
      <Button onClick={handleAddMediumItem}>Add Medium Item</Button>
      <Button onClick={handleAddLargeItem}>Add Large Item</Button>

      <Grid templateColumns="repeat(12, 1fr)" gap={6}>
        {gridItems.map((item) => (
          <GridItem
            key={item.id}
            colSpan={item.size === 'small' ? 2 : item.size === 'medium' ? 4 : 8}
            rowSpan={item.size === 'small' ? 2 : item.size === 'medium' ? 4 : 8}
            bg="blue.500"
          >
            {item.size} item
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};

export default GridDashboard;