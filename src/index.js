import "./styles.css";
import { Player } from "./scripts.js";
import { obj } from "./DOM.js";

obj.start.addEventListener('click', () => {
    //clear previous game data
    for (let item of obj.cells) {
        item.classList.remove('ship');
        item.classList.remove('hit');
        item.classList.remove('miss');
        item.classList.remove('unopened');
        item.classList.remove('empty');
        item.textContent = '';
    };
    //start the game
        let whosTurn = 'one';
        //  prompt players names & if human/bot (predetermined for now)
    obj.nameOne.textContent = 'PLAYER-1';
    obj.nameTwo.textContent = 'PLAYER-2';
    let p1type = 'human';
    let p2type = 'human';
        // create players boards
    let p1 = Player(obj.nameOne.textContent, p1type);
    let p2 = Player(obj.nameTwo.textContent, p2type);
    obj.btnDiv.removeChild(obj.start);
        //  place ships
    p1.data.placeRandomShips();
    p2.data.placeRandomShips();
    obj.boardRefresh(p1, 'one');
    obj.boardP2.classList.add('activeBoard');

    //first computer move logic
    let availableComputerMoves = [];
    for (let a = 0; a < 10; a++) {
        for (let b = 0; b < 10; b++) {
            availableComputerMoves.push(`${a}${b}`);
        };
    };
        
    if (p1.type === 'computer' && whosTurn === 'one') {
        let firstStrike = availableComputerMoves.splice(Math.floor(Math.random()*availableComputerMoves.length),1);
        whosTurn = obj.receiveAttack(firstStrike[0][0], firstStrike[0][1], whosTurn, p1.type, p2);
        obj.boardRefresh(p2, 'two');
    };
    
    obj.cells.forEach((cell) => {
        if (!cell.id.includes(whosTurn)) {
            cell.classList.toggle('unopened');
        };
        cell.addEventListener('click', (e) => {
            if (whosTurn && !e.target.id.includes(whosTurn)) {
                if (whosTurn === 'one' && p1.type === 'human') {
                    whosTurn = obj.receiveAttack(cell.id[3], cell.id[4], whosTurn, p1.type, p2);
                    obj.boardRefresh(p2, 'two');
                } else if (whosTurn === 'two' && p2.type === 'human') {
                    whosTurn = obj.receiveAttack(cell.id[3], cell.id[4], whosTurn, p2.type, p1);
                    obj.boardRefresh(p1, 'one');
                };
                //sequential computer moves logic
                setTimeout(() => {
                while (p1.type === 'computer' && whosTurn === 'one') {
                    let nextStrike = availableComputerMoves.splice(Math.floor(Math.random()*availableComputerMoves.length),1);
                    while (p2.data.board[nextStrike[0][0]][nextStrike[0][1]] == 4) {
                        nextStrike = availableComputerMoves.splice(Math.floor(Math.random()*availableComputerMoves.length),1);
                    };
                    whosTurn = obj.receiveAttack(nextStrike[0][0], nextStrike[0][1], whosTurn, p1.type, p2);
                    obj.boardRefresh(p2, 'two');
                };
                }, 700);
                setTimeout(() => {
                    while (p2.type === 'computer' && whosTurn === 'two') {
                        let nextStrike = availableComputerMoves.splice(Math.floor(Math.random()*availableComputerMoves.length),1);
                        while (p1.data.board[nextStrike[0][0]][nextStrike[0][1]] == 4) {
                            nextStrike = availableComputerMoves.splice(Math.floor(Math.random()*availableComputerMoves.length),1);
                        };
                        whosTurn = obj.receiveAttack(nextStrike[0][0], nextStrike[0][1], whosTurn, p2.type, p1);
                        obj.boardRefresh(p1, 'one');
                    };     
                }, 700);
                
                setTimeout(() => {
                    if (!whosTurn) {
                        console.log('GAME OVER');
                        obj.start.textContent = 'AGAIN';
                        obj.btnDiv.appendChild(obj.start);
                        obj.boardP1.classList.remove('activeBoard');
                        obj.boardP2.classList.remove('activeBoard');
                    };    
                }, 800);
            };
        });
    });
});