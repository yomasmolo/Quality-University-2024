describe("Pruebas de inicio de sesión en Zero Bank", () => {
  it("Check Home", () => {
    cy.visit("http://zero.webappsecurity.com/");
    cy.get(".active > img").should("be.visible");
  });
  it("Inicio de sesión exitoso", () => {
    cy.visit("http://zero.webappsecurity.com/login.html");

    cy.get("#user_login").type("username");
    cy.get("#user_password").type("password");
    cy.get('input[name="submit"]').click();

    cy.url().should("include", "/bank/account-summary.html");
  });

  it("Inicio de sesión fallido con credenciales incorrectas", () => {
    cy.visit("http://zero.webappsecurity.com/login.html");

    cy.get("#user_login").type("usuario_incorrecto");
    cy.get("#user_password").type("contraseña_incorrecta");
    cy.get('input[name="submit"]').click();

    cy.get(".alert-error").should("be.visible").and("contain", "Login and/or password are wrong.");
  });
});
