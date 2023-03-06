describe("Musicians", () => {
    it("Navigate to Footer", () => {
        cy.visit("https://musofind.netlify.app/")
    })

    /* ==== Test Created with Cypress Studio ==== */
    it("Check Links", function () {
        /* ==== Generated with Cypress Studio ==== */
        cy.visit("https://musofind.netlify.app/")
        cy.get(".Footer_footerSpan__d8jNY").should(
            "contain",
            "React McReactface"
        )
        /*         cy.get(".Footer_footerText__UQsE6")
        cy.get(
            '[data-testid="youtube-link"] > [data-testid="logo-img"]'
        ).should("be.visible")
        cy.get(
            '[data-testid="twitter-link"] > [data-testid="logo-img"]'
        ).should("be.visible")
        cy.get(
            '[data-testid="instagram-link"] > [data-testid="logo-img"]'
        ).should("be.visible")
        cy.get(
            '[data-testid="facebook-link"] > [data-testid="logo-img"]'
        ).should("be.visible") */
    })
})
