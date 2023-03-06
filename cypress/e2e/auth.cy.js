describe("Sign In / Sign Out", () => {
    it("Sign In", function () {
        cy.visit("https://musofind.netlify.app/login")
        cy.get(":nth-child(1) > .supabase-ui-auth_ui-input").type(
            "tirsog@gmail.com"
        )
        cy.get(":nth-child(2) > .supabase-ui-auth_ui-input").type(
            "6#Hl#tO4hSDt"
        )
        cy.get(
            "#auth-sign-in > :nth-child(1) > .supabase-ui-auth_ui-button"
        ).click()
        cy.get(":nth-child(8) > a").should("contain", "Sign Out")
    })

    it("Edit Profile", function () {
        cy.visit("https://musofind.netlify.app/login")
        cy.get(":nth-child(1) > .supabase-ui-auth_ui-input").type(
            "tirsog@gmail.com"
        )
        cy.get(":nth-child(2) > .supabase-ui-auth_ui-input").type(
            "6#Hl#tO4hSDt"
        )
        cy.get(
            "#auth-sign-in > :nth-child(1) > .supabase-ui-auth_ui-button"
        ).click()
        /* ==== Generated with Cypress Studio ==== */
        cy.get('#bass').check();
        cy.get(':nth-child(16) > .button').click();
        cy.get(':nth-child(16) > .button').click();
        /* ==== End Cypress Studio ==== */
        /* ==== Generated with Cypress Studio ==== */
        cy.get('#bass').uncheck();
        cy.get(':nth-child(16) > .button').click();
        /* ==== End Cypress Studio ==== */
    })

    it("Sign Out", function () {
        cy.visit("https://musofind.netlify.app/login")
        cy.get(":nth-child(1) > .supabase-ui-auth_ui-input").type(
            "tirsog@gmail.com"
        )
        cy.get(":nth-child(2) > .supabase-ui-auth_ui-input").type(
            "6#Hl#tO4hSDt"
        )
        cy.get(
            "#auth-sign-in > :nth-child(1) > .supabase-ui-auth_ui-button"
        ).click()
        cy.get(":nth-child(8) > a").click()
        cy.get(":nth-child(8) > a").should("contain", "Sign Out")
    })
})
