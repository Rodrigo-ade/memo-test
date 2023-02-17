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
    let fichas;
    let paresDeFichasOrdenados;

    it("Verifica que se tapen las fichas al elegir 2 diferentes", () => {
     fichas = obtenerFichas();
     cy.get(fichas).then((fichas) =>{
      paresDeFichasOrdenados = ordernarFichas(fichas);
     }).then(() => {
        cy.get(paresDeFichasOrdenados[0][0]).click();
        cy.get(paresDeFichasOrdenados[1][0]).click();
        cy.get(paresDeFichasOrdenados[0][0]).should("have.class", "tapada");
        cy.get(paresDeFichasOrdenados[1][0]).should("have.class", "tapada");
      });
    });

    it("Verifica que se oculten las fichas si se eligen 2 iguales", () => {
      cy.get(paresDeFichasOrdenados[0][0]).click();
      cy.get(paresDeFichasOrdenados[0][1]).click();
      cy.get(paresDeFichasOrdenados[0][0]).should("have.class", "encontrada");
      cy.get(paresDeFichasOrdenados[0][1]).should("have.class", "encontrada");
    });

    it("Resuelve el juego y comprueba que el tablero se oculte al ganar", () => {
      paresDeFichasOrdenados.forEach(($parDeFichasOrdenado,index) => {
        if(index > 0){
          cy.get($parDeFichasOrdenado[0]).click();
          cy.get($parDeFichasOrdenado[1]).click();
          cy.wait(600);
        }
      });
      cy.get("#tablero-juego").should("be.hidden");
    });

    it("Verifica que al ganar se vea ¡Ganaste! con el nº de movimientos", () => {
      cy.get("#titulo").contains(`Has ganado en ${(fichas.length / 2 + 1)} movimientos! presiona jugar para volver a jugar.`);
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

function ordernarFichas($fichas){
  let paresFichasOrdenados = {};
  $fichas.each((indice,$ficha) => {
    let colorFicha = $ficha.classList[2];
    if(paresFichasOrdenados[colorFicha]){
      paresFichasOrdenados[colorFicha].push($ficha);
    }
    else{
      paresFichasOrdenados[colorFicha] = [$ficha];
    }
  });

  return Object.values(paresFichasOrdenados);
}
