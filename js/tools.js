// api  https://xz94zfs6u8.execute-api.eu-west-1.amazonaws.com/default/myBakery


//Preguntas que haremos al usuario
let questions = [
    'Hola, ¿cómo te llamas?',
    '¿Cúal es tu dulce favorito?',
    //'¿Tienes alguna sugerencia para futuras creaciones?'
];


var num = 0;// posicion del array de preguntas
var output = document.querySelector("#result"); //contenedor para mostrar preguntas
var inputBox = document.querySelector("#ans"); // contenedor para mostras respuestas
output.innerHTML = questions[0]; //inicio de dialogo con pregunta 1


function changeQuestion() {
    inputBox.setAttribute("placeholder", "Cuéntanos");
    console.log(num);
    if (num < questions.length) {
        output.innerHTML = questions[num];
    }
}

function askName() {
    var name = inputBox.value; //recogemos la respuesta del usuario [0]
    output.innerHTML = `Hola ${name}, un placer conocerte`; //Mostramos respuesta recogiendo valor de entrda
    inputBox.value = "";
    inputBox.setAttribute("placeholder", "Cuéntanos");
    ++num; //incrementamos el contador para pasar a otra pregunta
    
    inputBox.style.display = 'none';
    setTimeout(() => { //retrasamos la llamada a la funtion de cambiarPregunta()
        changeQuestion();
        inputBox.style.display = 'block';
        }, 2000);
}

function showSpecialProduct() {
    var product = inputBox.value; //recogemos la respuesta del usuario [0]
    var contenedor = document.querySelector("#showSpecial");
    inputBox.style.display = 'none';
    /* traemos el dato de la api  para mostrarla en la respuesta a la pregunta [1] */
    fetch('https://cors-anywhere.herokuapp.com/https://xz94zfs6u8.execute-api.eu-west-1.amazonaws.com/default/myBakery')
        .then(function (response) {
            return response.text();
        })
        .then(function (myData) {
            var pastel = `${myData}`;//Guardamos en una variable el dato que traemos tras la llamada

            // showSpecial.innerHTML = ` ${pastel}`;

            output.innerHTML = `${product} ... suena delicioso!<br> Entonces te va a encantar lo que te voy a mostrar!<br><h4> Nuestro especial de hoy es  <span id="showSpecial">${pastel}</span></h4>`;
            inputBox.value == "";
            ++num;
            setTimeout(changeQuestion, 1000);
        });
}

function showResponse() {
    if (inputBox.value.length > 0) {
        if (num == 0) {
            askName();
        } else if (num == 1) {
            showSpecialProduct();
        } /*else if (num == 2) {
            output.innerHTML = 'De acuerdo, tomaremos nota';
            ++num;
            setTimeout(changeQuestion, 2000);
        } else if (num == 3) {
            output.innerHTML = 'Un placer ayudarte, Sirimiri te desea feliz día :)';
            ++num;
            setTimeout(changeQuestion, 2000);
        }*/
    }
    inputBox.value = '';
}


/* capturamos el evento de presionar la tecla enter para llamar a showResponse() */
$(document).on('keypress', function (e) {
    if (e.which == 13) {
        showResponse();
    }
})