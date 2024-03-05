let player1 = 'R';
let player2 = 'Y';
let curPlayer = player1;

let gameOver = false;
let board;
let colLowest;

let rows = 6;
let cols = 7;

window.onload = function() {
    setGame();
}

function setGame() {
    board = [];
    colLowest = [5, 5, 5, 5, 5, 5, 5]

    for (let r = 0; r < rows; r++){
        let row = [];
        for (let c = 0; c < cols; c++){
            //Javascript
            row.push(' ');

            //HTML
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.addEventListener("click", setPiece);
            document.getElementById("board").append(tile);
        }
        board.push(row);
    } 
    let gamestate = document.getElementById("gamestate");
    document.getElementById("gamestate").style.color = "blue";
    gamestate.innerText = "Click on the column you wish to place your disk at!";
}

function setPiece() {
    if (gameOver) {
        return;
    }

    let coords = this.id.split("-"); //Splits tile ID into an array of the row and column
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    r = colLowest[c]; //Sets row to be lowest available row

    if(r < 0) {
        return;
    }

    colLowest[c]-= 1; //update arrays

    board[r][c] = curPlayer;
    let tile = document.getElementById(r.toString() + "-" + c.toString());
    if (curPlayer === player1) {
        tile.classList.add("red-piece")
        curPlayer = player2;
        gamestate.innerText = "Player 2's Turn";
        document.getElementById("gamestate").style.color = "darkgoldenrod";
    } else {
        tile.classList.add("yellow-piece")
        curPlayer = player1;
        gamestate.innerText = "Player 1's Turn";
        document.getElementById("gamestate").style.color = "darkred";
    }

    checkWinner();
}

function checkWinner() {
    //Check horizontally
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols - 3; c++) {
            if(board[r][c] !== ' ' && board[r][c] === board[r][c+1] && board[r][c] === board[r][c+2] && board[r][c] === board[r][c+3]) {
                setWinner(r, c);
                return;
            }
        }
    }
    //Check vertically
    for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows - 3; r++) {
            if(board[r][c] !== ' ' && board[r][c] === board[r+1][c] && board[r][c] === board[r+2][c] && board[r][c] === board[r+3][c]) {
                setWinner(r, c);
                return;
            }
        }
    }
    //Check diagonally
    for (let r = 0; r < rows - 3; r++) {
        for (let c = 0; c < cols - 3; c++) {
            if(board[r][c] !== ' ' && board[r][c] === board[r+1][c+1] && board[r][c] === board[r+2][c+2] && board[r][c] === board[r+3][c+3]) {
                setWinner(r, c);
                return;
            }
        }
    }
    //Check antidiagonally
    for (let r = 3; r < rows; r++) {
        for (let c = 0; c < cols - 3; c++) {
            if(board[r][c] !== ' ' && board[r][c] === board[r-1][c+1] && board[r][c] === board[r-2][c+2] && board[r][c] === board[r-3][c+3]) {
                setWinner(r, c);
                return;
            }
        }
    }


}

function setWinner(r, c) {
    if (board[r][c] === player1) {
        gamestate.innerText = "Player 1 Wins!"
        document.getElementById("gamestate").style.color = "red";
    } else {
        gamestate.innerText = "Player 2 Wins!"
        document.getElementById("gamestate").style.color = "goldenrod";
    }
    document.getElementById("gamestate").style.scale = 1.5;

    gameOver = true;

}