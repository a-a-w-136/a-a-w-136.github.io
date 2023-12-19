class TikTakToeProgressions
{
    #progressions;
    constructor()
    {
        this.#progressions = this.#CreateGameProgressions();
    }
    GetProgression(index)
    {
        return this.#progressions[index];
    }
    GetNumberOfProgressions()
    {
        return this.#progressions.length;
    }
    #CreateGameProgressions()
    {
        let progessions = new Array();
        this.#CalculateMoves(progessions, 9, 1, 1);
        progessions = this.#CalculateMoves(progessions, 8, 2, 2);
        progessions = this.#CalculateMoves(progessions, 7, 1, 3);
        progessions = this.#CalculateMoves(progessions, 6, 2, 4);
        progessions = this.#CalculateMoves(progessions, 5, 1, 5);
        progessions = this.#CalculateMoves(progessions, 4, 2, 6);
        progessions = this.#CalculateMoves(progessions, 3, 1, 7);
        progessions = this.#CalculateMoves(progessions, 2, 2, 8);
        progessions = this.#CalculateMoves(progessions, 1, 1, 9);

        let gameProgressions = new Array();
        progessions.forEach(progression => { gameProgressions.push(new GameProgression(progression)); });

        return gameProgressions;
    }
    #CalculateMoves(progessions, remainingSquares, player, moveNumber)
    {
        if(remainingSquares === 9)
        {
            for(let firstChoice = 0; firstChoice < remainingSquares; firstChoice++)
            {
                let firstMove = new Move(1, 1, firstChoice);
                progessions.push([firstMove]);
            }
            return;
        }

        // Duplicates each progression in the progressions remainingSquares. Eg if one move has been made duplicate each 8 times as each one will have 8 different next possible moves.
        let completedMoves = 9 - remainingSquares;
        let expandedMovesCollection = new Array();
        for(let y = 0; y < progessions.length; y++)
        {
            for(let j = 0; j < remainingSquares; j++)
            {
                let extendedMoves = new Array();
               for(let p = 0; p < completedMoves; p++)
               {
                    extendedMoves.push(progessions[y][p]);
               }
               expandedMovesCollection.push(extendedMoves);
            }
        }

        for(let start = 0, end = remainingSquares; end <= expandedMovesCollection.length; start += remainingSquares, end += remainingSquares)
        {
            this.#SetMoves(start, end, expandedMovesCollection, player, moveNumber);
        }
        return expandedMovesCollection;
    }
    #SetMoves(start, end, incompleteMovesCollection, player, moveNumber)
    {
        for(let i = start; i < end;) 
            {
                for(let k = 0; k < 9; k++)
                {

                    let occupiedSquares = new Array();
                    for(let j = 0; j < incompleteMovesCollection[i].length; j++)
                    {
                        if(occupiedSquares.find(element =>  incompleteMovesCollection[i][j].Square === element ) === undefined)
                        {
                            occupiedSquares.push(incompleteMovesCollection[i][j].Square);
                        }
                    }

                    let squareOccupied = false;
                    occupiedSquares.forEach(element => { if(element === k) { squareOccupied = true; }  })
                    if(!squareOccupied)
                    {
                        let move = new Move(player, moveNumber, k);
                        incompleteMovesCollection[i].push(move);
                        i++;
                        if(i === end) // Not really understanding this??
                        {
                            return;
                        }
                        if(i === incompleteMovesCollection.length)
                        {
                            return; // Hacky. The function that calls this function inputs 'end' as one over the incompleteMovesCollection at some point. Rethink how the parameters are supplied to the call.
                        }
                    }
                }
            } 
    }
}

class GameBoard 
{
    #outcome;
    #moves;
    constructor() 
    {
        this.#moves = new Array();
        this.#outcome = -1; // -1 signifies game is incomplete.
    }
    MakeMove(square)
    {
        // First mover wins = 1
        // Second mover wins = 2
        // draw = 0
        if(this.#outcome === 1 || this.#outcome === 2 || this.#outcome === 0)
        {
            return false; // Game over
        }
        if(this.#moves.length === 9)
        {
            return false; // Game over.
        }
        if(this.#moves.length === 0)
        {
            this.#moves.push(new Move(1, 1, square));
            return true;
        }
        for(let i = 0; i < this.#moves.length; i++)
        {
            if(square === this.#moves[i].Square)
            {
                throw new Error(`Square ${square} is currently occupied. Cannot make this move.`); // Error: square is occupied
            }
        }

        if(this.#moves[this.#moves.length - 1].Player == 1)
        {
            this.#moves.push(new Move(2, this.#moves[this.#moves.length - 1].MoveNumber + 1, square));
        }
        else
        {
            this.#moves.push(new Move(1, this.#moves[this.#moves.length - 1].MoveNumber + 1, square));
        }        
        let progression = new GameProgression(this.#moves);
        this.#outcome = progression.GetOutcome();
        return true;
    }
    GetOutcome()
    {
        return this.#outcome;
    }
    GetMove(moveNumber)
    {
        if(moveNumber === this.#moves.length + 1)
        {
            return undefined;
        }
        else
        {
            return  new Move(this.#moves[moveNumber - 1].Player, this.#moves[moveNumber - 1].MoveNumber, this.#moves[moveNumber - 1].Square);
        }
    }
  
}

class AI
{
    #progressions;
    constructor()
    {
        let tikTakToeProgressions = new TikTakToeProgressions();
        this.#progressions = new Array(); // TODO: Refactor, shouldn't be neccessary to copy references to the progressions
        for(let progression = 0; progression < tikTakToeProgressions.GetNumberOfProgressions(); progression++)
        {
            this.#progressions.push(tikTakToeProgressions.GetProgression(progression));
        }
    }
    GetNextMove(gameBoard)
    {
        /* 1. If no moves have been made, select a random square to Return.
        *  2. Calculates what the next possible moves are.
        *  3. Returns a square if any of the next possible moves is a win or tie
        *  4. Calls #CalculateNextMove if no tie or win or first move.
        *  5. Returns value reeturned from #CalculateNextMove
        */

        let totalMoves = 9;
        let moveNumber = 1;
        let existingMoves = new Array();

        // Get all of the moves made so far.
        while(gameBoard.GetMove(moveNumber) !== undefined)
        {
            existingMoves.push(gameBoard.GetMove(moveNumber));
            moveNumber++;
        }

        if(existingMoves.length == 9)
        {
            throw new Error("Game is complete.");
        }
        // Determine what are the next possioble moves
        let possibleProgressions = new Array();

        let nextToMove;
        if(existingMoves.length === 0)
        {
            nextToMove = 1;
        }
        else
        {
            nextToMove = existingMoves[existingMoves.length - 1].Player === 1 ? 2 : 1;
        }

        if(existingMoves.length === 0)
        {
            return this.GetFirstMove();
        }
        else
        {
            // Find which squares are occupied
            let occupiedSquares = new Array();
            for(let i = 0; i < existingMoves.length; i++)
            {
                occupiedSquares.push(existingMoves[i].Square);
            } 

            // Create duplicates of the current moves for the gameboard.
            let movesRemiaining = totalMoves - existingMoves.length;
            for(let i = 1; i <= movesRemiaining; i++)
            {
                let currentProgressionDuplicate = new Array();
                for(let move = 0; move < existingMoves.length; move++)
                {
                    currentProgressionDuplicate.push(existingMoves[move]);
                }
                possibleProgressions.push(currentProgressionDuplicate);
            }
            // for each of the duplicates add all next possible moves.
            for(let square = 0, pp = 0; square < totalMoves; square++)
            {
                if(occupiedSquares.find(element => square === element ) === undefined)
                {
                    possibleProgressions[pp].push(new Move(nextToMove, existingMoves.length + 1, square));
                    pp++;
                }
            }
        }

        // Check if any possible progressions wins or draws the game. If so make the move.
        let tie = 0;
        for(let i = 0; i < possibleProgressions.length; i++)
        {
            let gameProgression = new GameProgression(possibleProgressions[i]);
            if(gameProgression.OutCome === nextToMove || gameProgression.OutCome === tie)
            {
                return possibleProgressions[i][possibleProgressions[i].length - 1].Square;
            }
        }

        // None of the possible progression wins or draws Calculate the next move
        return this.CalculateNextMove(possibleProgressions, nextToMove);
    }
    GetFirstMove()
    {
        let totalMoves = 9;
        return Math.floor(Math.random() * totalMoves);
    }
    CalculateNextMove(possibleProgressions, nextToMove)
    {
        let outcomes = new Array();
        for(let possibleProgression = 0; possibleProgression < possibleProgressions.length; possibleProgression++)
        {
            let outcome = this.GetOutcomes(possibleProgressions[possibleProgression]);
            outcome[3] = possibleProgression;
            outcomes.push(outcome);
        }
        
        // 2. Determine which move will yield the best odd for a win or draw scenario.
        let bestOdds = 0;
        let bestOutCome;
        for(let outcome = 0; outcome < outcomes.length; outcome++)
        {
            let total = outcomes[outcome][0] + outcomes[outcome][1] + outcomes[outcome][2];
            if(nextToMove === 1)
            {
                if(((outcomes[outcome][1] + outcomes[outcome][0]) / total) > bestOdds)
                {
                    bestOdds = (outcomes[outcome][1] + outcomes[outcome][0]) / total;
                    bestOutCome = outcomes[outcome][3];
                }
            }
            else
            {
                if(((outcomes[outcome][2] + outcomes[outcome][0]) / total) > bestOdds)
                {
                    bestOdds = (outcomes[outcome][2] + outcomes[outcome][0]) / total;
                    bestOutCome = outcomes[outcome][3];
                }
            }
            
        }
        return possibleProgressions[bestOutCome][possibleProgressions[bestOutCome].length - 1].Square;
    }
    GetOutcomes(arrayOfMoves) // progression is an array of moves.
    {
        let firstMoverWins = 0;
        let secondMoverWins = 0;
        let draw = 0;
        
        for(let completeProgression = 0; completeProgression < this.#progressions.length; completeProgression++)
        {
            let match = true;
            for(let move = 0; move < arrayOfMoves.length; move++)
            {
                if(arrayOfMoves[move].Square !== this.#progressions[completeProgression].GetMove(move).Square)
                {
                    match = false;
                }
            }
            if(match === true)
            {
                let outcome = this.#progressions[completeProgression].GetOutcome();
                switch(outcome)
                {
                    case 0:
                    {
                        draw++;
                        break;
                    }
                    case 1: 
                    {
                        firstMoverWins++;
                        break;
                    }
                    case 2:
                    {
                        secondMoverWins++;
                        break;
                    }
                }
            }
        }
        return new Array(draw, firstMoverWins, secondMoverWins);
    }
}
class Move
{
    constructor(player, moveNumber, square)
    {
        this.Player = player;
        this.MoveNumber = moveNumber;
        this.Square = square;
    }
}
class GameProgression
{
    #outCome;
    constructor(progression)
    {
        this._progression = progression; //_progression should be copied
        /* Error checking for _moveNumber, player and square. Set flag on error?? Only nine moves??*/
        this._progression = progression.sort((x, y) => { 
            if(x.MoveNumber < y.MoveNumber)
            {
                return -1;
            }
            else if(x.MoveNumber> y.MoveNumber)
            {
                return 1;
            }
            else
            {
                return 0;
            }
           });
        if(this.VerifyProgression() === false)
        {
            throw new Error(
                "Max 9 moves per progression." 
                + "Second to move must make every even move." 
                + "First to move must make every odd move"
                + "First move must be by the first to move"
                + "Move number must ascend from 1 by 1."
                + "Each move must only occupy a unique Square.");
        }

        this._winningCombinations = 
        [ 
            [{name : 0, owner : 0},{name : 1, owner : 0},{name : 2, owner : 0}],
            [{name : 3, owner : 0},{name : 4, owner : 0},{name : 5, owner : 0}], 
            [{name : 6, owner : 0},{name : 7, owner : 0},{name : 8, owner : 0}],
            [{name : 0, owner : 0},{name : 3, owner : 0},{name : 6, owner : 0}],
            [{name : 1, owner : 0},{name : 4, owner : 0},{name : 7, owner : 0}],
            [{name : 2, owner : 0},{name : 5, owner : 0},{name : 8, owner : 0}],
            [{name : 0, owner : 0},{name : 4, owner : 0},{name : 8, owner : 0}],
            [{name : 2, owner : 0},{name : 4, owner : 0},{name : 6, owner : 0}]
        ]
        this.#outCome = this.CalculateOutcome();
    }
    GetOutcome()
    {
        return this.#outCome;
    }
    GetMove(moveNumber)
    {
        return this._progression[moveNumber];
    }
    GetMoves()
    {
        let moves = new Array();
        for(let i = 0; i < this._progression.length; i++)
        {
            moves.push(new Move(this._progression[i].Player, this._progression[i].MoveNumber, this._progression[i].Square));
        }
        return moves;
    }
    VerifyProgression()
    {
        // Verfiy player order
        if(this._progression.length > 9)
        {
            return false;
        }
        for(let move = 0; move < this._progression.length; move++)
        {
            if(((move % 2) === 1) && this._progression[move].Player !== 2)
            {
                return false;
            }
            else if(((move % 2) === 0) && this._progression[move].Player !== 1)
            {
                return false;
            }
        }

        // Verfiy moves order
        for(let move = 0; move < this._progression.length; move++)
        {
           if(move === 0)
           {
                if(this._progression[move].MoveNumber !== 1)
                {
                    return false;
                }
           }
           else
           {
                if((this._progression[move].MoveNumber - this._progression[move - 1].MoveNumber) !== 1)
                {
                    return false;
                }
           }
        }

        // Verify occupied squares
        for(let move = 0; move < this._progression.length; move++)
        {
            for(let move_dup = 0; move_dup < this._progression.length; move_dup++)
            {
                if(move !== move_dup && this._progression[move].Square === this._progression[move_dup].Square)
                {
                    return false;
                }
            }
        }
        return true;
    }
 
    CalculateOutcome()
    {
        /*
        * Returns -1, 0, 1 or 2
        * 0: Draw
        * -1: Game incomplete
        * 1: Player 1 wins
        * 2: Player 2 wins
        */
       for(let i = 0; i < this._progression.length; i++)
       {
            if(this.#MarkGameBoard(this._progression[i].Square, this._progression[i].Player) === 1)
            {
                return 1; // Player 1 wins
            }
            if(this.#MarkGameBoard(this._progression[i].Square, this._progression[i].Player) === 2)
            {
                return 2; // Player 2 wins
            }
            if(this.#MarkGameBoard(this._progression[i].Square, this._progression[i].Player) === 0)
            {
                return 0; // Draw
            }
            // Otherwise -1 has been returned. The game has not finished! Continue..
       }
       return -1;
    }
    #MarkGameBoard(squareName, owner)
    {
        this._winningCombinations.forEach((combination) => {
            combination.forEach((square) => {
                if(square.name === squareName)
                {
                    square.owner = owner;
                }
            });
        });
        return this.#CheckProgressionState();
    }
    #CheckProgressionState()
    {
        /* Return 1 on player 1 winning.
        *  Return 2 on player 2 winning.
        *  Return -1 on game not complete.
        *  Return 0 on a draw.
        *  This method should be called directly after the MarkTicket function.
        */
        let owner_1_count = 0;
        let owner_2_count = 0;
        let ownedSquareCount = 0;
        for(let i = 0; i < this._winningCombinations.length; i++)
        {
            for(let y = 0; y < this._winningCombinations[i].length; y++)
            {
                if(this._winningCombinations[i][y].owner === 1)
                {
                    owner_1_count++;
                    ownedSquareCount++;
                }
                else if(this._winningCombinations[i][y].owner === 2)
                {
                    owner_2_count++;
                    ownedSquareCount++;
                }
            }
            if(owner_1_count === 3)
            {
                return 1;
            }
            if(owner_2_count === 3)
            {
                return 2;
            }
        
        }
        if(ownedSquareCount === 24)
        {
            return 0;
        }
        
        return -1;
    }
}
class TestSuite
{
    constructor(){}
    RunTests()
    {
        // Don't run this unless you have time to wait. SHouldn't take longer than an hour. Items that need to be checked is: 9! * (9! - 1) = 131 681 894 400.
        // ******************** (GameProgression)Test 1: Test the progessions produced by the AI are all unique. 
        {
            const tikTakToeProgressions = new TikTakToeProgressions();
            const progressions = new Array();

            let progression = tikTakToeProgressions.GetProgression(0);
            let index = 0;
            while(progression !== undefined)
            {
                index++;
                progressions.push(progression);
                progression = tikTakToeProgressions.GetProgression(index);
            }
            if(this.ValidateProgressions(progressions) === true)
            {
                console.log("Test 1: Passed.");
            }
            else
            {
                console.log("Test 1: Failed.");
            }
        }


        // ******************** (GameProgression)Test 2: Test a collection of progressions that are not unique are invalid.
        {
            let progressions = new Array();

            let progression_1 = new Array();
            let m1p1 = new Move(1, 1, 0);
            progression_1.push(m1p1);
            let m2p1 = new Move(1, 2, 0);
            progression_1.push(m1p1);
            
            let progression_2 = new Array();
            let m1p2 = new Move(1, 1, 0);
            progression_2.push(m1p2);
            let m2p2 = new Move(1, 2, 0);
            progression_2.push(m1p2);

            progressions.push(progression_1);
            progressions.push(progression_2);

            if(this.ValidateProgressions(progressions) === true)
            {
                console.log("Test 2: Failed.");
            }
            else
            {
                console.log("Test 2: Passed.");
            }
        }

        // ******************** Test 3: Test first mover winning a progression
        // {

        // }

        // ******************** Test 4: Test second mover winning a progression
        // {
        //     // 353603

        //}

        // // ********************(TikTakToe) Test 5: Test a draw progression
        {
            // Progression: 0, 1, 2, 3, 4, 6, 5, 8, 7
            let ttt = new TikTakToeProgressions();
            if(ttt.GetProgression(7).GetOutcome() === 0)
            {
                console.log("Test 5: Passed.")
            }
            else
            {
                console.log("Test 5: Failed.")
            }
        }

        // ******************** Test 5: Test all complete progressions lead to a win or draw.
        // {

        // }

        // ******************** (GameBoard)Test 6: Test MakeMove when parameter(square) is occupied throw exception
        //{

        //}

        // ******************** (AI)Test 8: Test ai module returns a winning move square
        {
            
        }
        // ******************** (AI)Test 9: Test ai module returns a tie move square
        {
      
        }

        // ******************** (GameBoard) Test 9: Test first mover and second mover is set correctly
        {

        }

        // ******************** (GameBoard) Test 9: Test move number is set correctly
        {

        }

        // ******************** (GameBoard) Test 9: Test square is set correctly
        {

        }

        { // ******************** (AI)Test X: // How to test moving to square 4 has the best odds for winning or drawing the game??
            let gameBoard = new GameBoard();
            gameBoard.MakeMove(0);
            gameBoard.MakeMove(2);
            gameBoard.MakeMove(7);
            let ai = new AI();
            if(ai.GetNextMove(gameBoard) === 4)
            {
                console.log("Test X: Passed.")
            }
            else
            {
                console.log("Test X Failed.")
            }
        }
    }
    ValidateProgressions(progressions)
    {
       
        // Assumes the moves are in order
        /* 
            How the validation occurs. Given the following are the only progessions:

            Progression 1: 0, 1, 2, 3, 4, 5, 6, 7, 8        
            Progression 2: 0, 2, 1, 3, 4, 5, 6, 7, 8
            Progression 3: 0, 2, 1, 3, 4, 5, 6, 7, 8
            
            - When comparing P1[1] and P2[1] the inner break is executed. This signifies that the P1 and P2 are different.
            - When comparing P2 and P3 all the number are the same and (y === progressions.length - 1) is true. This signifies that there are now elements that are different.

        */
           

        for(let i = 0; i < progressions.length; i++)
        {
            let moves1 = progressions[i].GetMoves();
            for(let p = 0; p < progressions.length; p++)
            {              
                
               
                if(p != i)
                {
                    let moves2 = progressions[p].GetMoves();

                    for(let y = 0; y < moves1.length; y++)
                    {
                        if(moves1[y].Square !== moves2[y].Square)
                        {
                            break;
                        }
                        if(y === progressions.length - 1)
                        {
                            // If the loop has not broken by now then moves2 == moves1
                            // This means that for moves 1 - 8, both progessions move to the same squares.
                            return false;
                        }
                    }
                }
            }
        }
        return true;
    }
}

export {GameBoard, AI, TestSuite};
