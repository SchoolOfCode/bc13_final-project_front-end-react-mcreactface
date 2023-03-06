describe("Musicians", () => {
    it("Navigate and go to contact", () => {
        cy.visit("https://musofind.netlify.app/musicians")
        cy.get(".musicians_h1__LgfOz").should("contain", "Musicians")
    })
})
