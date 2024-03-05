let player1 = 'R';
let player2 = 'Y';
let curPlayer = player1;

let gameOver = false;
let board;
let colLowest;
let playerColor = "lightcoral";

let rows = 6;
let cols = 7;

window.onload = function() {
    setGame();
}

function setGame() {
    board = [];
    colLowest = [5, 5, 5, 5, 5, 5, 5];

    for (let r = 0; r < rows; r++){
        let row = [];
        for (let c = 0; c < cols; c++){
            //Javascript
            row.push(' ');

            //HTML
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.addEventListener("mouseover", highlightSpot);
            tile.addEventListener("mouseout", unhighlightSpot);
            tile.addEventListener("click", setPiece);
            document.getElementById("board").append(tile);
        }
        board.push(row);
    } 
    let gamestate = document.getElementById("gamestate");
    document.getElementById("gamestate").style.color = "blue";
    gamestate.innerText = "Click on the column you wish to place your disk at!";
}

function highlightSpot() {
    if (gameOver) {
        return;
    }

    let coords = this.id.split("-"); //Splits tile ID into an array of the row and column
    let c = parseInt(coords[1]);

    r = colLowest[c]; //Sets row to be lowest available row

    if(r < 0) {
        return;
    }
    
    let tile = document.getElementById(r.toString() + "-" + c.toString());
    if(board[r][c] !== ' ') {
        return;
    } else{
        tile.style.backgroundColor = playerColor;
        for (let i = 0; i < r; i++) {
            let otherTile = document.getElementById(i.toString() + "-" + c.toString());
            otherTile.style.backgroundColor = "lightgray"
        }
    }
}

function unhighlightSpot() {
    if (gameOver) {
        return;
    }

    let coords = this.id.split("-"); //Splits tile ID into an array of the row and column
    let c = parseInt(coords[1]);

    r = colLowest[c]; //Sets row to be lowest available row

    if(r < 0) {
        return;
    }
    
    let tile = document.getElementById(r.toString() + "-" + c.toString());
    if(board[r][c] !== ' ') {
        return;
    } else{
        tile.style.backgroundColor = "white";
        for (let i = 0; i < r; i++) {
            let otherTile = document.getElementById(i.toString() + "-" + c.toString());
            otherTile.style.backgroundColor = "white"
        }
    }

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

    board[r][c] = curPlayer;
    let tile = document.getElementById(r.toString() + "-" + c.toString());
    if (curPlayer === player1) {
        tile.style.backgroundColor = 'red';
        curPlayer = player2;
        gamestate.innerText = "Player 2's Turn";
        document.getElementById("gamestate").style.color = "darkgoldenrod";
        playerColor = "rgb(251,231,161)";
    } else {
        tile.style.backgroundColor = 'yellow';
        curPlayer = player1;
        gamestate.innerText = "Player 1's Turn";
        document.getElementById("gamestate").style.color = "darkred";
        playerColor = "lightcoral";
    }
    r-=1;
    if(r >= 0) {
        let aboveTile = document.getElementById(r.toString() + "-" + c.toString());
        aboveTile.style.backgroundColor = playerColor;
    }
    colLowest[c]-= 1; //update arrays

    checkWinner();
}

function checkWinner() {
    //Check horizontally
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols - 3; c++) {
            if(board[r][c] !== ' ' && board[r][c] === board[r][c+1] && board[r][c] === board[r][c+2] && board[r][c] === board[r][c+3]) {
                setWinner(r, c, "h");
                return;
            }
        }
    }
    //Check vertically
    for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows - 3; r++) {
            if(board[r][c] !== ' ' && board[r][c] === board[r+1][c] && board[r][c] === board[r+2][c] && board[r][c] === board[r+3][c]) {
                setWinner(r, c, "v");
                return;
            }
        }
    }
    //Check diagonally
    for (let r = 0; r < rows - 3; r++) {
        for (let c = 0; c < cols - 3; c++) {
            if(board[r][c] !== ' ' && board[r][c] === board[r+1][c+1] && board[r][c] === board[r+2][c+2] && board[r][c] === board[r+3][c+3]) {
                setWinner(r, c, "d");
                return;
            }
        }
    }
    //Check antidiagonally
    for (let r = 3; r < rows; r++) {
        for (let c = 0; c < cols - 3; c++) {
            if(board[r][c] !== ' ' && board[r][c] === board[r-1][c+1] && board[r][c] === board[r-2][c+2] && board[r][c] === board[r-3][c+3]) {
                setWinner(r, c, "a");
                return;
            }
        }
    }


}

function setWinner(r, c, type) {
    if (board[r][c] === player1) {
        gamestate.innerText = "Player 1 Wins!"
        document.getElementById("gamestate").style.color = "red";
    } else {
        gamestate.innerText = "Player 2 Wins!"
        document.getElementById("gamestate").style.color = "goldenrod";
    }
    document.getElementById("gamestate").style.scale = 1.5;

    document.getElementById(r.toString() + "-" + c.toString()).style.border = "5px solid lime";
    
    if(type === 'h') {
        document.getElementById(r.toString() + "-" + (c+1).toString()).style.border = "5px solid lime";
        document.getElementById(r.toString() + "-" + (c+2).toString()).style.border = "5px solid lime";
        document.getElementById(r.toString() + "-" + (c+3).toString()).style.border = "5px solid lime";
    } else if(type === 'v') {
        document.getElementById((r+1).toString() + "-" + c.toString()).style.border = "5px solid lime";
        document.getElementById((r+2).toString() + "-" + c.toString()).style.border = "5px solid lime";
        document.getElementById((r+3).toString() + "-" + c.toString()).style.border = "5px solid lime";
    } else if(type === 'd') {
        document.getElementById((r+1).toString() + "-" + (c+1).toString()).style.border = "5px solid lime";
        document.getElementById((r+2).toString() + "-" + (c+2).toString()).style.border = "5px solid lime";
        document.getElementById((r+3).toString() + "-" + (c+3).toString()).style.border = "5px solid lime";
    } else {
        document.getElementById((r-1).toString() + "-" + (c+1).toString()).style.border = "5px solid lime";
        document.getElementById((r-2).toString() + "-" + (c+2).toString()).style.border = "5px solid lime";
        document.getElementById((r-3).toString() + "-" + (c+3).toString()).style.border = "5px solid lime";
    }

    gameOver = true;
}