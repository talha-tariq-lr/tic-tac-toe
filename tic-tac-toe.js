const Game = function (){
    let turn = 0;

    let won = false;

    let winningStrings = ['XXX', 'OOO'];

    gridArray = [];

    const initGrid = function() {
        for (let i=0; i<9; i++)
        gridArray.push(' ');
    }
    
    initGrid();

    const getSymbol = function(turnNum) {
        if (turnNum == 0) {
            return 'X';
        }
        else if (turnNum == 1) {
            return 'O';
        }
    }

    const updateTurn = function() {
        if (turn == 0) {
            turn = 1;
        }
        else if (turn == 1) {
            turn = 0;
        }
    }

    const makeTurn = function(indexNum) {
        console.log(getSymbol(turn));
        console.log('indexNum', indexNum);

        gridArray[indexNum] = getSymbol(turn);
        updateTurn();

        console.log(gridArray);

        return checkWin();
    }

    const checkWin = function() {
        for (let row=0; row<3; row++) {
            rowStr = '';
            colStr = '';
            for (let i=row*3; i<row*3 + 3; i++) {
                rowStr += gridArray[i];
            }

            if (winningStrings.includes(rowStr)) {
                return winningStrings.indexOf(rowStr);
            }

            for (let c=row; c<=row+6; c+=3) {
                colStr += gridArray[c];
                console.log(c);
            }

            if (winningStrings.includes(colStr)) {
                return winningStrings.indexOf(colStr);
            }
        }

        xStr1 = gridArray[0] + gridArray[4] + gridArray[8];
        if (winningStrings.includes(xStr1)) {
            return winningStrings.indexOf(xStr1);
        }

        xStr2 = gridArray[2] + gridArray[4] + gridArray[6];
        if (winningStrings.includes(xStr2)) {
            return winningStrings.indexOf(xStr2);
        }

        return -1;
    }

    const getTurn = function() {
        return turn;
    }

    const getGridVal = function(indexNum) {
        return gridArray[indexNum];
    }

    const resetGrid = function() {
        gridArray = [];
        initGrid();
    }

    return {makeTurn, getTurn, getGridVal, resetGrid, gridArray, won}
}();




const Grid = function() {

    let displayGrid = document.querySelector('#grid');

    let symbol_O = "url('https://img.icons8.com/?size=100&id=Y56BOL5zVXx6&format=png&color=228BE6')";

    let symbol_X = "url('https://upload.wikimedia.org/wikipedia/commons/5/5f/Red_X.svg')";

    let symbolImages = [symbol_X, symbol_O]

    const init = function() {

        for (let i=0; i<9; i++) {
            let gridSpace = document.createElement('div');
            gridSpace.style.width = '50px';
            gridSpace.style.height = '50px';
            gridSpace.style.borderStyle = 'solid';

            gridSpace.setAttribute('id', `box${i}`)

            gridSpace.addEventListener('click', makeTurn);
            displayGrid.appendChild(gridSpace);
        }
    }

    const makeTurn = function(e) {

        if (Game.won) {
            return null;
        }

        let boxNum = parseInt(e.target.id.slice(3));

        console.log(Game.getGridVal(boxNum));
        console.log(Game.gridArray);

        if (Game.getGridVal(boxNum) == ' ') {
            e.target.style.backgroundColor = 'unset';
            e.target.style.backgroundImage = symbolImages[Game.getTurn()];
            e.target.style.backgroundSize = 'cover';
            
            let result = Game.makeTurn(boxNum);
            if (result != -1) {
                UI.score[result] += 1;
                UI.updateScore();

                Game.won = true;
            }
        }
    }

    const resetGrid = function() {
        for (child of displayGrid.childNodes) {
            if (child.id != null) {
                if (child.id.slice(0,3) == 'box') {
                child.style.backgroundImage = '';
            }
            }
        }
    }


    return {init, resetGrid};
}();

const UI = function() {
    let uiDiv = document.querySelector('#UI');
    let resetButton = document.createElement('button');
    resetButton.textContent = 'Reset Grid';

    let resetGameButton = document.createElement('button');
    resetGameButton.textContent = 'Reset Game';

    let score = [0, 0];

    let p1Score = document.querySelector('#p1Score');
    let p2Score = document.querySelector('#p2Score');

    const resetGrid = function() {
        Game.resetGrid();
        Grid.resetGrid();
        Game.won = false;
    }

    const updateScore = function() {
        p1Score.textContent = score[0];

        p2Score.textContent = score[1];

        console.log(score);
    }

    const resetGame = function () {
        resetGrid();

        score[0] = 0;
        score[1] = 0;

        updateScore();
    }

    resetButton.addEventListener('click', resetGrid);

    resetGameButton.addEventListener('click', resetGame);

    uiDiv.appendChild(resetButton);

    uiDiv.appendChild(resetGameButton);
    
    console.log('exdecuted?')


    return {score, updateScore}
}();

Grid.init();



// changing order of players

