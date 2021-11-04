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
data.Cards_TLOZ.sort(() => Math.random() - 0.5)
    for (const tarjeta of data.Cards_TLOZ) {
        console.log(tarjeta.Titulo)
    tarjetas.innerHTML += `<div class="card-container">
    <div class="card-portrait" data-framework='${tarjeta.Framework}'>
        <div class="card-back"></div>
        <div class="card-cover" id="${tarjeta.Titulo}"></div>
    </div>
    </div>`
//Aquí se "pinta" la portada de cada tarjeta
let portadaCard = tarjeta.Imagen;
let portadaTarjeta = document.getElementById(`${tarjeta.Titulo}`)
portadaTarjeta.style.backgroundImage = "url(" + portadaCard + ")"
portadaTarjeta.style.backgroundSize = "cover"

//Voltear las cartas
const cartas = document.querySelectorAll('.card-portrait');
let Gamer1 = document.getElementById('P1')
let Gamer2 = document.getElementById('P2')
let Score1 = document.getElementById('ScoreP1')
let Score2 = document.getElementById('ScoreP2')

/*
let botonPlay = document.getElementById('botonPlay')
botonPlay.addEventListener('click', () => {
    document.getElemetnById('Pantalla1').hidden = true (pantallas )
    document.getElementById('Pantalla2').hidden = false
})
*/

Gamer1.style.color = '#e35477'
Score1.innerHTML= "0";
Score2.innerHTML= "0";

let hasFlippedCard = false; //booleano
let lockBoard = false; //Esta propiedad sirve para "flipear" dos cartas a la vez y no más por turno
let firstCard, secondCard;

let turno = true;
let puntuacionP1 = 0;
let puntuacionP2 = 0;

//Flip es, en inglés "voltear"
function flipCard() {
    if (lockBoard) return; 
    if(this === firstCard) return;
    this.classList.add('flip')
    
    if (!hasFlippedCard) {
//PrimerClick
        hasFlippedCard = true;
        firstCard = this;

        return;
    } 
//SegundoClick
    secondCard = this;

    checkForMatch();
}
//¿cómo hacer Match?
function checkForMatch () {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework
    if (turno){
    Gamer1.style.color = '#518539'
    Gamer2.style.color = '#d4d40f'
    turno= false
} else{
    turno = true
    Gamer1.style.color = '#d4d40f'
    Gamer2.style.color = '#518539'
}
//Hace match!!
    if (isMatch){
        disableCards ()
        if (turno) {
        puntuacionP1 ++;
        console.log(puntuacionP1)
        } else{
        puntuacionP2 ++;
        console.log(puntuacionP2)
        }
    }else{ unflipCards ()
    }
}
function disableCards () {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard()
}

function unflipCards () {
    lockBoard = true;
//No hace Match (se le agrega el tiempo para que se volteen las tarjetas al no coincidir, como un adorno que senote a la vista humana) 
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1500)
}
//resetBoard sirve para que al hacer click en la misma carta (ya 'flipeada') no la vuelva a tomar en cuenta
function resetBoard(){
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}
//Función que pretende barajar el orden de las tarjetas
/*(function shuffle () {
    cartas.forEach(card => {
        let randomPos = Math.floor(Math.random() * 20);
        card.style.order = randomPos;
    });
})();*/
cartas.forEach(card => card.addEventListener('click', flipCard))
    }
};
