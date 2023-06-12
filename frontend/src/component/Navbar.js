import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'

export default function Navbar () {
  return (
    <AppBar position="static">
      <Container>
        <Toolbar disableGutters>
          <Typography variant="h5" align="center">Coopeuch Task List</Typography>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
