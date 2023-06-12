import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'

import Paper from '@mui/material/Paper'

export default function Form ({
  handleSubmit
}) {
  return (
    <Paper elevation={3}>
    <Container component="main" maxWidth="xs">
        <Box
          sx={{
            paddingY: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
        <Typography variant="h6">
            Agrega una tarea
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="description"
            label="Descripción"
            name="description"
            autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              >
              Agregar
            </Button>
        </Box>
        </Box>
    </Container>
    </Paper>
  )
}
