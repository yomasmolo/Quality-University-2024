describe('Captura de elementos en el DOM - Sauce Demo', () => {
  it('Captura varios elementos usando diferentes estrategias', () => {
    // Visita la página y realiza login
    cy.visit('https://www.saucedemo.com/');
    cy.get('#user-name').type('standard_user');
    cy.get('#password').type('secret_sauce');
    cy.get('#login-button').click();
    
    // Captura por ID
    cy.get('#inventory_container').should('exist');
    
    // Captura por clase
    cy.get('.inventory_item').should('have.length', 6);
    
    // Captura por atributo 'data-*'
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    
    // Captura por texto del elemento
    cy.contains('Sauce Labs Backpack').should('be.visible');
    
    // Captura por descendencia
    cy.get('.inventory_list .inventory_item').first().should('exist');
    
    // Captura por tipo de etiqueta
    cy.get('button').contains('Add to cart').click();
    
    // Captura usando alias
    cy.get('.shopping_cart_link').as('cartIcon');
    cy.get('@cartIcon').click();
    
    // Captura por clase y contiene un texto
    cy.get('.inventory_item_name').should('contain', 'Sauce Labs Backpack');
    
    // Captura dentro de un formulario
    cy.get('#checkout').click();
    cy.get('#first-name').type('John');
    cy.get('#last-name').type('Doe');
    cy.get('#postal-code').type('12345');
    
    // Captura de un botón de envío
    cy.get('#continue').click();
  });
});
