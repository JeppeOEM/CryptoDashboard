import './App.css'
import { Grid, GridItem } from '@chakra-ui/react'
import NavBar from './components/NavBar'
import CustomGrid from './components/CustomGrid'
import GridDashboard from './components/GridDashboard'


function App() {

  return (<>
    <Grid
    templateAreas={{
      base: '"nav" "main"',
      lg: '"nav nav" "aside main"',
    }}>
    <GridItem gridArea={"nav"}>
      <NavBar/>
    </GridItem>
    <GridItem gridArea={"main"}>
      <CustomGrid/>
    </GridItem>
    <GridDashboard></GridDashboard>
    </Grid>
      </>
  )
}

export default App
