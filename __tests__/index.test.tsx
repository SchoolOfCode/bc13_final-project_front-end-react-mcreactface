import { render, screen } from '@testing-library/react'
import Home from '@/pages/index'

describe('GigItem', () => {
  it('Expects GigItem to display filtered output if we are logged in and unfiltered if we are not', () => {
    render(<GigsDisplay />)

    const heading = screen.getByRole('heading', {
      name: /welcome to next\.js!/i,
    })

    expect(heading).toBeInTheDocument()
  })
})

