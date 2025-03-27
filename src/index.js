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
    obj.nameTwo.textContent = 'COMPUTER';
    let p1type = 'human';
    let p2type = 'computer';
        // create players boards
    let p1 = Player(obj.nameOne.textContent, p1type);
    let p2 = Player(obj.nameTwo.textContent, p2type);
    obj.btnDiv.removeChild(obj.start);
    //  place ships
    p1.data.addShip(4,1,1,1);
    p1.data.addShip(3,5,5,0);
    p1.data.addShip(3,3,6,1);
    p1.data.addShip(2,7,2,0);
    p1.data.addShip(2,0,6,0);
    p1.data.addShip(2,5,8,1);
    p1.data.addShip(1,0,9,0);
    p1.data.addShip(1,8,8,0);
    p1.data.addShip(1,5,0,0);
    p1.data.addShip(1,4,2,0);

    p2.data.addShip(4,8,1,1);
    p2.data.addShip(3,2,4,0);
    p2.data.addShip(3,1,7,0);
    p2.data.addShip(2,4,0,1);
    p2.data.addShip(2,1,2,0);
    p2.data.addShip(2,5,8,1);
    p2.data.addShip(1,5,6,0);
    p2.data.addShip(1,7,7,0);
    p2.data.addShip(1,0,0,0);
    p2.data.addShip(1,6,3,0);

    obj.boardRefresh(p1, 'one');
    obj.boardP2.classList.add('activeBoard');

    //first computer move logic
    
    if (p1.type === 'computer' && whosTurn === 'one') {
        whosTurn = obj.receiveAttack(Math.floor(Math.random()*10), Math.floor(Math.random()*10), whosTurn, p2);
        obj.boardRefresh(p2, 'two');
    };
    if (p2.type === 'computer' && whosTurn === 'two') {
        whosTurn = obj.receiveAttack(Math.floor(Math.random()*10), Math.floor(Math.random()*10), whosTurn, p1);
        obj.boardRefresh(p1, 'two');
    };

    obj.cells.forEach((cell) => {
        if (!cell.id.includes(whosTurn)) {
            cell.classList.toggle('unopened');
        };
        cell.addEventListener('click', (e) => {
            console.log('click');
            if (whosTurn && !e.target.id.includes(whosTurn)) {
                if (whosTurn === 'one' && p1.type === 'human') {
                    whosTurn = obj.receiveAttack(cell.id[3], cell.id[4], whosTurn, p2);
                    obj.boardRefresh(p2, 'two');
                } else if (whosTurn === 'two' && p2.type === 'human') {
                    whosTurn = obj.receiveAttack(cell.id[3], cell.id[4], whosTurn, p1);
                    obj.boardRefresh(p1, 'one');
                };
                //sequential computer moves logic
                while (p1.type === 'computer' && whosTurn === 'one') {
                    console.log('moved');
                    whosTurn = obj.receiveAttack(Math.floor(Math.random()*10), Math.floor(Math.random()*10), whosTurn, p2);
                    obj.boardRefresh(p2, 'two');
                };
                while (p2.type === 'computer' && whosTurn === 'two') {
                    console.log('moved');
                    whosTurn = obj.receiveAttack(Math.floor(Math.random()*10), Math.floor(Math.random()*10), whosTurn, p1);
                    obj.boardRefresh(p1, 'one');
                };
                
                if (!whosTurn) {
                    console.log('GAME OVER');
                    obj.start.textContent = 'AGAIN';
                    obj.btnDiv.appendChild(obj.start);
                    obj.boardP1.classList.remove('activeBoard');
                    obj.boardP2.classList.remove('activeBoard');
                };
            };
        });
    });
});