import { HomePage } from "../webpages/HomePage";

describe("Mock Items and works well", () => {
  const homePage = new HomePage();
  let firstRequest = false;
  beforeEach(() => {
    cy.visit("https://www.demoblaze.com/");
    firstRequest = false;
    cy.intercept("GET", "**/config.json", { fixture: "config.json" });
    cy.intercept("GET", "**/entries", { fixture: "items.json" }).as("entries");
  });

  it("TC 0 - Mocked All Items", () => {
    cy.wait("@entries").its("response.statusCode").should("eq", 200);
    cy.get("@entries").then((body) => {
      const bodyResponse = JSON.stringify(body);
      cy.wrap(bodyResponse).should("include", "Items");
    });

    homePage.items
      .list()
      .should("have.length", 3)
      .and("contain", "Samsung Mocked")
      .and("contain", "Nokia Mocked")
      .and("contain", "Nexus Mocked");

    cy.intercept("POST", "**/pagination", { fixture: "pagination.json" }).as("pagination");

    homePage.items.paginationNext().click().should("not.be.visible");
    homePage.items
      .list()
      .should("have.length", 3)
      .and("contain", "Apple Mocked")
      .and("contain", "MacBook air Mocked")
      .and("contain", "Dell Mocked");
  });

  it("TC 1 - Mocked Items on Cart", () => {
    cy.intercept("POST", "**/viewcart", { fixture: "viewcart.json" }).as("viewcart");

    cy.intercept("POST", "/view", (req) => {
      let responseBody;

      if (!firstRequest) {
        firstRequest = true;
        responseBody = {
          cat: "phone",
          desc: "The Samsung Galaxy S6 is mocked by QA Cross.",
          id: 1,
          img: "imgs/galaxy_s6.jpg",
          price: 360.0,
          title: "Samsung Mocked",
        };
      } else {
        responseBody = {
          cat: "notebook",
          desc: "1.6GHz dual-core Intel Core i5 is mocked by QA Cross.",
          id: 11,
          img: "imgs/macbook_air.jpg",
          price: 700.0,
          title: "MacBook air Mocked",
        };
      }

      req.reply({
        statusCode: 200,
        body: responseBody,
        delayMs: 1000,
      });
    });

    homePage.navbar.cart().click();
  });
});
