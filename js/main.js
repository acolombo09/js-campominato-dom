"use strict"
/*
Consegna
L’utente clicca su un bottone che genererà una griglia di gioco quadrata.
Ogni cella ha un numero progressivo, da 1 a 100.
Ci saranno quindi 10 caselle per ognuna delle 10 righe.
Quando l’utente clicca su ogni cella, la cella cliccata si colora di azzurro 
ed emetto un messaggio in console con il numero della cella cliccata.
--------------------------------------------------------------------------------
Bonus
Aggiungere una select accanto al bottone di generazione, che fornisca 
una scelta tra tre diversi livelli di difficoltà:
- con “facile”=> 100 caselle, con un numero compreso tra 1 e 100, divise in 10 caselle per 10 righe;
- con “medio” => 81 caselle, con un numero compreso tra 1 e 81, divise in 9 caselle per 9 righe;
- con “difficile” => 49 caselle, con un numero compreso tra 1 e 49, divise in 7 caselle per 7 righe;
---------------------------------------------------------------------------------
Consigli del giorno:
Scriviamo prima cosa vogliamo fare passo passo in italiano, dividiamo il lavoro 
in micro problemi.
Ad esempio:
Di cosa ho bisogno per generare i numeri?
Proviamo sempre prima con dei console.log() per capire se stiamo ricevendo 
i dati giusti.
Le validazioni e i controlli possiamo farli anche in un secondo momento.
*/

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

  // aggiungo una sezione in jsdocs per ovviare al problema element al select.value
  // console log di test per vedere se funziona il listener con la select
  console.log("Il valore scelto è", squareGenerator);

  /**
   * @param {string} squareContent //per il contenuto testuale nel quadrato
   * @param {number} squareCounts 
   * @returns {HTMLDivElement}
   */
  
  function singleSquareGenerator(squareContent, squareCounts) {
    //Genero un div square e gli aggiungo una classe per modificarlo a piacimento
    const square = document.createElement("div");

    const squaresPerRow = Math.sqrt(squareCounts);

    square.classList.add("grid-square");
    square.textContent = squareContent;
    square.style.flexBasis = `calc(100% / ${squaresPerRow})`;

    square.addEventListener("click", function(){
      // il toggle toglie, e se l'elemento non ha alcuna classe lo aggiunge
      square.classList.toggle("bg-success");
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
  function createGrid(squaresNumber){
    // all'interno di ogni ciclo, creo un singolo quadrato
    const grid = [];
    for (let i = 1; i <= squaresNumber; i++) {
      const newSquare = singleSquareGenerator(i, squaresNumber);

    // devo far in modo di inserire questo square nell'array,
    // perchè non me ne faccio nulla di un solo square
      grid.push(newSquare);
    }
    //output function
    return grid;
  }
  // devo generare la griglia al click del pulsante tramite function creategrid
  const gridList = createGrid(squareGenerator);
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

//------------------------------------------------------------------------------
// Riscrivo tutto il codice "pulito", senza commenti

// /**
//  * @type {HTMLSelectElement} //così le select vengono effettivamente riconosciute come select
//  */

// const squareGeneratorSelect = document.querySelector("[name='squareGenerator']");
// const btnPlay = document.getElementById("btn-play");

// /**
//  * @type {HTMLElement}
//  */
// const gridContainer = document.querySelector(".grid-container");

// btnPlay.addEventListener("click", onBtnClick);

// function onBtnClick() {

//   const squareGenerator = parseInt(squareGeneratorSelect.value);
//   console.log("Il valore scelto è", squareGenerator);

//   /**
//    * @param {string} squareContent //per il contenuto testuale nel quadrato
//    * @param {number} squareCounts 
//    * @returns {HTMLDivElement}
//    */

//   function singleSquareGenerator(squareContent, squareCounts) {
//     const square = document.createElement("div");

//     const squaresPerRow = Math.sqrt(squareCounts);

//     square.classList.add("grid-square");
//     square.textContent = squareContent;
//     square.style.flexBasis = `calc(100% / ${squaresPerRow})`;

//     square.addEventListener("click", function(){
//       square.classList.toggle("bg-success");
//     })
//     return square;
//   }

//   /**
//    * Crea una griglia in base al numero di celle dato
//    * @param {number} squaresNumber // numero di quadrati da creare nella griglia
//    * @returns {HTMLDivElement[]} // mi ritorna un array di div
//    */
//   function createGrid(squaresNumber){
//     const grid = [];
//     for (let i = 1; i <= squaresNumber; i++) {
//       const newSquare = singleSquareGenerator(i, squaresNumber);

//       grid.push(newSquare);
//     }
//     return grid;
//   }

//   const gridList = createGrid(squareGenerator);

//   console.log(gridList);
//   gridPrint(gridContainer, gridList);

//   /**
//    * @param {HTMLElement} container // la lista dei quadrati
//    * @param {HTMLDivElement[]} squaresList // array quadrati div
//    */
//   function gridPrint(container, squaresList){
//     // reset html
//     container.innerHTML = "";
//     for (let i = 0; i < squaresList.length; i++) {
//       container.append(squaresList[i]);
//     }
//   }
// }