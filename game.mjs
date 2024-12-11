//#region
import * as readlinePromises from "node:readline/promises";
const rl = readlinePromises.createInterface({
  input: process.stdin,
  output: process.stdout,
});
//#endregion

let brett = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

import ANSI from "./ANSI.mjs";
import tttb from "./Board.mjs";
let visueltBrett = [
  [" ", " ", " "],
  [" ", " ", " "],
  [" ", " ", " "],
];
//#region Logikken for spillet tre på rad. --------------------------------------------------------

const spiller1 = 1;
const spiller2 = -1;

let resultatAvSpill = "";
let spiller = spiller1;
let isGameOver = false;
let spiller1Name = "";
let spiller2Name = "";

spiller1Name = await rl.question("hva heter du spiller1?\n");
spiller2Name = await rl.question("hva heter du spiller2?\n");

while (isGameOver == false) {
  console.log(ANSI.CLEAR_SCREEN, ANSI.CURSOR_HOME);
  visBrett(visueltBrett);
  harNoenVunnet(brett);
  console.log(`Det er spiller ${spillerNavn()} sin tur`);

  let rad = -1;
  let kolone = -1;

  do {
    let pos = await rl.question("Hvor setter du merket ditt?\n");
    [rad, kolone] = pos.split(",");
    rad = rad - 1;
    kolone = kolone - 1;
    console.log(rad, kolone);
  } while (brett[rad][kolone] != 0);

  //sender info til visuelt brett
  if (spiller == 1) {
    visueltBrett[rad][kolone] = "X";
  } else if (spiller == -1) {
    visueltBrett[rad][kolone] = "O";
  }

  //sender info til utregningsbrettet
  brett[rad][kolone] = spiller;

  let vinner = harNoenVunnet(brett);
  if (vinner != 0) {
    isGameOver = true;
    resultatAvSpill = `Vinneren er ${spillerNavn(vinner)}`;
  } else if (erSpilletUavgjort(brett)) {
    resultatAvSpill = "Det ble uavgjort";
    isGameOver = true;
  }

  byttAktivSpiller();
}

console.log(ANSI.CLEAR_SCREEN, ANSI.CURSOR_HOME);
visBrett(visueltBrett);
console.log(resultatAvSpill);
console.log("Game Over");
process.exit();

//#endregion---------------------------------------------------------------------------------------

function harNoenVunnet(brett) {
  //vannrett
  for (let rad = 0; rad < brett.length; rad++) {
    let sum = 0;
    for (let kolone = 0; kolone < brett.length; kolone++) {
      sum += brett[rad][kolone];
    }

    if (Math.abs(sum) == 3) {
      return sum / 3;
    }
  }

  //loddrett
  for (let kolone = 0; kolone < brett.length; kolone++) {
    let sum = 0;
    for (let rad = 0; rad < brett.length; rad++) {
      sum += brett[rad][kolone];
    }

    if (Math.abs(sum) == 3) {
      return sum / 3;
    }
  }

  //diagonalt
  let sum = 0;

  sum += brett[0][0];
  sum += brett[1][1];
  sum += brett[2][2];

  if (Math.abs(sum) == 3) {
    return sum / 3;
  }

  //diagonalt2
  let sumTo = 0;
  sumTo += brett[0][2];
  sumTo += brett[1][1];
  sumTo += brett[2][0];

  if (Math.abs(sum) == 3) {
    return sum / 3;
  }
  return 0;
}

function erSpilletUavgjort(brett) {
  // Dersom alle felter er fylt så er spillet over.
  for (let rad = 0; rad < brett.length; rad++) {
    for (let kolone = 0; kolone < brett[rad].length; kolone++) {
      if (brett[rad][kolone] == 0) {
        // Dersom vi finner 0 på rad,kolonne så er ikke brettet fylt.
        return false;
      }
    }
  }

  return true;
}

function visBrett(visueltBrett) {
  console.log(tttb(visueltBrett));

  /* let visningAvBrett = "_______\n";
  for (let i = 0; i < brett.length; i++) {
    const rad = brett[i];
    let visningAvRad = "|";
    for (let j = 0; j < rad.length; j++) {
      let verdi = rad[j];
      if (verdi == 0) {
        visningAvRad += "_";
      } else if (verdi == spiller1) {
        visningAvRad += ANSI.COLOR.GREEN + "X" + ANSI.COLOR_RESET;
      } else {
        visningAvRad += ANSI.COLOR.RED + "O" + ANSI.COLOR_RESET;
      }
      visningAvRad += "|";
    }
    visningAvRad += "\n";
    visningAvRad += "_______\n";
    visningAvBrett += visningAvRad;
  }

  console.log(visningAvBrett);
  */
}

function spillerNavn(sp = spiller) {
  if (sp == spiller1) {
    return "Spiller 1(X)";
  } else {
    return "Spiller 2(O)";
  }
}

function byttAktivSpiller() {
  spiller = spiller * -1;
  /* if (spiller == spiller1) {
         spiller = spiller2
     } else {
         spiller = spiller1;
     }*/
}
function restartSpill() {}

function avluttSpill() {
  q = process.exit;
}
