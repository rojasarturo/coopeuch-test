import '@testing-library/jest-dom'
import { screen, fireEvent } from '@testing-library/react'
import { renderWithProviders } from '../../test-utils'
import Form from '../../component/Form'


describe('Form component', () => {
  beforeEach(() => {
    renderWithProviders(<Form handleSubmit={()=>{}}/>)
  })
  test('default render of component', async () => {
    const title = screen.getByText(/Agrega una tarea/i)
    const inputText = screen.getByRole('textbox', { name: /Descripción/i })
    const button = screen.getByRole('button', { name: /AGREGAR/i })
    expect(title).toBeInTheDocument()
    expect(inputText).toBeInTheDocument()
    expect(inputText.value).toEqual('')
    expect(button).toBeInTheDocument()
  })

  test('add new task render of component', async () => {
    const title = screen.getByText(/Agrega una tarea/i)
    const inputText = screen.getByRole('textbox', { name: /Descripción/i })
    fireEvent.input(inputText, {
        target: {
          value: 'task description'
        }
      })
    const button = screen.getByRole('button', { name: /AGREGAR/i })
    fireEvent.submit(button)

    expect(title).toBeInTheDocument()
    expect(inputText).toBeInTheDocument()
    expect(inputText.value).toEqual('task description')
    expect(button).toBeInTheDocument()
  })
})
  