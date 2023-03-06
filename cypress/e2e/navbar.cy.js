describe("template spec", () => {
    it("passes", () => {
        cy.visit("https://musofind.netlify.app/")
        cy.get(".Navbar_logotitle__t_W4S > a > img").should("be.visible")
        cy.get(".Navbar_logotitle__t_W4S > p").should("contain", "Musofind")
        cy.get(":nth-child(1) > a").should("contain", "Home")
        cy.get(":nth-child(2) > a").should("contain", "Gigs")
        cy.get(":nth-child(3) > a").should("contain", "Musicians")
        cy.get(":nth-child(4) > a").should("contain", "About")
        cy.get(":nth-child(5) > a").should("contain", "Contact")
        cy.get(":nth-child(6) > a").should("contain", "Login")
    })
})
