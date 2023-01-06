import { render, screen } from '@testing-library/react'
//import Home from '../pages/portal';
import { getGigs, getGig } from "../methods/gigs.js"
import '@testing-library/jest-dom';


describe('Database serves data as expected', () => {
    it('getGigs returns multiple entries', async () => {
        let result = await getGigs()
        expect(result.rows.length).toBeGreaterThan(1);
    })

    it('getGig returns a single entry', async () => {
        let result = await getGig("1")
        expect(result.rows.length).toBe(1);
    })

    it('getGig called with a non-number fails', async () => {
        let result;
        result = getGig("a")
        expect(result = await getGig("a")).toThrow("invalid input syntax for type bigint:")
        console.log("result: ",result);
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