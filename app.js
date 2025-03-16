/*
-Aquí habíamos usado de forma básica el cambio del titulo o header y del párrafo.
-Luego los metimos en la función de asignarTextoElemento para "automatizarlo". De esta manera reducimos código y ordenamos
let titulo = document.querySelector('h1');
titulo.innerHTML = 'Juego del número secreto';

let parrafo = document.querySelector('p');
parrafo.innerHTML = 'Indica un número del 1 al 12';
 */
let numeroSecreto = 0;
let intentos = 0;
let listaNumerosSorteados = [];
let numeroMaximo = 10;
let juegoTerminado = false; 

console.log(numeroSecreto);

function asignarTextoElemento(elemento, texto)
{
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

function verificarIntento()
{
    //verificación al inicio de verificarIntento para notificar al jugador que el juego ya terminó si intentan seguir jugando
    if (juegoTerminado) 
    {
        asignarTextoElemento('p', '¡Ya acertaste! Selecciona "Nuevo juego" para comenzar de nuevo.');
        limpiarCaja(); // Vaciar la caja si intentan seguir jugando
        return; // Salir de la función
    }

    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);

    // Validar si no se ingresó un número
    if (isNaN(numeroDeUsuario)) {
    asignarTextoElemento('p', `Por favor, ingresa un número del 1 al ${numeroMaximo}`);
    limpiarCaja(); // Vaciar el campo de entrada
    return; // Salir de la función
    } 

    
    //console.log(numeroDeUsuario === numeroSecreto);//triple "=" es para saber si es tanto el valor, como tipo de dato iguales
    if(numeroDeUsuario === numeroSecreto) {
        let parrafo = document.querySelector('p');
        parrafo.classList.add('texto-acierto'); // Añadir la clase para el color verde

        asignarTextoElemento('p',`Acertaste el número en ${intentos} ${(intentos === 1) ? 'intento' : 'intentos'}`);
        document.getElementById('reiniciar').removeAttribute('disabled');
        /*   -Otra opción para lo anterior, usando querySelector
        document.querySelector('#reiniciar').removeAttribute('disabled');
        */
        juegoTerminado = true;// Marcar que el juego ha terminado
    } else {
        //El usuario no acertó
        if(numeroDeUsuario > numeroSecreto) {
            asignarTextoElemento('p','El número secreto es menor a '+ numeroDeUsuario);
        } else {
            asignarTextoElemento('p','El número secreto es mayor a  '+ numeroDeUsuario);
        }
        intentos++;
        limpiarCaja();
    }
    return;
}


function limpiarCaja()
{
/*  
-Forma común de hacer lo del borrado de caja.
    let valorCaja = document.querySelector('#valorUsuario')
    valorCaja.value = '';
*/
    document.querySelector('#valorUsuario').value = ''; //Forma pro de vaciar la caja
}

function generarNumeroSecreto()
{
    let numeroGenerado = Math.floor(Math.random()*numeroMaximo)+1;

    console.log(numeroGenerado);
    console.log(listaNumerosSorteados);
    //Si ya sorteamos todos los números, cerramos el juego
    if(listaNumerosSorteados.length == numeroMaximo){
        asignarTextoElemento('p','Ya se sortearon todos los números posibles');
    }else{
        //Si el número generado está en la lista

        if(listaNumerosSorteados.includes(numeroGenerado)){
            return generarNumeroSecreto();
        }else{
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
}

function condicionesIniciales()
{
    asignarTextoElemento('h1','Juego del número secreto!');
    asignarTextoElemento('p',`Indica un número del 1 al ${numeroMaximo}`);//indicar mensaje de intervalo inicial de números
    numeroSecreto = generarNumeroSecreto(); //generar número aleatorio
    intentos = 1;
}

// Configuración de eventos
function configurarEventos() //Esto me permite que sólo se ingresen por teclado números del 1 al 10
{
    document.getElementById('valorUsuario').addEventListener('input', function() {
        let input = this.value;

        if (input < 1 || input > 10) {
            this.value = '';
            asignarTextoElemento('p', `Por favor, ingresa un número del 1 al ${numeroMaximo}`);
        }
    });

    document.getElementById('valorUsuario').addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            verificarIntento();
        }
    });
}

function reiniciarJuego()
{
    //limpiar la caja
    limpiarCaja();
    //indicar mensaje de intervalo inicial de números
    //generar número aleatorio
    //inicializar el número de intentos
    condicionesIniciales();
    juegoTerminado = false; // Restablecer el estado del juego para que no salga el letrero de que ya adivinó.
    //deshabilitar botón de nuevo juego
    // Restablecer el estilo del texto
    let parrafo = document.querySelector('p');// aquí quito el color verde
    parrafo.classList.remove('texto-acierto');

    document.querySelector('#reiniciar').setAttribute('disabled','true');
    
}

// Condiciones iniciales
condicionesIniciales();
// Llamamos a configurarEventos justo después de inicializar las condiciones
configurarEventos();