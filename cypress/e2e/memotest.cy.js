/// <reference types="Cypress" />

const URL = "http://192.168.0.81:8080"
const CANTIDAD_PARES = 8;
let paresColores;

context('Memotest pruebas', ()=>{
    before(() => {
        cy.visit(URL);
    });

    describe("Pruebas previas a jugar", () => {
        it("Verifica que hayan fichas en el tablero", () => {
            cy.get('#tablero .ficha').should("have.length",CANTIDAD_PARES * 2);
        });

        it("Verifica que al iniciar, las fichas esten ocultas", () => {
            cy.get("button").click();
            cy.get('#tablero .ficha').each(($ficha)=>{
                expect($ficha).to.have.attr("oculta", "true");
            });
        });

        it("Verifica aleatoriedad de las fichas", () => {
            cy.get("#tablero .ficha").then(($fichas) => {
                let fichasPrimerJuego = [];
                $fichas.each((i,$ficha)=>{
                    fichasPrimerJuego.push($ficha.getAttribute("color"));
                });

                cy.get("button").click();

                let fichasSegundoJuego = [];
                cy.get("#tablero .ficha").then(($fichas) => {
                    $fichas.each((i,$ficha)=>{
                        fichasSegundoJuego.push($ficha.getAttribute("color"));
                    })

                })
                expect(fichasPrimerJuego).to.not.deep.equal(fichasSegundoJuego);
            });
        });
    });

    describe("Pruebas resolviendo el juego", () => {
        let paresOrdenados;
        let coloresOrdenados;
        it("Verifica que al clickear un par incorrecto,las fichas se oculten", () => {
            cy.get("#tablero .ficha").then(($fichas)=>{
                paresOrdenados = obtenerPares($fichas);
                coloresOrdenados = Object.values(paresOrdenados);
                cy.get(coloresOrdenados[0][0]).click();
                cy.get(coloresOrdenados[1][0]).click();
                cy.get(coloresOrdenados[0][0]).should("have.attr","oculta","true");
                cy.get(coloresOrdenados[1][0]).should("have.attr","oculta","true");
            });
        });

        it("Verifica que al ganar, se muestre el mensaje correcto", () => {
            coloresOrdenados.forEach((par)=>{
                par[0].click();
                par[1].click();
            })
            cy.get("#situacion-turno").should("have.text",`Ganaste en tu ${CANTIDAD_PARES + 1}º turno!!!`);
        });

        it("Verifica que al ganar, no queden fichas visibles", () => {
            cy.wait(600);
            cy.get("#tablero .ficha").each($ficha=>{
                expect($ficha).to.have.attr("color","encontrada");
            })
        });
    });
});

function obtenerPares($fichas){
    let pares = {
    };

    $fichas.each((i,$ficha) => {
        let color = $ficha.getAttribute("color");

        if(pares[color]){
            pares[color].push($ficha);
        }else{
            pares[color] = [$ficha];
        }
    });

    return pares;
}
