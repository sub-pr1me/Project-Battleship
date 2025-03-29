
function Ship(length) {
    return {
        length,
        hits: 0,
        sunk: false,
        hit: function() {
            this.hits++;
            if (this.hits >= this.length) {this.sunk = true};
        }
    };
};

function Gameboard(name) {
    let fleet = [];
    let board = [];
    let size = 10;
    for (let i=0; i<size; i++) {
        board.push([])
        for (let k=0; k<size; k++) {
            board[i].push(0);// 0-empty, 1-ship, 2-hit 3-miss 4-empty
        };
    };

    function placeRandomShips() {
        while (fleet.length < 1) {
            addShip(4,Math.floor(Math.random()*10),Math.floor(Math.random()*10),Math.floor(Math.random()*2));
        };
        while (fleet.length < 3) {
            addShip(3,Math.floor(Math.random()*10),Math.floor(Math.random()*10),Math.floor(Math.random()*2));
        };
        while (fleet.length < 6) {
            addShip(2,Math.floor(Math.random()*10),Math.floor(Math.random()*10),Math.floor(Math.random()*2));
        };
        while (fleet.length < 10) {
            addShip(1,Math.floor(Math.random()*10),Math.floor(Math.random()*10),Math.floor(Math.random()*2));
        };
    };

    function determineLimits(x,y) {
        let limits = {};
        if (x === 0) {limits.left = true};
        if (x === 9) {limits.right = true};
        if (y === 0) {limits.top = true};
        if (y === 9) {limits.bottom = true};
        return limits;
    };

    function checkPlacementValidity(x,y) {
        if (board[x][y]) {
            return false;
        };
        let limits = determineLimits(x,y);
        if (limits.top && !limits.left && !limits.right) {
            if (board[x+1][y] === 1
                || board[x+1][y+1] === 1
                || board[x-1][y] === 1
                || board[x-1][y+1] === 1
                || board[x][y+1] === 1) {
                return false;
            };
        };
        if (limits.right && !limits.top && !limits.bottom) {
            if (board[x-1][y] === 1
                || board[x-1][y+1] === 1
                || board[x-1][y-1] === 1
                || board[x][y+1] === 1
                || board[x][y-1] === 1) {
                return false;
            };
        };
        if (limits.bottom && !limits.left && !limits.right) {
            if (board[x+1][y] === 1
                || board[x+1][y-1] === 1
                || board[x-1][y] === 1
                || board[x-1][y-1] === 1
                || board[x][y-1] === 1) {
                return false;
            };
        };
        if (limits.left && !limits.top && !limits.bottom) {
            if (board[x+1][y] === 1
                || board[x+1][y+1] === 1
                || board[x+1][y-1] === 1
                || board[x][y+1] === 1
                || board[x][y-1] === 1) {
                return false;
            };
        };
        if (limits.top && limits.left) {
            if (board[x+1][y] === 1
                || board[x+1][y+1] === 1
                || board[x][y+1] === 1) {
                return false;
            };
        };        
        if (limits.top && limits.right) {
            if (board[x-1][y] === 1
                || board[x-1][y+1] === 1
                || board[x][y+1] === 1) {
                return false;
            };
        };    
        if (limits.bottom && limits.left) {
            if (board[x+1][y] === 1
                || board[x+1][y-1] === 1
                || board[x][y-1] === 1) {  
                return false;
            };
        };    
        if (limits.bottom && limits.right) {
            if (board[x-1][y] === 1
                || board[x-1][y-1] === 1
                || board[x][y-1] === 1) {
                return false;
            };
        };
        if (!limits.top && !limits.bottom && !limits.left && !limits.right) {
            if (board[x+1][y] === 1
                || board[x+1][y+1] === 1
                || board[x+1][y-1] === 1
                || board[x-1][y] === 1
                || board[x-1][y+1] === 1
                || board[x-1][y-1] === 1
                || board[x][y+1] === 1
                || board[x][y-1] === 1) {
                return false;
            };
        };
        return true;
    };

    function addShip(size,x,y,orientation) { //orientation: 0-horizontal, 1-vertical
        let ship = [];
        let coordinates = [];
        ship.push(Ship(size));

        let valid = 0;
        if (!orientation && x+size <= 10) {
            if (checkPlacementValidity(x,y)) valid++;
            for (let i=1; i<size; i++) {
                if (checkPlacementValidity(x+i,y)) valid++;
            };  
        } else if (orientation && y+size <= 10) {
            if (checkPlacementValidity(x,y)) valid++;
            for (let i=1; i<size; i++) {
                if (checkPlacementValidity(x,y+i)) valid++;
            };
        };
        if (valid && valid === size) {
            if (!orientation) {
                board[x][y] = 1;
                let coorString = `${x}${y}`;
                coordinates.push(coorString);
                for (let i=1; i<size; i++) {
                    board[x+i][y] = 1;
                    coorString = `${x+i}${y}`;
                    coordinates.push(coorString);                                        
                };
            } else if (orientation){
                board[x][y] = 1;
                let coorString = `${x}${y}`;
                coordinates.push(coorString);
                for (let i=1; i<size; i++) {
                    board[x][y+i] = 1;
                    coorString = `${x}${y+i}`;
                    coordinates.push(coorString);
                };
            };
        };
        if (valid && valid === size) {
            ship.push(coordinates);
            fleet.push(ship);
        };        
    };

    function checkIfAllSunk() {
        let allSunk = 1;
        for (let item of fleet) {
            if (!item[0].sunk) {
                allSunk--;
                break;
            };
        };
        if (allSunk) {
            console.log(`ALL ${this.name}'S SHIPS HAVE BEEN SUNK`);
            return true;
        };
    };

    return {
        fleet,
        board,
        name,
        placeRandomShips,
        addShip,
        checkIfAllSunk
    };
};

function Player(name, type) {
    const data = Gameboard(name);    
    return {
        type,
        data
    };
};

export { Ship, Gameboard, Player };