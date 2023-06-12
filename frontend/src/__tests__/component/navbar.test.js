import '@testing-library/jest-dom'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '../../test-utils'
import Navbar from '../../component/Navbar'


describe('Navbar compoenent', () => {
  beforeEach(() => {
    renderWithProviders(<Navbar />)
  })
  test('title coopeuch tast list', async () => {
    const title = screen.getByText(/Coopeuch Task List/i)
    expect(title).toBeInTheDocument()
  })
})
  