const $BOTON_JUGAR = document.querySelector("#jugar");
const $PANEL_INICIO = document.querySelector("#panel-inicio");
const $TABLERO_JUEGO = document.querySelector("#tablero-juego");

$TABLERO_JUEGO.classList.add("oculto");

$BOTON_JUGAR.onclick = function(){
    $PANEL_INICIO.classList.add("oculto");
    $TABLERO_JUEGO.classList.remove("oculto");
    comenzarJuego();
    desbloquearInputFichas();
}

function desbloquearInputFichas(){
    let $fichas = document.querySelectorAll(".ficha");
    $fichas.forEach(function(ficha){
        ficha.onclick = manejarInputUsuario;
    });
}

function bloquearInputFichas(){
    let $fichas = document.querySelectorAll(".ficha");
    $fichas.forEach(function(ficha){
        ficha.onclick = function(){
        };
    });
}

let fichaA = null;
let cantidadMovimientos = 0;
let paresEncontrados = 0;
function manejarInputUsuario(evento){
    if(fichaA === null){
        fichaA = evento.target;
        fichaA.classList.remove("tapada");
    }

    if(fichaA !== evento.target){
        const DELAY_COMPROBACION = 500;
        evento.target.classList.remove("tapada");
        bloquearInputFichas();
        if(fichaA.classList[2] === evento.target.classList[2]){
            paresEncontrados ++;
            setTimeout(function(){
                fichaA.classList.add("encontrada");
                evento.target.classList.add("encontrada");
            },DELAY_COMPROBACION);
            
        }else{
            setTimeout(function(){
                fichaA.classList.add("tapada");
                evento.target.classList.add("tapada");
            },DELAY_COMPROBACION);
        }

        cantidadMovimientos++;
        setTimeout(function(){
            fichaA = null;
            evento.target = null;
            desbloquearInputFichas();
            actualizarNumeroMovimientos();
            comprobarVictoria();
        },DELAY_COMPROBACION);
    }
}

const CANTIDAD_PARES = document.querySelectorAll(".ficha").length / 2;
function comprobarVictoria(){
    if(paresEncontrados === CANTIDAD_PARES ){
        $TABLERO_JUEGO.classList.add("oculto");
       $PANEL_INICIO.classList.remove("oculto");
       document.querySelector("#titulo").textContent = `Has ganado en ${cantidadMovimientos} movimientos! presiona jugar para volver a jugar.`
       cantidadMovimientos = 0;
       paresEncontrados = 0;
        reiniciarFichas();
    }
}

function reiniciarFichas(){
    document.querySelectorAll(".ficha").forEach(function(ficha){
        ficha.classList.remove("encontrada");
        ficha.classList.remove(ficha.classList[2]);
    });
}

function actualizarNumeroMovimientos(){
    document.querySelector("#cantidad-movimientos").textContent = cantidadMovimientos;
}

function comenzarJuego(){
    const PATRON_COLORES_FICHAS = mezclarFichas();
    actualizarNumeroMovimientos(cantidadMovimientos);
    pintarFichas(PATRON_COLORES_FICHAS);
    ocultarFichas();
}

function mezclarFichas(){
    const FICHAS = ["rojo","celeste","naranja","amarillo","verde","blanco"];
    const FICHAS_DUPLICADAS = FICHAS.concat(FICHAS);
    let patron_fichas_mezclado = [];

    patron_fichas_mezclado = FICHAS_DUPLICADAS.sort(function(){
        return Math.random() - 0.5;
    });

    return patron_fichas_mezclado;
}

function pintarFichas(coloresFichas){
    const FICHAS = document.querySelectorAll(".ficha");
    FICHAS.forEach(function(FICHA, index){
        FICHA.classList.add(`${coloresFichas[index]}`);
    });
}

function ocultarFichas(){
    const FICHAS = document.querySelectorAll(".ficha");
    FICHAS.forEach(function(FICHA){
        FICHA.classList.add("tapada");
    });
}
