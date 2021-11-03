//Gracias al fetch se puede establecer comunicación con los datos del JSON
fetch("../assets/dataJSON/Data.json")
.then((response) => response.json())
.then((data) => iterarCards(data))
.catch((error) => console.log(error))
//"cards" es el contenedor del "Gameplay" en el que se iteran las tarjetas
let tarjetas = document.getElementById("cards")
//Aquí se "pintan" los datos textuales necesarios para hacer las tarjetas
let iterarCards = (data) => {
    console.log(data)
    for (const tarjeta of data.Cards_TLOZ) {
        console.log(tarjeta.Titulo)
    tarjetas.innerHTML += `<div class="card-container">
    <div class="card-portrait">
        <div class="card-back"></div>
        <div class="card-cover" id="${tarjeta.Titulo}">${tarjeta.Titulo}</div>
    </div>
    </div>`
//Aquí se "pinta" la portada de cada tarjeta
let portadaCard = tarjeta.Imagen;
let portadaTarjeta = document.getElementById(`${tarjeta.Titulo}`)
portadaTarjeta.style.backgroundImage = "url(" + portadaCard + ")"
portadaTarjeta.style.backgroundSize = "cover"
        }
    }