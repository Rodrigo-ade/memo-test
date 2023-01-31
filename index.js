

const $BOTON_JUGAR = document.querySelector("#jugar");
document.querySelector("#tablero-juego").classList.add("oculto");

$BOTON_JUGAR.onclick = function(){

    document.querySelector("#panel-inicio").classList.add("oculto");
    document.querySelector("#tablero-juego").classList.remove("oculto");
    comenzarJuego();
}

function comenzarJuego(){
    let numeroMovimientos = 0;
    const PATRON_FICHAS = mezclarFichas();
    pintarFichas(PATRON_FICHAS);
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

/*
XnumeroMovimientos = 0;
XpatronFichas = [];
XFunción mezclarFichas() {se introducen todas las id de colores, se van elegiendo de forma aleatoria y rellenan el patronFichas}
XFunción pintarFichas(patronFichas){ForEach ".ficha" se le agrega el patronFicha[ficha] como classList.add}//Esto pintará los casilleros
Función ocultarFichas(){ForEach ".ficha" classlist.add("Tapada")}//Tapada en CSS = color: black !important;
Función desbloquearInput(){ForEach ".ficha" //Si la clickeo, le elimino classlist.remove("Tapada")}//Se verá el color.
//Comparación de colores: 
*/
