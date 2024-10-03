describe("Blog app", function () {
  beforeEach(function () {
    cy.visit("http://localhost:5173");
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "Adolfo",
      username: "Xkry",
      password: "fofito",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);
  });

  it("Login form is shown", function () {
    cy.contains("login");
    cy.contains("username");
    cy.contains("password");
  });

  it("succeeds with correct credentials", function () {
    cy.get('[id="username"]').type("Xkry");
    cy.get('[id="password"]').type("fofito");
    cy.get('[id="login-button"]').click();
    cy.contains("Xkry is logged.");
  });

  it("fails with wrong credentials", function () {
    cy.get('[id="username"]').type("Xkry");
    cy.get('[id="password"]').type("wrong");
    cy.get('[id="login-button"]').click();
    cy.contains("Wrong credentials").should(
      "have.css",
      "color",
      "rgb(255, 0, 0)"
    );
  });

  describe("Login use", function () {
    beforeEach(function () {
      cy.visit("http://localhost:5173");
      cy.request("POST", "http://localhost:3003/api/testing/reset");
      const user = {
        name: "Adolfo",
        username: "Xkry",
        password: "fofito",
      };
      cy.request("POST", "http://localhost:3003/api/users/", user);
      cy.get('[id="username"]').type("Xkry");
      cy.get('[id="password"]').type("fofito");
      cy.get('[id="login-button"]').click();
    });

    it("logged user can create blogs", function () {
      cy.contains("create new blog").click();
      cy.get('[name="Title"]').type("Blog test");
      cy.get('[name="Author"]').type("Xkry");
      cy.get('[name="Url"]').type("www.test.com");
      cy.get('[id="create-button"]').click();
      cy.contains("Blog test Xkry");
    });

    describe("created blog", function () {
      beforeEach(function () {
        cy.contains("create new blog").click();
        cy.get('[name="Title"]').type("Blog test");
        cy.get('[name="Author"]').type("Xkry");
        cy.get('[name="Url"]').type("www.test.com");
        cy.get('[id="create-button"]').click().wait(500);
      });

      it("logged user can like blogs", function () {
        cy.get('[id="view-button"]').click();
        cy.get('[id="like-button"]').click();
        cy.contains("Likes 1");
      });

      it("logged user can delete blogs", function () {
        cy.get('[id="view-button"]').click();
        cy.get('[id="delete-button"]').click();
        cy.contains("Blog test Xkry").should("not.exist");
        cy.contains("Blog Blog test removed");
      });

      it("not creator user can't see the delete button in blogs", function () {
        const user = {
          name: "Adolfo2",
          username: "Xkry2",
          password: "fofito2",
        };
        cy.request("POST", "http://localhost:3003/api/users/", user);
        cy.contains("Logout").click();
        cy.get('[id="username"]').type("Xkry2");
        cy.get('[id="password"]').type("fofito2");
        cy.get('[id="login-button"]').click();
        cy.contains("Xkry2 is logged.");
        cy.get('[id="view-button"]').click();
        cy.get('[id="delete-button"]').should("not.exist");
      });

      it("the order of the blogs is for the most likes blog", function () {
        cy.get('[name="Title"]').type("Blog test2");
        cy.get('[name="Author"]').type("Xkry");
        cy.get('[name="Url"]').type("www.test2.com");
        cy.get('[id="create-button"]').click().wait(500);

        cy.get('[id="blog"]').contains("Blog test2").find("button").click();
        cy.get('[id="like-button"]').click().wait(500).click();

        cy.get('[id="blog"]').eq(0).should("contain", "Blog test2");
        cy.get('[id="blog"]').eq(1).should("contain", "Blog test");
      });
    });
  });
});
