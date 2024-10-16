export class HomePage {
  // Elements
  navbar = {
    home: () => cy.contains("a", "Home "),
    contact: () => cy.get('[data-target="#exampleModal"]'),
    aboutUs: () => cy.get('[data-target="#videoModal"]'),
    cart: () => cy.get("#cartur"),
    login: () => cy.get("#login2"),
    signUp: () => cy.get("#signin2"),
  };

  categories = {
    container: () => cy.get("#contcont .list-group"),
    phones: () => this.categories.container().get(`[onclick="byCat('phone')"]`),
    laptops: () => this.categories.container().get(`[onclick="byCat('notebook')"]`),
    monitors: () => this.categories.container().get(`[onclick="byCat('monitor')"]`),
  };
  items = {
    list: () => cy.get("#tbodyid .col-lg-4"),
    paginationNext: () => cy.get(".pagination #next2"),
  };
  // Functions
  clickOnNavbar(button) {
    button.should("exist").and("be.visible");
    button.click();
  }

  clickOnCategory(category) {
    category.should("exist").and("be.visible");
    category.click();
  }
}
