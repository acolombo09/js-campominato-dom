"use strict"

// Creo una griglia quadrata di 10 quadrati per riga per 10 righe,
// per un totale di 100 quadrati.

/**
 * @type {HTMLSelectElement} //così le select vengono effettivamente riconosciute come select
 */

const squareGeneratorSelect = document.querySelector("[name='squareGenerator']");
const btnPlay = document.getElementById("btn-play");

/**
 * @type {HTMLElement}
 */
const gridContainer = document.querySelector(".grid-container");

// Al momento del click (event listener), devo creare la griglia.
btnPlay.addEventListener("click", onBtnClick);

// Imposto la funzione da svolgere una volta premuto il btnPlay
// l'ho aggiunta come secondo argomento all'event listener per richiamarla

function onBtnClick() {
  // assegno al squaregenerator il valore della select dell'utente
  // parse int per essere sicuro che mi ritorna un numero
  const squareGenerator = parseInt(squareGeneratorSelect.value);
  const bombs = bombsGenerator();
  // aggiungo una sezione in jsdocs per ovviare al problema element al select.value
  // console log di test per vedere se funziona il listener con la select
  console.log("Il valore scelto è", squareGenerator);

  /**
   * @param {string} squareContent //per il contenuto testuale nel quadrato
   * @param {number} squareCounts 
   * @returns {HTMLDivElement}
   */
  
  function singleSquareGenerator(squareContent, squareCounts,bombs ) {
    //Genero un div square e gli aggiungo una classe per modificarlo a piacimento
    const square = document.createElement("div");

    const squaresPerRow = Math.sqrt(squareCounts);

    square.classList.add("grid-square");
    square.textContent = squareContent;
    square.style.flexBasis = `calc(100% / ${squaresPerRow})`;

    square.addEventListener("click", function(){
      // il toggle toglie, e se l'elemento non ha alcuna classe lo aggiunge
      square.classList.toggle("bg-success");
      console.log(squareContent);
      console.log(bombs);
    })

    return square;
    //aggiungo una sezione jsdocs per squarecontent
  }

  // Genero la griglia con una funzione
  /**
   * Crea una griglia in base al numero di celle dato
   * @param {number} squaresNumber // numero di quadrati da creare nella griglia
   * @returns {HTMLDivElement[]} // mi ritorna un array di div
   */
  function createGrid(squaresNumber,bombs ){
    // all'interno di ogni ciclo, creo un singolo quadrato
    const grid = [];
    for (let i = 1; i <= squaresNumber; i++) {
      const newSquare = singleSquareGenerator(i, squaresNumber, bombs);

    // devo far in modo di inserire questo square nell'array,
    // perchè non me ne faccio nulla di un solo square
      grid.push(newSquare);
    }
    //output function
    return grid;
  }
  // devo generare la griglia al click del pulsante tramite function creategrid
  const gridList = createGrid(squareGenerator,bombs );
  // console log per capire cosa ottengo da gridlist
  console.log(gridList);
  gridPrint(gridContainer, gridList);

  // creata griglia virtuale, ora però devo passare al DOM
  /**
   * @param {HTMLElement} container // la lista dei quadrati
   * @param {HTMLDivElement[]} squaresList // array quadrati div
   */
  // creo una griglia tramite function
  function gridPrint(container, squaresList){
    // reset html
    container.innerHTML = "";
  // aggiungo jsdocs per l'elemento container e squareslist
    // aggiungo un ciclo per manipolare il DOM
    for (let i = 0; i < squaresList.length; i++) {
      container.append(squaresList[i]);
    }
  }
  // richiamo la funzione dopo console gridlist
}

// modifico lo style dei quadrati per impostare quanti devono starci per riga
// square.style.flexBasis = `calc(100% / ${squaresPerRow})`;
// devo creare squaresPerRow da inserire nel calcolo larghezze

// così facendo mi carica una griglia sotto l'altra, ora devo settare un reset
// posso resettare prima dell'append che mi aggiunge i div
// con un container.innerHTML = ""; (vuoto)
// aggiungo un event listener per cambiare sfondo al click

/*
Consegna
Copiamo la griglia fatta ieri nella nuova repo e aggiungiamo la logica del gioco
(attenzione: non bisogna copiare tutta la cartella dell’esercizio ma solo 
l’index.html, e le cartelle js/ css/ con i relativi script e fogli di stile, 
per evitare problemi con l’inizializzazione di git).
Il computer deve generare 16 numeri casuali nello stesso range della difficoltà 
prescelta: le bombe. Attenzione: nella stessa cella può essere posizionata 
al massimo una bomba, perciò nell’array delle bombe non potranno esserci due 
numeri uguali.
In seguito l’utente clicca su una cella: se il numero è presente nella lista 
dei numeri generati - abbiamo calpestato una bomba - la cella si colora 
di rosso e la partita termina. Altrimenti la cella cliccata si colora 
di azzurro e l’utente può continuare a cliccare sulle altre celle.
La partita termina quando il giocatore clicca su una bomba o quando raggiunge 
il numero massimo possibile di numeri consentiti 
(ovvero quando ha rivelato tutte le celle che non sono bombe).
Al termine della partita il software deve comunicare il punteggio, 
cioè il numero di volte che l’utente ha cliccato su una cella 
che non era una bomba.
---------------------------------------------------------------------------------------------------------
BONUS:
Aggiungere una select accanto al bottone di generazione, che fornisca una scelta tra tre diversi livelli di difficoltà:
- difficoltà 1 ⇒ 100 caselle, con un numero compreso tra 1 e 100, divise in 10 caselle per 10 righe;
- difficoltà 2 ⇒ 81 caselle, con un numero compreso tra 1 e 81, divise in 9 caselle per 9 righe;
- difficoltà 3 ⇒ 49 caselle, con un numero compreso tra 1 e 49, divise in 7 caselle per 7 righe;
----------------------------------------------------------------------------------------------------------
Consigli del giorno:
Scriviamo prima cosa vogliamo fare passo passo in italiano, 
dividiamo il lavoro in micro problemi.
Ad esempio:
Di cosa ho bisogno per generare i numeri?
Proviamo sempre prima con dei console.log() per capire se stiamo 
ricevendo i dati giusti.
Le validazioni e i controlli possiamo farli anche in un secondo momento.
*/

/*
Genero 16 numeri casuali nello stesso range della difficoltà prescelta
nella stessa cella può essere posizionata al massimo una bomba, 
perciò nell’array delle bombe non potranno esserci due 
numeri uguali.
*/
function bombsGenerator(){
  let numbers = [];
  while (numbers.length < 16) {
    const bombsNumber = Math.floor(Math.random() * 100) + 1;//Genera un numero casuale tra 1 e 100
    if (numbers.indexOf(bombsNumber) === -1) { //Verifico se il numero casuale non è già stato generato
      numbers.push(bombsNumber); //Aggiunge il numero casuale all'array
    }
  }
  return numbers;
}

// verifico se effettivamente funziona
// for (let i = 0; i < bombs.length; i++) {
//   console.log(bombs[i]);
//   // tienilo da parte per stampare i numeri in un elemento HTML:
//   // document.getElementById('idElementoHTML').innerHTML += bombs[i];
// }

/* devo controllare al click dell’utente sulla cella: se il numero è presente nella lista 
dei numeri generati - abbiamo calpestato una bomba - la cella si colora 
di rosso e la partita termina. Altrimenti la cella cliccata si colora 
di azzurro */

// verifico se il numero è presente nella lista dei numeri generati

// if (numeriGenerati.includes(numeroGenerato)) {
//   // il numero generato è presente nell'array
// } else {
//   // il numero generato non è presente nell'array
// }

// modifico lo sfondo in base alla presenza o meno del numero nella cella

// if (numeriGenerati.includes(numeroGenerato)) {
//   document.querySelector('#cella1').style.backgroundColor = 'danger';
// } else {
//   document.querySelector('#cella1').style.backgroundColor = 'info';
// }