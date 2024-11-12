// __tests__/index.test.tsx
import { render, screen } from '@testing-library/react'
import Home from '../app/page'
import '@testing-library/jest-dom'

jest.mock('axios')

describe('Home', () => {
  it('renders loading state', () => {
    render(<Home />)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  // Add more tests for different states and components
})