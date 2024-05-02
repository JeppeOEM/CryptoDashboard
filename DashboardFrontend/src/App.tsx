import './App.css';
import { Grid, GridItem } from '@chakra-ui/react';
import NavBar from './components/NavBar';
import CustomGrid from './components/CustomGrid';
import GridDashboard from './components/GridDashboard/GridDashboard';
import React from 'react';

function App() {
  return (
    <React.StrictMode>

      <Grid
        templateAreas={{
          base: '"nav" "main"',
          lg: '"nav nav" "aside main"',
        }}
      >
        <GridItem gridArea={"nav"}>
          <NavBar />
        </GridItem>
        <GridItem gridArea={"main"}>
          <CustomGrid />
        </GridItem>
        <GridDashboard />
      </Grid>
    </React.StrictMode>
  );
}

export default App;
