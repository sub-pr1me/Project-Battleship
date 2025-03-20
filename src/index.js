import "./styles.css";

import { Ship } from "./scripts.js";
import { Gameboard } from "./scripts.js";
import { Player } from "./scripts.js";
import { obj } from "./DOM.js";

//start the game
let p1;
let p2;
let whosTurn = 'one';
obj.start.addEventListener('click', () => {
    obj.btnDiv.removeChild(obj.start);
    //  prompt players names & if human/bot (predetermined for now)
    obj.nameOne.textContent = 'PLAYER-1';
    obj.nameTwo.textContent = 'PLAYER-2';
    let p1type = 'human';
    let p2type = 'human';
    // create players boards
    p1 = Player(obj.nameOne.textContent, p1type);
    p2 = Player(obj.nameTwo.textContent, p2type);
    //  place ships

    p1.data.addShip(3,7,5,0);
    p1.data.addShip(2,5,6,0); //this should fail (and it does)

    obj.boardRefresh(p1, whosTurn);
});

//player-1 makes a move
//  player-2 receives attack
//  if hit => paint accordingly
//  if miss => paint accordingly
//  hide player-1 board
//  switch turn to player-2