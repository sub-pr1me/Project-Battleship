import { Ship } from "./src/index.js";
import { Gameboard } from "./src/index.js";

test('Ship sinking logic', () => {
    let quad = Ship(4);
    quad.hit();
    expect(quad.hits).toBe(1);
    expect(quad.sunk).toBe(false);
    quad.hit();
    expect(quad.hits).toBe(2);
    expect(quad.sunk).toBe(false);
    quad.hit();
    expect(quad.hits).toBe(3);
    expect(quad.sunk).toBe(false);
    quad.hit();    
    expect(quad.hits).toBe(4);
    expect(quad.sunk).toBe(true);
});

test('Gameboard logic', () => {
    let playerA = Gameboard('Adolf');

    //test name & empty board

    expect(playerA.name).toBe('Adolf');
    expect(playerA.board.length).toBe(10);
    expect(playerA.board[0].length).toBe(10);

    playerA.addShip(4,5,5,0);

    //test ship-1 board display

    expect(playerA.board[5][5]).toBe(1);
    expect(playerA.board[6][5]).toBe(1);
    expect(playerA.board[7][5]).toBe(1);
    expect(playerA.board[8][5]).toBe(1);

    //test fleet data

    expect(playerA.fleet.length).toBe(1);
    expect(playerA.fleet[0][0].length).toBe(4);

    playerA.receiveAttack(8,5);

    //test ship-1 attack reception

    expect(playerA.board[8][5]).toBe(2);
    expect(playerA.fleet[0][0].hits).toBe(1);

    playerA.receiveAttack(7,5);
    playerA.receiveAttack(6,5);
    playerA.receiveAttack(5,5);

    expect(playerA.board[7][5]).toBe(2);
    expect(playerA.board[6][5]).toBe(2);
    expect(playerA.board[5][5]).toBe(2);
    expect(playerA.fleet[0][0].hits).toBe(4);
    expect(playerA.fleet[0][0].sunk).toBe(true);

    playerA.receiveAttack(7,6);
    playerA.receiveAttack(6,6);
    playerA.receiveAttack(5,6);

    expect(playerA.board[7][6]).toBe(3);
    expect(playerA.board[6][6]).toBe(3);
    expect(playerA.board[5][6]).toBe(3);
});