import { Ship } from "./scripts.js";
import { Gameboard } from "./scripts.js";
import { Player } from "./scripts.js";

const obj = (function () {
    return{
        start: document.getElementById('start'),
        btnDiv: document.getElementById('btn_container'),
        nameOne: document.getElementById('p1'),
        nameTwo: document.getElementById('p2'),
        cells: document.querySelectorAll('.cell'),
        
        boardRefresh: function (player, tag) {
            let board = player.data.board;
            for (let h = 0; h < board.length; h++) {
                for (let v = 0; v < board[h].length; v++) {
                    if (board[h][v]) {
                        if (board[h][v] === 1) {
                            this.cells.forEach((cell) => {
                                if (cell.id === `${tag}${h}${v}`) {
                                    cell.classList.add('ship');
                                };                                
                            });
                        } else if (board[h][v] === 2) {                            
                            this.cells.forEach((cell) => {
                                if (cell.id === `${tag}${h}${v}`) {
                                    cell.classList.add('hit');
                                };
                            });
                        } else if (board[h][v] === 3) {
                            this.cells.forEach((cell) => {
                                if (cell.id === `${tag}${h}${v}`) {
                                    cell.classList.add('miss');
                                };
                            });                            
                        };
                    };
                };  
            };
        }
    };
})();

export { obj };