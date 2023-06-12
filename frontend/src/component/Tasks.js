import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import ListItem from '@mui/material/ListItem'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'

export default function TodosMap ({
  tasks,
  removeTaskHandle,
  checkTaskHandle
}) {
  return (
    <Paper elevation={2}>
    <Container component="main" maxWidth="xs">
        <Box
          sx={{
            paddingY: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
      <Typography variant="h6">Lista de tareas</Typography>
      <Grid item xs={6}>
        {
          tasks.length === 0 && (
            <Alert severity="info">Tu lista esta vacía.</Alert>
          )
        }

          {tasks.map((item) => (
            <ListItem key={item.id} elevation={12}>
              <Checkbox
                checked={!!item.active}
                onClick={(e) => checkTaskHandle(item.id)}
                sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
              />

              <span className="lead">
                {item.active ? <s> {item.description}</s> : item.description}
              </span>
              {'       '}
              <Button
                onClick={(e) => removeTaskHandle(item.id)}
                className="btn btn-danger btn-sm float-end mt-3 mx-2"
              >
                Eliminar
              </Button>
            </ListItem>
          ))}
      </Grid>
    </Box>
    </Container>
    </Paper>
  )
}
