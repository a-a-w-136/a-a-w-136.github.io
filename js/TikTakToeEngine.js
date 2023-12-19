import { GameBoard, AI, TestSuite } from "./TikTakToe.js";

class Engine{
    #gameBoard;
    #ai;
    #humanMarker;
    #aiMarker;
    constructor(document)
    {
        this.#ai = new AI();
        this.document = document;
    }
    StartCpuFirst()
    {
        // reset the board. html
        this.#ResetBoard();
        this.#aiMarker = "X";
        this.#humanMarker = "O";

        // Initialise game board
        this.#gameBoard = new GameBoard();

        // get move from ai
        let aiMove = this.#ai.GetNextMove(this.#gameBoard);

        // set game board
        this.#gameBoard.MakeMove(aiMove);

        // Mark the game board with the square
        this.document.getElementById(aiMove).innerHTML = this.#aiMarker;
        // Update statistics
        this.#UpdateStatistics();
    }
    StartHumanFirst()
    {
        // reset the board.
        this.#ResetBoard();
        this.#aiMarker = "O";
        this.#humanMarker = "X";
        // Initialise game board
        this.#gameBoard = new GameBoard();
    }
    MakeMove(humanMove)
    {
        // Check for game over.
        if(this.#IsGameOver())
        {
            return;
        }

        if(this.#gameBoard.MakeMove(humanMove) === true)
        {
            // Mark the board with square
            this.document.getElementById(humanMove).innerHTML = this.#humanMarker;
            // Check for game over // Update statistics
            if(this.#IsGameOver())
            {
                this.#UpdateStatistics();
                return;
            }
            // get the ai move
            let aiMove = this.#ai.GetNextMove(this.#gameBoard);
            this.#gameBoard.MakeMove(aiMove);
             // Mark the board with aiMove
            this.document.getElementById(aiMove).innerHTML = this.#aiMarker;
            // Update statistics
            this.#UpdateStatistics();
        }
    }
    #ResetBoard()
    {
        let squares = document.getElementsByClassName("Square");
        for(let square = 0; square < squares.length; square++)
        {
            squares[square].innerHTML = "";
        }
    }
    #UpdateStatistics()
    {
        let moves = new Array();
        let moveNumber = 1;
        let move = this.#gameBoard.GetMove(moveNumber);
        while(move !== undefined)
        {
            moves.push(move);
            moveNumber++;
            move = this.#gameBoard.GetMove(moveNumber);
        }
        let outcomes = this.#ai.GetOutcomes(moves);
        let total = outcomes[0] + outcomes[1] + outcomes[2];
        let draw = outcomes[0] / total;
        let xWins = outcomes[1] / total;
        let oWins = outcomes[2] / total;

        this.document.getElementById("xWins").innerHTML = (xWins.toFixed(2) * 100) + "%";
        this.document.getElementById("oWins").innerHTML = (oWins.toFixed(2) * 100) + "%";
        this.document.getElementById("draw").innerHTML = (draw.toFixed(2) * 100) + "%";
    }
    #IsGameOver()
    {
        if(this.#gameBoard.GetOutcome() === 0)
        {
            return true;
        }
        else if(this.#gameBoard.GetOutcome() === 1)
        {
            return true;
        }
        else if(this.#gameBoard.GetOutcome() === 2)
        {
            return true;
        }
        else{
            return false;
        }
    }
}

const engine = new Engine(document);
window.engine = engine;

var tes = new TestSuite();
tes.RunTests();


