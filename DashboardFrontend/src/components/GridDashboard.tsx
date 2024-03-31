import { useState } from 'react';
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

const addItem = (size: GridItemSize) => {
  // get access to state
  setGridItems((prevItems) => {
    const newItem: DynamicGridItem = { id: prevItems.length, size };
    console.log([...prevItems, newItem]); 
    SectionService.create([...prevItems, newItem]); 

    return [...prevItems, newItem]; 
  });
};

  return (
    <Box>
      <Button onClick={() => addItem('small')}>Add Small Item</Button>
      <Button onClick={() => addItem('medium')}>Add Medium Item</Button>
      <Button onClick={() => addItem('large')}>Add Large Item</Button>

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