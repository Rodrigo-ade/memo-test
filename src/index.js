const $FICHAS = document.querySelectorAll(".ficha");
const COLORES = ["azul","rojo","amarillo","verde","violeta","naranja","celeste","blanco"];
const PARES_DE_COLORES = COLORES.concat(COLORES);
const $JUGAR = document.querySelector(".btn");
let turno = 1;

$JUGAR.onclick = iniciarJuego;

function iniciarJuego(){
    colocarParesColores(mezclarColores(PARES_DE_COLORES));
    actualizarPanelTurno(`Este es tu ${turno}º turno`);
    ocultarFichas($FICHAS);
}

function ocultarFichas($fichas){
    $fichas.forEach(function($ficha){
        $ficha.setAttribute("oculta", true);
    });
}

function actualizarPanelTurno(mensaje){
    document.querySelector("#situacion-turno").textContent = mensaje;
}

function mezclarColores(colores){
    let coloresOrdenados = duplicarColores(colores);
    const COLORES_MEZCLADOS = [];
    while(coloresOrdenados.length != 0){
        let numeroRandom = Math.floor(Math.random() * coloresOrdenados.length);
        const COLOR = coloresOrdenados[numeroRandom];
        COLORES_MEZCLADOS.push(COLOR);
        coloresOrdenados.splice(numeroRandom,1);
    }
    return COLORES_MEZCLADOS;
}

function duplicarColores(colores){
    let copiaColores = [];
    colores.forEach(function (color){
        copiaColores.push(color);
    })
    return copiaColores;
}

function colocarParesColores(colores){
    colores.forEach(function(color,index){
        $FICHAS[index].setAttribute("color",color);
    });
}
