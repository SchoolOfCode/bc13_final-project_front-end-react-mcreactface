import { render, screen } from '@testing-library/react'
//import Home from '../pages/portal';
import { getGigs, getGig } from "../methods/musicians.js"
import '@testing-library/jest-dom';


describe('Database is serving data', () => {
    it('getGigs returns multiple entries', async () => {
        let result = await getGigs()
        console.log(result);
        })
})

/*
describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />)

    const heading = screen.getByRole('heading', {
      name: /welcome to next\.js!/i,
    })

    expect(heading).toBeInTheDocument()
  })
});
*/