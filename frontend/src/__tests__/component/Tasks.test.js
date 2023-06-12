import '@testing-library/jest-dom'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '../../test-utils'
import Tasks from '../../component/Tasks'


describe('Tasks component', () => {
  test('default render of component', async () => {
    renderWithProviders(<Tasks tasks={[]} removeTaskHandle={()=>{}} checkTaskHandle={()=>{}}/>)
    const title = screen.getByText(/Lista de tareas/i)
    const info = screen.getByText(/Tu lista esta vacía./i)
    
    expect(title).toBeInTheDocument()
    expect(info).toBeInTheDocument()
  })

  test('render list of tasks', async () => {
    renderWithProviders(<Tasks tasks={[{id: 1, description: 'task description', active: true}]} removeTaskHandle={()=>{}} checkTaskHandle={()=>{}}/>)
    const title = screen.getByText(/Lista de tareas/i)
    const description = screen.getByText(/task description/i)
    const removeButton = screen.getByRole('button', { name: /ELIMINAR/i })
    const checkButton = screen.getByRole('checkbox')

    expect(title).toBeInTheDocument()
    expect(description).toBeInTheDocument()
    expect(checkButton).toBeInTheDocument()
    expect(removeButton).toBeInTheDocument()
  })
})
  