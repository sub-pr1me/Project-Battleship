import { Ship } from "./scripts.js";
import { Gameboard } from "./scripts.js";
import { Player } from "./scripts.js";

const obj = (function () {
    return {
        start: document.getElementById('start'),
        btnDiv: document.getElementById('btn_container'),
        nameOne: document.getElementById('p1'),
        nameTwo: document.getElementById('p2'),
        cells: document.querySelectorAll('.cell'),
        boardP1: document.getElementById('player1'),
        boardP2: document.getElementById('player2'),
        
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
                                    cell.classList.remove('unopened');
                                };
                            });
                        } else if (board[h][v] === 3) {
                            this.cells.forEach((cell) => {
                                if (cell.id === `${tag}${h}${v}`) {
                                    cell.classList.add('miss');
                                    cell.textContent = '•';
                                    cell.classList.remove('unopened');
                                };
                            });                            
                        } else if (board[h][v] === 4) {
                            this.cells.forEach((cell) => {
                                if (cell.id === `${tag}${h}${v}`) {
                                    cell.classList.add('empty');
                                    cell.textContent = '•';
                                    cell.classList.remove('unopened');
                                };
                            });                            
                        };
                    };
                };  
            };
        },

        revealAdjacent: function (x,y,victim) {
            let board = victim.data.board;
            //diagonal adjacent
            if (x > 0 && y > 0 && board[parseInt(x)-1][parseInt(y)-1] == 0) board[parseInt(x)-1][parseInt(y)-1] = 4;            
            if (x < 9 && y > 0 && board[parseInt(x)+1][parseInt(y)-1] == 0) board[parseInt(x)+1][parseInt(y)-1] = 4;
            if (x < 9 && y < 9 && board[parseInt(x)+1][parseInt(y)+1] == 0) board[parseInt(x)+1][parseInt(y)+1] = 4;
            if (x > 0 && y < 9 && board[parseInt(x)-1][parseInt(y)+1] == 0) board[parseInt(x)-1][parseInt(y)+1] = 4;
            //non-diagonal adjacent
            for (let item of victim.data.fleet) {
                if (item[1].includes(`${x}${y}`)) {
                    if (item[0].sunk) {
                        for (let element of item[1]) {
                            let h = parseInt(element[0]);
                            let v = parseInt(element[1]);
                            if (y > 0 && v > 0 && board[h][v-1] == 0) board[h][v-1] = 4;
                            if (x < 9 && h < 9 && board[h+1][v] == 0) board[h+1][v] = 4;
                            if (y < 9 && v < 9 && board[h][v+1] == 0) board[h][v+1] = 4;
                            if (x > 0 && h > 0 && board[h-1][v] == 0) board[h-1][v] = 4;
                        };                        
                    };
                };
            };
        },

        receiveAttack: function (x,y,attacker, attacker_type, victim) {
            let board = victim.data.board;
            if (board[x][y] === 0) {
                board[x][y] = 3;
                if (attacker_type !== 'computer' && victim.type !== 'computer') {
                    for (let item of this.cells) {
                        if (!item.classList.contains('hit')
                        && !item.classList.contains('miss')
                        && !item.classList.contains('empty')) {
                            item.classList.toggle('unopened');
                        };
                    };
                };                
                this.boardP1.classList.toggle('activeBoard');
                this.boardP2.classList.toggle('activeBoard');
                if (attacker === 'one') return 'two';
                if (attacker === 'two') return 'one';
            } else if (board[x][y] === 1) {
                board[x][y] = 2;
                for (let item of victim.data.fleet) {
                    if (item[1].includes(`${x}${y}`)) {
                        item[0].hit();
                        if (victim.data.checkIfAllSunk()) {
                            return 0;
                        };
                    };
                };                
            };
            if (board[x][y] === 4 || board[x][y] === 3 && board[x][y] !== 2) {
                return attacker;
            };
            this.revealAdjacent(x,y,victim);
            return attacker;
        },
    };
})();

export { obj };