describe('Localidades', () => {
  it('CRUD Localidades', () => {
    cy.visit('/login');
    cy.get('#email').type('admin@admin1.com'); //# sirve para buscar elementos por el id
    cy.get('#password').type('12345678');
    cy.get('button[type="submit"]').click();
    cy.url().should('not.include', '/login');

    //create
    cy.get("a[href='/localidades']").first().click();
    cy.contains('button', 'Agregar localidad').click();
    cy.get('input[placeholder="Nombre de la localidad"]').type('San Lorenz');
    cy.get('input[placeholder="Código Postal de la localidad"').type('2200');
    cy.get('button[type="submit"]').click();
    cy.contains('button', 'Cerrar').click();

    //update
    cy.get("a[href='/localidades']").first().click(); // se ve que se agrega San Lorenzo pero le falta la 'o' por lo que se edita
    cy.wait(2000);
    cy.contains('San Lorenz')
      .closest('.row')
      .contains('button', 'Editar')
      .click();
    cy.get('input[placeholder="Nombre de la localidad"]').type('o');
    cy.get('button[type="submit"]').click();
    cy.contains('button', 'Cerrar').click();

    //delete
    cy.get('a[href="/localidades"]').first().click();
    cy.wait(2000);
    cy.contains('San Lorenzo')
      .closest('.row')
      .contains('button', 'Eliminar')
      .click();
    cy.wait(2000);
    cy.get('.modal').contains('button', 'Eliminar').click();
  });
});
