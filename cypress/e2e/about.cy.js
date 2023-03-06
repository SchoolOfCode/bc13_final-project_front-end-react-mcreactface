describe("Musicians", () => {
    it("Navigate and go to contact", () => {
        cy.visit("https://musofind.netlify.app/about")
    })

    /* ==== Test Created with Cypress Studio ==== */
    it('Visit Login', function() {
        /* ==== Generated with Cypress Studio ==== */
        cy.visit('https://musofind.netlify.app/about');
        cy.get('.about_aboutus__gyi0H').click();
        cy.get('.about_brief__BiDMT').click();
        cy.get('.about_thirdpara__jLFrc').click();
        cy.get('.about_thirdpara__jLFrc > .about_info___uK8F').click();
        /* ==== End Cypress Studio ==== */
    });
})
