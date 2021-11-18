document.getElementById('pantalla1').hidden= false;
document.getElementById('pantalla2').hidden= true;
document.getElementById('pantalla3').hidden= true;
//música de intro
let introMusic = () => {
    const intro = document.getElementById(`intro`);
    intro.loop = true;
    intro.volume = 0.7;
    intro.play();
};
introMusic()
//pausa de música de intro
let pausaIntro = () => {
    const pausa = document.getElementById('intro')
    pausa.pause();
    pausa.currentTime = 0;    
};
//musica de gameplay
let gamePlayMusic = () => {
    const timeToPlay = document.getElementById('play');
    timeToPlay.loop = true;
    timeToPlay.volume = 0.7;
    timeToPlay.play();
};
//pausa de música de gameplay
let pausaGamePlayMusic = () => {
    const pausa2 = document.getElementById('play')
    pausa2.pause();
    pausa2.currentTime = 0;
};
//musica de pantalla de ganador
let musicChampions = () => {
    const final = document.getElementById('winner')
    final.loop = false;
    final.play();
};
//pausa de musica pantalla de ganador
let pausaMusicChampions = () =>{
    const pausa3 = document.getElementById('winner')
    pausa3.pause();
    pausa3.currentTime = 0;
};
//sonido de match de tarjetas
let matchSound = () => {
    const isMatchSound = document.getElementById('match')
    isMatchSound.play();
};
//sonido si las tarjetas no hacen match
let noMatchSound = () => {
    const isNotMatchSound = document.getElementById('noMatch')
    isNotMatchSound.play();
};      
//Anunciando al ganador
let tarara = () => {
    const champ = document.getElementById('champ')
    champ.play();
};
let tap = () => {
    const singleTap = document.getElementById('bum')
    singleTap.play();
};
//Seccion de las pantallas principales
let startGame = document.getElementById('start')
startGame.addEventListener('click', () => {
    document.getElementById('pantalla1').hidden = true;
    pausaIntro();
    document.getElementById('pantalla2').hidden = false;
    gamePlayMusic();
    let Name1 = document.getElementById('Player1').value;//Nombre del Gamer1
    P1.innerHTML = "P1: " + Name1; 
    let Name2 = document.getElementById('Player2').value;//Nombre del Gamer1
    P2.innerHTML = "P2: " + Name2;
});

//"cards" es el contenedor del "Gameplay" en el que se iteran las tarjetas
let tarjetas = document.getElementById("cards")
//Gracias al fetch se puede establecer comunicación con los datos del JSON
fetch("../assets/dataJSON/Data.json")
.then((response) => response.json())
.then((data) => iterarCards(data))
.catch((error) => console.log(error))
//Aquí se "pintan" los datos textuales necesarios para hacer las tarjetas
let iterarCards = (data) => {
    console.log(data)
//barajear las cartas 
data.Cards_TLOZ.sort( () => Math.random() - 0.5); //random https://stackoverflow.com/questions/49555273/how-to-shuffle-an-array-of-objects-in-javascript
    for (const tarjeta of data.Cards_TLOZ) {
        console.log(tarjeta.Titulo)
    tarjetas.innerHTML += `<div class="card-container">
    <div class="card-portrait" data-framework='${tarjeta.Framework}'>
        <div class="card-back"></div>
        <div class="card-cover" id="${tarjeta.Titulo}"></div>
    </div>
    </div>`;
//Aquí se "pinta" la portada de cada tarjeta
let portadaCard = tarjeta.Imagen;
let portadaTarjeta = document.getElementById(`${tarjeta.Titulo}`)
portadaTarjeta.style.backgroundImage = "url(" + portadaCard + ")"
portadaTarjeta.style.backgroundSize = "cover"
    }
//Voltear las cartas
const cartas = document.querySelectorAll('.card-portrait');
//Estos son los protagonistas de la aventura
let Gamer1 = document.getElementById('P1');
let Gamer2 = document.getElementById('P2');
//Estos son sus puntajes
let Score1 = document.getElementById('ScoreP1');
let Score2 = document.getElementById('ScoreP2');
//Cada jugador inicia en 0 y se imprime literalmente en el interface
Gamer1.style.color = '#f5f507'
Score1.innerHTML = "0";
Score2.innerHTML = "0";
//Estas variables se declaran aquí para usarse, posteriormente, a lo largo del JS
let hasFlippedCard = false; //booleano
let lockBoard = false; //Esta variable sirve para "flipear" dos cartas a la vez y no más por turno
let firstCard, secondCard;
let pares = 0; //Los pares se inician en 0 y teminan en 10
let turno = true; //Indica quién inicia el juego
let puntuacionP1 = 0; //el conteo para el P1 y P2 inician el conteo en 0
let puntuacionP2 = 0;
//Flip es, en inglés "voltear"
function flipCard() {
    if (lockBoard) return; 
    if(this === firstCard) return;
    this.classList.add('flip')
    tap();
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
//Aquí se determina hasta cuando se acaba el juego
let gameOver = () => {
    setTimeout(() => {
    pares++; 
    if(pares==10) { //puntuacion1 + puntuacion2 == 10 
        pausaGamePlayMusic();
        tarara();
        document.getElementById('pantalla1').hidden = true;
        document.getElementById('pantalla2').hidden = true;
        document.getElementById('pantalla3').hidden = false;
        musicChampions();
        if (puntuacionP1 > puntuacionP2) {
            champion.innerHTML =  `The winner is P1: <br><center class="a">${document.getElementById("Player1").value}</center>`;
        } else {
            if (puntuacionP1 < puntuacionP2) {
                champion.innerHTML = `The winner is P2: <br><center class="b">${document.getElementById("Player2").value}</center>`;
            } else {
                champion.innerHTML = `<center class="c">It's a draw, do you want rematch?<center>`
            }
        }
    };
}, 900)
}
//¿cómo hacer Match?
function checkForMatch () {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework
//Hace match!!
    if (isMatch){
        gameOver();
        matchSound();
        disableCards ();
        if (turno) { //se determinan los turnos, el color verde determina el jugador al que le toca voltear tarjetas
        puntuacionP1 ++;
        Gamer1.style.color = '#8ce309'//verde  
        Gamer2.style.color = '#1f37e0'//rojo
        console.log(puntuacionP1)
        document.getElementById('ScoreP1').innerHTML = puntuacionP1
        } else{
        puntuacionP2 ++;
        Gamer1.style.color = '#f22727'//rojo 
        Gamer2.style.color = '#8ce309' //verde
        console.log(puntuacionP2)
        document.getElementById('ScoreP2').innerHTML = puntuacionP2
        }
    }else{ 
        if (turno){
            turno = false
            Gamer1.style.color = '#f22727'//rojo 
            Gamer2.style.color = '#8ce309' //verde
        } else{
            turno = true
            Gamer1.style.color = '#8ce309'//verde  
            Gamer2.style.color = '#1f37e0'//rojo
            }
            unflipCards () 
    }
}
function disableCards () {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard()
}
function unflipCards () {
    lockBoard = true;
    noMatchSound();
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
};

cartas.forEach(card => card.addEventListener('click', flipCard))
function checkForMatch2 () { //Se declara un segundo checkForMatch para que no se pierda el ritmo de colores al reiniciar el juego
    if (turno) {
        Gamer1.style.color = '#8ce309'//verde  
        Gamer2.style.color = '#1f37e0'//rojo
    } else {
        Gamer1.style.color = '#f22727'//rojo 
        Gamer2.style.color = '#8ce309' //verde
        }
        if (turno){
            turno = false
            Gamer1.style.color = '#f22727'//rojo 
            Gamer2.style.color = '#8ce309' //verde
        } else{
            turno = true
            Gamer1.style.color = '#8ce309'//verde  
            Gamer2.style.color = '#1f37e0'//rojo
            }
            unflipCards () 
    }; console.log(checkForMatch2);

let restart = document.getElementById('restart') //variable auxiliar al reiniciar el juego
    restart.addEventListener('click', () => {
        Gamer1.style.color = '#f5f507';
        Gamer2.style.color = '#000000'
        Score1.innerHTML= "0";
        Score2.innerHTML= "0";
        hasFlippedCard = false; //booleano
        lockBoard = false; //Esta variable sirve para "flipear" dos cartas a la vez y no más por turno
        firstCard, secondCard;
        pares = 0; //checar
        turno = true;
        puntuacionP1 = 0;
        puntuacionP2 = 0;
        cartas.forEach(card => card.addEventListener('click', flipCard))
        cartas.forEach(card => card.classList.remove('flip'));
        const cartota = document.querySelectorAll('.card-container');
        //shuffle;
        function shuffle() {
            cartota.forEach((card) => {
            let randomPos = Math.floor(Math.random() * 20);
            console.log(randomPos);
            card.style.order = randomPos;
        });
        }
        setTimeout(() => {
        shuffle();
        }, 1000);
        });    

        let restart2 = document.getElementById('restart2') //variable auxiliar al reiniciar el juego
        restart2.addEventListener('click', () => {
        pausaMusicChampions();
        gamePlayMusic();
        document.getElementById('pantalla1').hidden = true;
        document.getElementById('pantalla2').hidden = false;
        document.getElementById('pantalla3').hidden = true;
        Gamer1.style.color = '#f5f507';
        Gamer2.style.color = '#000000'
        Score1.innerHTML= "0";
        Score2.innerHTML= "0";
        hasFlippedCard = false; //booleano
        lockBoard = false; //Esta variable sirve para "flipear" dos cartas a la vez y no más por turno
        firstCard, secondCard;
        pares = 0; //checar
        turno = true;
        puntuacionP1 = 0;
        puntuacionP2 = 0;
        cartas.forEach(card => card.addEventListener('click', flipCard))
        cartas.forEach(card => card.classList.remove('flip'));
        const cartota = document.querySelectorAll('.card-container');
        //shuffle;
        function shuffle() {
            cartota.forEach((card) => {
            let randomPos = Math.floor(Math.random() * 20);
            console.log(randomPos);
            card.style.order = randomPos;
        });
        }
        setTimeout(() => {
        shuffle();
        }, 1000);
        }); console.log(restart2)
};
