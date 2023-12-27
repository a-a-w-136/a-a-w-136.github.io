import { TikTakToeProgressions } from "./TikTakToe.js";

class TicTacToeProgressionsTests
{
    #progressions;
    constructor()
    {

    }
    RunTests()
    {
         /* This test is to show that each of the TicTacToe progressions are unique.
             * 
             * Instead of taking each progression and testing that it is different to every other progression, taking at a minimum of (362,880(362,880 - 1)) / 2 == 65,840,765,760 operations.
             * 
             * 1. Number of ways the fill a TicTacToe board = 9! = 362,880 = number of progressions
             * 2. 9 possible options for the first move
             * 3. Number of progressions with the first move to square 0, sqaure 1, square 2, square 3, etc is 9!/9 = 40,320. (To prove)
             * 4. Foreach of the 40,320 that have a unique first move, there should be 9!/9/8 5040 progressions that move to each unoccupied square. (To prove)
             * 5. Foreach of the 5040 that have a unique first move and second move there should be 9!/9/8/7 720 progressions that move to each unoccupied square. (To prove)
             * 6. The pattern continues...(To prove)
             * 
             * 
             * It works by knowing the progressions are in a particular order. If they are in a particular order the above is true.
             * For example
             *  1. Checks that all first moves to square 0 are from 0 - 40319 (where 0 is the first)
             *  2. Checks 0 - 5039 the first moves are to square 0 and the second moves are to square 1.
             * 
             * Works, but it could be clearer. I think that the idea here can be used as a basis for refactoring.
             * This is more an example of how to test uniquness in a more efficient way than a minimum 65,840,765,760. Instead it is closer to 362,880 * 9 or 2,903,040 operations.
             */
        {
            let ticTacToeProgressions = new TikTakToeProgressions();
            let progressions = new Array();
            let progressionNumber = 0;
            let progression = ticTacToeProgressions.GetProgression(progressionNumber);
            while(progression != undefined)
            {
                progressions.push(progression);
                progressionNumber++;
                progression = ticTacToeProgressions.GetProgression(progressionNumber);
            }


            // PART 1
            if(this.Prove40320BlocksAreUnique(progressions) === null)
            {
                console.log("Passed - 40320 Blocks Are Unique");
            }
            else
            {
                console.log("Failed - 40320 Blocks Are Not Unique");
            }

            // PART 2
            let firstMoveBlockSize = 40320;
            let passed5040 = true;
            for (let i = 0; i < progressions.length; i += firstMoveBlockSize)
            {
                if(this.Prove5040BlocksAreUnique(progressions, i) !== null)
                {
                    passed5040 = false;
                }
            }
            if(passed5040)
            {
                console.log("Passed - 5040 Blocks Are Unique");
            }
            else
            {
                console.log("Failed - 5040 Blocks Are Not Unique");
            }

            // PART 3
            let secondMoveBlockSize = 5040;
            let passed720 = true;
            for (let i = 0; i < progressions.Count; i += secondMoveBlockSize)
            {
                if(this.Prove720BlocksAreUnique(progressions, i) !== null)
                {
                    passed720 = false;
                }
            }
            if(passed720)
            {
                console.log("Passed - 720 Blocks Are Unique");
            }
            else
            {
                console.log("Failed - 720 Blocks Are Not Unique");
            }

            // PART 4
            let thirdMoveBlockSize = 720;
            let passed120 = true;
            for (let i = 0; i < progressions.Count; i += thirdMoveBlockSize)
            {
                if(this.Prove120BlocksAreUnique(progressions, i) !== null)
                {
                    passed120 = false;
                }
            }
            if(passed120)
            {
                console.log("Passed - 120 Blocks Are Unique");
            }
            else
            {
                console.log("Failed - 120 Blocks Are Not Unique");
            }

            // PART 5
            let fourthMoveBlockSize = 720;
            let passed24 = true;
            for (let i = 0; i < progressions.Count; i += fourthMoveBlockSize)
            {
                if(this.Prove24BlocksAreUnique(progressions, i) !== null)
                {
                    passed24 = false;
                }
            }
            if(passed24)
            {
                console.log("Passed - 24 Blocks Are Unique");
            }
            else
            {
                console.log("Failed - 24 Blocks Are Not Unique");
            }

             // PART 6
             let fifthMoveBlockSize = 24;
             let passed6 = true;
             for (let i = 0; i < progressions.Count; i += fifthMoveBlockSize)
             {
                 if(this.Prove6BlocksAreUnique(progressions, i) !== null)
                 {
                     passed6 = false;
                 }
             }
             if(passed6)
             {
                 console.log("Passed - 6 Blocks Are Unique");
             }
             else
             {
                 console.log("Failed - 6 Blocks Are Not Unique");
             }

            // PART 7
            let sixMoveBlockSize = 6;
            let passed2 = true;
            for (let i = 0; i < progressions.Count; i += sixMoveBlockSize)
            {
                if(this.Prove2BlocksAreUnique(progressions, i) !== null)
                {
                    passed2 = false;
                }
            }
            if(passed2)
            {
                console.log("Passed - 2 Blocks Are Unique");
            }
            else
            {
                console.log("Failed - 2 Blocks Are Not Unique");
            }

             // PART 7
             let seventhMoveBlockSize = 2;
             let passed1 = true;
             for (let i = 0; i < progressions.Count; i += seventhMoveBlockSizee)
             {
                 if(this.Prove1BlocksAreUnique(progressions, i) !== null)
                 {
                     passed2 = false;
                 }
             }
             if(passed1)
             {
                 console.log("Passed - 1 Blocks Are Unique");
             }
             else
             {
                 console.log("Failed - 1 Blocks Are Not Unique");
             }



            /* The next set of tests are to show that ProveXBlocksAreUnique() functions return !null when the
             * progressions are not ina particular order.
             */
            // Force a different organisation of the progressions - level 1
            // Proves that the 40320 - 80639 move 1 is not to position 0.
            let progression40320 = progressions[40320];
            progressions[40320] = progressions[0];
            if(Prove40320BlocksAreUnique(progressions) === null)
            {
                console.log("Pass.");
            }
            else
            {
                console.log("Fail.");
            }
            progressions[40320] = progression40320;

            // // Force a different organisation of the progressions - level 2
            // Progression progression5039 = (Progression)progressions[5039];
            // progressions[5039] = progressions[5040];
            // Assert.IsNotNull(ProgressionUniqueness.Prove5040BlocksAreUnique(progressions, 0));
            // progressions[5039] = progression5039;

            // // Force a different organisation of the progressions - level 3
            // Progression progression719 = (Progression)progressions[719];
            // progressions[719] = progressions[720];
            // Assert.IsNotNull(ProgressionUniqueness.Prove720BlocksAreUnique(progressions, 0));
            // progressions[719] = progression719;

            // // Force a different organisation of the progressions - level 4
            // Progression progression119 = (Progression)progressions[119];
            // progressions[119] = progressions[120];
            // Assert.IsNotNull(ProgressionUniqueness.Prove120BlocksAreUnique(progressions, 0));
            // progressions[119] = progression119;

            // // Force a different organisation of the progressions - level 5
            // Progression progression23 = (Progression)progressions[23];
            // progressions[23] = progressions[24];
            // Assert.IsNotNull(ProgressionUniqueness.Prove24BlocksAreUnique(progressions, 0));
            // progressions[23] = progression23;

            // // Force a different organisation of the progressions - level 6
            // Progression progression5 = (Progression)progressions[5];
            // progressions[5] = progressions[6];
            // Assert.IsNotNull(ProgressionUniqueness.Prove6BlocksAreUnique(progressions, 0));
            // progressions[5] = progression5;

            // // Force a different organisation of the progressions - level 7
            // Progression progression1 = (Progression)progressions[1];
            // progressions[1] = progressions[2];
            // Assert.IsNotNull(ProgressionUniqueness.Prove2BlocksAreUnique(progressions, 0));
            // progressions[1] = progression1;

            // // Force a different organisation of the progressions - level 8
            // Progression progression0 = (Progression)progressions[0];
            // progressions[0] = progressions[1];
            // Assert.IsNotNull(ProgressionUniqueness.Prove1BlocksAreUnique(progressions, 0));
            // progressions[0] = progression0;

        }
        { // ******************** (AI)Test X: // How to test moving to square 4 has the best odds for winning or drawing the game??
            // let gameBoard = new GameBoard();
            // gameBoard.MakeMove(0);
            // gameBoard.MakeMove(2);
            // gameBoard.MakeMove(7);
            // let ai = new AI();
            // if(ai.GetNextMove(gameBoard) === 4)
            // {
            //     console.log("Test X: Passed.")
            // }
            // else
            // {
            //     console.log("Test X Failed.")
            // }
        }
    }
    Prove40320BlocksAreUnique(progressions)
    {
        // 40320
        let blockSize = progressions.length / 9;
        let squares = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        let startIndex = 0;
        let endIndex = blockSize;
        for(let square = 0; square < squares.length; square++)
        {
            for (let i = startIndex; i < endIndex; i++)
            {
                if (progressions[i].GetMove(1).Square !== square)
                {
                   return i;
                }
            }
            startIndex = endIndex;
            endIndex = startIndex + blockSize;
        }
        return null;
        // 0 - 40319 : Move 1 is to sqaure 0.
        // 40320 - 80639: Move 1 is to square 1.
        // 80640 - 12959: Move 1 is to square 2.
        // Group 1 cannot contain a progression that is the same as group 2.
        // etc..
    }
    Prove5040BlocksAreUnique(progressions, startUnique40320)
    {
        // Every block of 5040 second move should be to the same square. But every 5040 block second move should be different to every other 5040 block in this unique 40320.
        let blockSize = progressions.length / 9 / 8;
        let occupiedSquare = progressions[startUnique40320].GetMove(1).Square;
        let squares = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        let startIndex = startUnique40320;
        let endIndex = startIndex + blockSize;

        for(let square = 0; square < squares.length; square++)
        {
            if (square != occupiedSquare)
            {
                for (let i = startIndex; i < endIndex; i++)
                {
                    if (progressions[i].GetMove(2).Square !== square)
                    {
                        return i;
                    }
                }
                startIndex = endIndex;
                endIndex = startIndex + blockSize;
            }
        }
        return null;
        // The first 5040 block, Move 2 is to A
        // The second 5040 block, Move 2 is to B
        // The third 5040 block, Move 2 is to C
        // etc...
        // In this unique 40320 block, Move 2 is different for each 5040 block.
    }
    Prove720BlocksAreUnique(progressions, startUnique5040)
    {
        let blockSize = progressions.length / 9 / 8 / 7;
        let occupiedSquares = 
        [
            progressions[startUnique5040].GetMove(1).Square, 
            progressions[startUnique5040].GetMove(2).Square
        ];
        let squares = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        let startIndex = startUnique5040;
        let endIndex = startIndex + blockSize;
        for(let square = 0; square < squares.length; square++)
        {
            let occupied = false;
            for(let occupiedSquare = 0; occupiedSquare < occupiedSquares.length; occupiedSquare++)
            {
                if (occupiedSquare == square)
                {
                    occupied = true;
                }
            }
            if (!occupied)
            {
                for (let i = startIndex; i < endIndex; i++)
                {
                    if (progressions[i].GetMove(3).Square !== square)
                    {
                        return i;
                    }
                }
                startIndex = endIndex;
                endIndex = startIndex + blockSize;
            }
        }
        return null;
        // The first 720 block, Move 3 is to A
        // The second 5040 block, Move 3 is to B
        // The third 5040 block, Move 3 is to C
        // etc...
        // In this unique 5040 block, Move 3 is different for each 720 block.
    }
    Prove120BlocksAreUnique(progressions, startUnique720)
    {
        let blockSize = progressions.length / 9 / 8 / 7 / 6;
        let occupiedSquares = 
        [
            progressions[startUnique720].GetMove(1).Square,
            progressions[startUnique720].GetMove(2).Square,
            progressions[startUnique720].GetMove(3).Square
        ];
        let squares = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        let startIndex = startUnique720;
        let endIndex = startIndex + blockSize;
        for(let square = 0; square < squares.length; square++)
        {
            let occupied = false;
            for(let occupiedSquare = 0; occupiedSquare < occupiedSquares.length; occupiedSquare++)
            {
                if (occupiedSquare == square)
                {
                    occupied = true;
                }
            }
            if (!occupied)
            {
                for (let i = startIndex; i < endIndex; i++)
                {
                    if (progressions[i].GetMove(4).Square !== square)
                    {
                        return i;
                    }
                }
                startIndex = endIndex;
                endIndex = startIndex + blockSize;
            }
        }
        return null;
        // The first 120 block, Move 4 is to A
        // The second 120 block, Move 4 is to B
        // The third 120 block, Move 4 is to C
        // etc... 
        // In this unique 720 block, Move 4 is different for each 120 block.
    }
    Prove24BlocksAreUnique( progressions, startUnique120)
    {
        let blockSize = progressions.length / 9 / 8 / 7 / 6 / 5;
        let occupiedSquares = 
        [
            progressions[startUnique120].GetMove(1).Square,
            progressions[startUnique120].GetMove(2).Square,
            progressions[startUnique120].GetMove(3).Square,
            progressions[startUnique120].GetMove(4).Square,
        ];
        let squares = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        let startIndex = startUnique720;
        let endIndex = startIndex + blockSize;
        for(let square = 0; square < squares.length; square++)
        {
            let occupied = false;
            for(let occupiedSquare = 0; occupiedSquare < occupiedSquares.length; occupiedSquare++)
            {
                if (occupiedSquare == square)
                {
                    occupied = true;
                }
            }
            if (!occupied)
            {
                for (let i = startIndex; i < endIndex; i++)
                {
                    if (progressions[i].GetMove(5).Square !== square)
                    {
                        return i;
                    }
                }
                startIndex = endIndex;
                endIndex = startIndex + blockSize;
            }
        }
        return null;
        // The first 24 block, Move 5 is to A
        // The second 24 block, Move 5 is to B
        // The third 24 block, Move 5 is to C
        // etc... 
        // In this unique 120 block, Move 5 is different for each 24 block.
    }
    Prove6BlocksAreUnique(progressions, startUnique24)
    {
        let blockSize = progressions.length / 9 / 8 / 7 / 6 / 5 / 4;
        let occupiedSquares = 
        [
            progressions[startUnique24].GetMove(1).Square,
            progressions[startUnique24].GetMove(2).Square,
            progressions[startUnique24].GetMove(3).Square,
            progressions[startUnique24].GetMove(4).Square,
            progressions[startUnique24].GetMove(5).Square
        ];
        let squares = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        let startIndex = startUnique720;
        let endIndex = startIndex + blockSize;
        for(let square = 0; square < squares.length; square++)
        {
            let occupied = false;
            for(let occupiedSquare = 0; occupiedSquare < occupiedSquares.length; occupiedSquare++)
            {
                if (occupiedSquare == square)
                {
                    occupied = true;
                }
            }
            if (!occupied)
            {
                for (let i = startIndex; i < endIndex; i++)
                {
                    if (progressions[i].GetMove(6).Square !== square)
                    {
                        return i;
                    }
                }
                startIndex = endIndex;
                endIndex = startIndex + blockSize;
            }
        }
        return null;
        // The first 6 block, Move 6 is to A
        // The second 6 block, Move 6 is to B
        // The third 6 block, Move 6 is to C
        // etc... 
        // In this unique 24 block, Move 6 is different for each 6 block.
    }
    Prove2BlocksAreUnique(progressions, startUnique6)
    {
        let blockSize =  progressions.length / 9 / 8 / 7 / 6 / 5 / 4 / 3;
        let occupiedSquares = 
        [
            progressions[startUnique6].GetMove(1).Square,
            progressions[startUnique6].GetMove(2).Square,
            progressions[startUnique6].GetMove(3).Square,
            progressions[startUnique6].GetMove(4).Square,
            progressions[startUnique6].GetMove(5).Square,
            progressions[startUnique6].GetMove(6).Square
        ];
        let squares = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        let startIndex = startUnique720;
        let endIndex = startIndex + blockSize;
        for(let square = 0; square < squares.length; square++)
        {
            let occupied = false;
            for(let occupiedSquare = 0; occupiedSquare < occupiedSquares.length; occupiedSquare++)
            {
                if (occupiedSquare == square)
                {
                    occupied = true;
                }
            }
            if (!occupied)
            {
                for (let i = startIndex; i < endIndex; i++)
                {
                    if (progressions[i].GetMove(7).Square !== square)
                    {
                        return i;
                    }
                }
                startIndex = endIndex;
                endIndex = startIndex + blockSize;
            }
        }
        return null;

        // The first 2 block, Move 7 is to A
        // The second 2 block, Move 7 is to B
        // The third 2 block, Move 7 is to C
        // etc... 
        // In this unique 6 block, Move 7 is different for each 2 block.
    }
    Prove1BlocksAreUnique(progressions, startUnique2)
    {
        let blockSize =  progressions.length / 9 / 8 / 7 / 6 / 5 / 4 / 3 / 2;
        let occupiedSquares = 
        [
            progressions[startUnique2].GetMove(1).Square,
            progressions[startUnique2].GetMove(2).Square,
            progressions[startUnique2].GetMove(3).Square,
            progressions[startUnique2].GetMove(4).Square,
            progressions[startUnique2].GetMove(5).Square,
            progressions[startUnique2].GetMove(6).Square,
            progressions[startUnique2].GetMove(7).Square
        ];
        let squares = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        let startIndex = startUnique720;
        let endIndex = startIndex + blockSize;
        for(let square = 0; square < squares.length; square++)
        {
            let occupied = false;
            for(let occupiedSquare = 0; occupiedSquare < occupiedSquares.length; occupiedSquare++)
            {
                if (occupiedSquare == square)
                {
                    occupied = true;
                }
            }
            if (!occupied)
            {
                for (let i = startIndex; i < endIndex; i++)
                {
                    if (progressions[i].GetMove(8).Square !== square)
                    {
                        return i;
                    }
                }
                startIndex = endIndex;
                endIndex = startIndex + blockSize;
            }
        }
        return null;
        // The first 1 block Move 8 is to A
        // The second 1 block Move 8 is to B
        // etc... 
        // In this unique 2 block, Move 8 is different for each 1 block.
    }
}

export {TicTacToeProgressionsTests};