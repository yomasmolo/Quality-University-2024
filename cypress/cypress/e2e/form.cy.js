describe("Rellenar el formulario usando datos de fixture", () => {
  beforeEach(() => {
    // Ignorar los errores no capturados de la aplicación que no afectan las pruebas
    cy.on("uncaught:exception", (err, runnable) => {
      // Devuelve false para evitar que Cypress falle en estos errores
      return false;
    });
    cy.visit("https://demoqa.com/automation-practice-form");
  });

  it("Debe completar y enviar el formulario con datos del fixture", () => {
    cy.fixture("formData").then((data) => {
      cy.get("#firstName").type(data.firstName);
      cy.get("#lastName").type(data.lastName);
      cy.get("#userEmail").type(data.email);
      cy.get(`input[name="gender"][value="${data.gender}"]`).check({ force: true });
      cy.get("#userNumber").type(data.mobile);

      // Asumiendo que haces un selector para escoger la fecha de nacimiento
      cy.get("#dateOfBirthInput").click();
      cy.get(".react-datepicker__month-select").select("October");
      cy.get(".react-datepicker__year-select").select("1990");
      cy.get(".react-datepicker__day--014").click();

      // Añadir asignaturas
      data.subjects.forEach((subject) => {
        cy.get("#subjectsInput").type(`${subject}{enter}`);
      });

      // Mapear el nombre del hobby a su valor
      const hobbyValueMap = {
        Sports: "1",
        Reading: "2",
        Music: "3",
      };
      // Añadir hobbies
      data.hobbies.forEach((hobby) => {
        const hobbyValue = hobbyValueMap[hobby];
        cy.get(`input[type="checkbox"][value="${hobbyValue}"]`).check({ force: true });
      });

      cy.get("#currentAddress").type(data.address);
      cy.get("#state").click().get(".css-26l3qy-menu").contains(data.state).click();
      cy.get("#city").click().get(".css-26l3qy-menu").contains(data.city).click();

      // Enviar el formulario
      cy.get("#submit").click({ force: true });

      // Verificar que el modal de confirmación aparece
      cy.get(".modal-content").should("be.visible");
    });
  });
});
