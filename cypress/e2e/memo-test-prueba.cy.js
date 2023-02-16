const URL = "http://127.0.0.1:8080/";
const CANTIDAD_FICHAS = 12;

context("MemoTest", () => {
  before(() => {
    cy.visit(URL);
  })


  describe("Pruebas previas a jugar", () => {
    it("Verifica que el panel de inicio sea visible", () => {
      cy.get("#panel-inicio").should("be.visible");
    });

    it("Verifica que Al clickear jugar, se oculte el panel de inicio", () => {
      cy.get("#jugar").click();
      cy.get("#panel-inicio").should("be.hidden");
    });

    it("Verifica que hayan 12 fichas visibles en el tablero de juego", () => {
      cy.get("#tablero-juego .ficha").then(($fichas) => {
        cy.get($fichas).should("have.length", CANTIDAD_FICHAS);
        $fichas.each((indice,$ficha) => {
          cy.get($ficha).should("be.visible");
        })
      });
    });

    it("Verifica que las fichas tengan aleatoriedad", () => {
      let fichasActuales = obtenerFichas();
      cy.visit(URL);
      cy.get("#jugar").click();
      let fichasNuevas = obtenerFichas();
      
      cy.wrap(fichasActuales).should("be.not.deep.equal", fichasNuevas);
    });
  });
  
  describe("Pruebas de resolución del juego", () => {
    let paresDeFichasOrdenados;
    it("Verifica que se tapen las fichas al elegir 2 diferentes", () => {
      
    });

    it("Verifica que se oculten las fichas si se eligen 2 iguales", () => {

    });

    it("Resuelve el juego y comprueba que se vea la notificación al ganar", () => {
      
    });
  });
  
});

function obtenerFichas(){
  let fichas = [];
  cy.get("#tablero-juego .ficha").then(($fichas) => {
    $fichas.each((indice,$ficha) => {
      fichas.push($ficha);
    });
  })

  return fichas;
}
