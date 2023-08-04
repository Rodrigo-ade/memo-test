const $FICHAS = document.querySelectorAll(".ficha");
const COLORES = ["azul","rojo","amarillo","verde","violeta","naranja","celeste","blanco"];
const PARES_DE_COLORES = COLORES.concat(COLORES);
const $JUGAR = document.querySelector(".btn");
let turno;
let paresEncontrados;

$JUGAR.onclick = iniciarJuego;

function iniciarJuego(){
    turno = 1;
    paresEncontrados = 0;
    colocarParesColores(mezclarColores(PARES_DE_COLORES));
    actualizarPanelTurno(turno,paresEncontrados);
    ocultarColorFichas($FICHAS);
    habilitarSeleccionarFicha($FICHAS);
}

function habilitarSeleccionarFicha(fichas){
    fichas.forEach(function(ficha){
        ficha.onclick = manejarElegirFicha;
    });
}

function deshabilitarFichas($fichas){
    $fichas.forEach(function (ficha){
        ficha.onclick = function(){};
    });
}

function mostrarColorFicha($ficha){
    $ficha.setAttribute("oculta",false);
}

let $primerFicha = "";
let $segundaFicha = "";
function manejarElegirFicha(e){
    let fichaElegida = e.target;
    if($primerFicha === ""){
        $primerFicha = fichaElegida;
        mostrarColorFicha($primerFicha);
        deshabilitarFichas([$primerFicha]);
        return;
    }
    $segundaFicha = fichaElegida;
    mostrarColorFicha($segundaFicha);
    deshabilitarFichas($FICHAS);

    setTimeout(function(){
        if($primerFicha.getAttribute("color") === $segundaFicha.getAttribute("color")){
            $primerFicha.setAttribute("color","encontrada");
            $segundaFicha.setAttribute("color","encontrada");
            paresEncontrados ++;
        }else{
            ocultarColorFichas([$primerFicha,$segundaFicha]);
        }

        habilitarSeleccionarFicha($FICHAS);
        $primerFicha = "";
        $segundaFicha = "";
        turno ++;
        actualizarPanelTurno(turno,paresEncontrados);
         
        if(paresEncontrados === COLORES.length){
            manejarVictoria();
        }

    },500);
}

function manejarVictoria(){
    document.querySelector("#situacion-turno").textContent = `Ganaste en tu ${turno}º turno!!!`;
}

function ocultarColorFichas($fichas){
    $fichas.forEach(function($ficha){
        $ficha.setAttribute("oculta", true);
    });
}

function actualizarPanelTurno(turno,paresEncontrados){
    document.querySelector("#situacion-turno").textContent = `${turno}º turno, ${paresEncontrados} pares encontrados`;
}

function mezclarColores(colores){
    let coloresOrdenados = colores;
    const COLORES_MEZCLADOS = coloresOrdenados.sort(function(a, b) {
        return 0.5 - Math.random();
    });

    return COLORES_MEZCLADOS;
}

function colocarParesColores(colores){
    colores.forEach(function(color,index){
        $FICHAS[index].setAttribute("color",color);
    });
}
