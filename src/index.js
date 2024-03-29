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
    habilitarSeleccionarFicha();
}

function habilitarSeleccionarFicha(){
    document.querySelector("#tablero").onclick = function(e){
        let $posibleFicha = e.target;
        if($posibleFicha.classList.contains("ficha")){
            manejarElegirFicha($posibleFicha);
        };
    };
}

function mostrarColorFicha($ficha){
    $ficha.setAttribute("oculta",false);
}

let $primerFicha = "";
function manejarElegirFicha($ficha){
    if($primerFicha === ""){
        $primerFicha = $ficha;
        mostrarColorFicha($primerFicha);
        return;
    }
    if($primerFicha === $ficha){
        return;
    }

    mostrarColorFicha($ficha);

    if($primerFicha.getAttribute("color") === $ficha.getAttribute("color")){
        fichaEncontrada($primerFicha);
        fichaEncontrada($ficha);
        paresEncontrados ++;
    }else{
        ocultarColorFicha($primerFicha);
        ocultarColorFicha($ficha);
    }

    $primerFicha = "";
    $ficha = "";
    turno ++;
    actualizarPanelTurno(turno,paresEncontrados);
         
    if(paresEncontrados === COLORES.length){
        manejarVictoria();
    }
}

function ocultarColorFicha($ficha){
    setTimeout(function(){
        $ficha.setAttribute("oculta",true);
    },500);
}

function fichaEncontrada($ficha){
    setTimeout(function(){
        $ficha.setAttribute("color","encontrada");
    },500);
}

function manejarVictoria(){
    document.querySelector("#situacion-turno").textContent = `Ganaste en tu ${turno-1}º turno!!!`;
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
