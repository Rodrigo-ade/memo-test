const $BOTON_JUGAR = document.querySelector("#jugar");
document.querySelector("#tablero-juego").classList.add("oculto");

$BOTON_JUGAR.onclick = function(){
    document.querySelector("#panel-inicio").classList.add("oculto");
    document.querySelector("#tablero-juego").classList.remove("oculto");
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
            //Fichas son iguales
            paresEncontrados ++;
            setTimeout(function(){
                fichaA.classList.add("encontrada");
                evento.target.classList.add("encontrada");
            },DELAY_COMPROBACION);
            
        }else{
            //Fichas son distintas
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
            console.log(paresEncontrados);
            comprobarVictoria();
        },DELAY_COMPROBACION);
    }

}

const CANTIDAD_PARES = document.querySelectorAll(".ficha").length / 2;
function comprobarVictoria(){
    if(paresEncontrados === CANTIDAD_PARES ){
        //COMPLETAR
    }
}

function actualizarNumeroMovimientos(){
    document.querySelector("#cantidad-movimientos").textContent = cantidadMovimientos;
}

function comenzarJuego(){
    const PATRON_FICHAS = mezclarFichas();
    pintarFichas(PATRON_FICHAS);
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

function pintarFichas(arrayFichas){
    const FICHAS = document.querySelectorAll(".ficha");

    FICHAS.forEach(function(FICHA, index){
        FICHA.classList.add(`${arrayFichas[index]}`);
    });
}

function ocultarFichas(){
    const FICHAS = document.querySelectorAll(".ficha");
    FICHAS.forEach(function(FICHA){
        FICHA.classList.add("tapada");
    });
}
