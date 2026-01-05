const gameCells = document.querySelectorAll('.cell');
const player1 = document.querySelector('.player1');
const player2 = document.querySelector('player2');
const restartBtn = document.querySelector('restartBtn');

//Making veriables
let currentPlayer = 'X';
let nextPlayer = 'O';
let playerTurn = currentPlayer;

//Function to start your game
const startGame = () => {
    gameCells.forEach(cell => {
        cell.addEventListener('click', handleClick);
    });
}

const handleClick = (e) => {
    if (e.target.textContent === '')
            {
                e.target.textContent = playerTurn;
                if(checkWin())
                {
                    console.log(`${playerTurn} is a Winner !`);
                    disableCells();
                }
                else if (checkTie())
                {
                    console.log(`It's a Tie !`);
                    disableCells();
                }
                else
                {
                    changePlayersTurn();
                }
            }
}

//function to change player's Turn
const changePlayersTurn = () => {
    if (playerTurn === currentPlayer)
    {
        playerTurn = nextPlayer;
    }
    else
    {
        playerTurn = currentPlayer;
    }
}

//function to check win 
const checkWin = () => {
    const winningConditions = 
    [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for(let i=0; i < winningConditions.length; i++)
    {
        const [pos1, pos2, pos3] = winningConditions[i];
        
        if (gameCells[pos1].textContent !== '' && gameCells[pos1].textContent === gameCells[pos2].textContent && gameCells[pos2].textContent === gameCells[pos3].textContent)
        {
            return true;
        }
    }

    return false;
}
//Funtion to check for a tie
const checkTie = () => {
    let emptyCellsCount = 0;
    gameCells.forEach(cell => {
        if (cell.textContent === '') 
        {
            emptyCellsCount++;
        }
    })
    return emptyCellsCount === 0 && checkWin();
}

//Function to disable game-board cells after a win or tie
const disableCells = () => {
    gameCells.forEach(cell => {
        cell.removeEventListener('click', handleClick);
        cell.classList.add('disabled');
    });
}

//Funtion to restart game


startGame();