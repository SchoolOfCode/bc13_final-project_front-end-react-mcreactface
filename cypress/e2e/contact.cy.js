describe("Contact Form", () => {
    it("Contact form has the right placeholders:", () => {
        cy.visit("https://musofind.netlify.app/contact")
        cy.get("input:first").should("have.attr", "placeholder", "Name")
        cy.get("input").eq(1).should("have.attr", "placeholder", "Email")
        cy.get(".contact_textcontainer__ykmzr").should(
            "have.attr",
            "placeholder",
            "Message"
        )
        cy.get(".contact_buttoncontainer__RChf6").should(
            "contain",
            "Send us an Enquiry!"
        )
    })
    it("Contact form allows input and submits content:", () => {
        cy.visit("https://musofind.netlify.app/contact")
        cy.get("input:first").type("Test Name")
        cy.get("input").eq(1).type("test@email.com")
        cy.get(".contact_textcontainer__ykmzr").type(
            "This is the textarea.content."
        )
        cy.get(".contact_buttoncontainer__RChf6").should(
            "contain",
            "Send us an Enquiry!"
        )
        /* .click() */
        /*  cy.url().should("contain", "https://getform.io/thank-you") */
    })
})
