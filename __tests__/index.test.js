import { render, screen } from "@testing-library/react"
import Home from "../pages/index"
import "@testing-library/jest-dom"

import nock from "nock"

const scope = nock("https://api.github.com")
    .get("/repos/atom/atom/license")
    .reply(200, {
        license: {
            key: "mit",
            name: "MIT License",
            spdx_id: "MIT",
            url: "https://api.github.com/licenses/mit",
            node_id: "MDc6TGljZW5zZTEz",
        },
    })
/*
describe("GigsDisplay", () => {
    it("renders a heading", () => {
        render(<Home />)

        const heading = screen.getByRole("heading", {
            name: /MusoFind/i,
        })

        expect(heading).toBeInTheDocument()
    })
})
*/
describe("GigsDisplay", () => {
    test("renders a heading", () => {
        render(<Home />)

        const heading = screen.getByRole("heading", {
            name: /MusoFind/i,
        })

        expect(heading).toBeInTheDocument()
    })
})
