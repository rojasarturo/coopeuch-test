import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'
import { screen } from '@testing-library/react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'

import { renderWithProviders } from '../../test-utils'
import MainPage from '../../pages/index'

const handlerSuccess = [
  rest.get('http://localhost:8080/task', (req, res, ctx) => {
    return res(
      ctx.json([]),
      ctx.delay(150)
    )
  })
]

const server = setupServer()

describe('Form component', () => {
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  test('default render of component', () => {
    server.use(...handlerSuccess)
    renderWithProviders(<MainPage />)
    
    const mainTitle = screen.getByText(/Coopeuch Task List/i)
    const formTitle = screen.getByText(/Agrega una tarea/i)
    const taskTitle = screen.getByText(/Lista de tareas/i)
    expect(mainTitle).toBeInTheDocument()
    expect(formTitle).toBeInTheDocument()
    expect(taskTitle).toBeInTheDocument()

  })

})
  