import { Ship } from "./scripts.js";
import { Gameboard } from "./scripts.js";
import { Player } from "./scripts.js";

const obj = (function () {
    return{
        start: document.getElementById('start'),
        btnDiv: document.getElementById('btn_container'),
        nameOne: document.getElementById('p1'),
        nameTwo: document.getElementById('p2'),
        cells: document.querySelectorAll('.cell')
    };
})();

export { obj };