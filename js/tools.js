// api  https://xz94zfs6u8.execute-api.eu-west-1.amazonaws.com/default/myBakery


//Preguntas que haremos al usuario
let questions = [
    'Hola, ¿cómo te llamas?',
    '¿Cúal es tu dulce favorito?',
];

var specialProductsJSON = '[{"name":"sugar donut","name_es":"Donut de azúcar","img":"sugar_donut.png"},{"name":"cheese cake","name_es":"Tarta de queso","img":"cheese_cake.png"},{"name":"carrot cake","name_es":"Tarta de zanahoria","img":"carrot_cake.png"},{"name":"ice coffee","name_es":"Café helado","img":"ice_coffee.png"},{"name":"banana toffee","name_es":"Banana toffee","img":"banana_toffee.png"},{"name":"chocolate muffin","name_es":"Muffin de chocolate","img":"chocolate_muffin.png"},{"name":"strawberry cookie","name_es":"Galleta de fresa","img":"strawberry_cookie.png"},{"name":"latte coffee","name_es":"Café latte","img":"latte_coffee.png"}]';
var specialProducts = JSON.parse(specialProductsJSON);

var num = 0;// posicion del array de preguntas
var output = document.querySelector("#result"); //contenedor para mostrar preguntas
var imgContainer = document.querySelector("#imgContainer");
var inputBox = document.querySelector("#ans"); // contenedor para mostras respuestas
output.innerHTML = questions[0]; //inicio de dialogo con pregunta 1


function changeQuestion() {
    inputBox.setAttribute("placeholder", "Cuéntanos");
    if (num < questions.length) {
        output.innerHTML = questions[num];
    }
}



function askName() {
    var name = inputBox.value; //recogemos la respuesta del usuario [0]
    output.innerHTML = `Hola ${name}, un placer conocerte`; //Mostramos respuesta recogiendo valor de entrda
    inputBox.value = "";
    button.setAttribute("style", "display: none");
    ++num; //incrementamos el contador para pasar a otra pregunta

    inputBox.style.display = 'none';
    setTimeout(() => { //retrasamos la llamada a la funtion de cambiarPregunta()
        changeQuestion();
        inputBox.setAttribute("placeholder", "Cuéntanos");
        button.setAttribute("style", "display: block");
        inputBox.style.display = 'block';
    }, 2000);
}

function showSpecialProductInfo(customerProduct, specialProductName) {
    let productName = specialProductName;
    let productImg = '';
    for (let i = 0; i < specialProducts.length; i++) {
        let specialProduct = specialProducts[i];
        if (specialProduct.name == specialProductName.split('"').join('')) {
            productName = specialProduct.name_es;
            productImg = specialProduct.img;
        }
    }

    output.innerHTML = `${customerProduct} ... suena delicioso!<br> Entonces te va a encantar lo que te voy a mostrar!<br><h4> Nuestro especial de hoy es  <span id="showSpecial">${productName}</span></h4>`;
    if (productImg.length > 0) {
        imgContainer.innerHTML = `
            <img src="img/products/${productImg}" style="max-width:50%;width:auto;height:auto;">
            <div>Ha sido un placer ayudarte, Sirimiri te desea feliz día :)</div>
        `;
    }
}

function showSpecialProduct() {
    var product = inputBox.value; //recogemos la respuesta del usuario [0]

    inputBox.style.display = 'none';
    /* traemos el dato de la api  para mostrarla en la respuesta a la pregunta [1] */
    fetch('https://cors-anywhere.herokuapp.com/https://xz94zfs6u8.execute-api.eu-west-1.amazonaws.com/default/myBakery')
        .then(function (response) {
            return response.text();
        })
        .then(function (myData) {
            var pastel = `${myData}`;//Guardamos en una variable el dato que traemos tras la llamada
            showSpecialProductInfo(product, pastel);

            inputBox.value = "";
            ++num;
            button.setAttribute("style", "display: none");

            setTimeout(changeQuestion, 3000);
        });
}

function showResponse() {
    if (inputBox.value.length > 0) {
        if (num == 0) {
            askName();
        } else if (num == 1) {
            showSpecialProduct();
        }
    }
    inputBox.value = '';
}



/* capturamos el evento de presionar la tecla enter para llamar a showResponse() */
$(document).on('keypress', function (e) {
    if (e.which == 13) {
        showResponse();
    }
})

var button = document.querySelector('#sendButton');
button.addEventListener('click', showResponse);