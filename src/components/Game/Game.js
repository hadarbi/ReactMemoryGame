import { useState } from "react";
import buildGrid from "../../utils/buildGrid";
import Rank from '../Rank/Rank';
import BackButton from '../BackButton/BackButton';

/**
 * Game component responsible for managing the memory card game.
 * @param {object} settings - The settings object for the game.
 * @param {function} setIsPlaying - Function to set the game state.
 * @param {object} ranks - Object containing player ranks.
 * @param {function} setRanks - Function to set player ranks.
 * @param {string} name - The name of the current player.
 */
function Game({ settings, setIsPlaying, ranks, setRanks, name }) {
    const [grid, setGrid] = useState(buildGrid(settings));
    const [lastFlippedCard, setLastFlippedCard] = useState(null);
    const [stepsCounter, setStepsCounter] = useState(0);
    const [isGameOver, setIsGameOver] = useState(false);

    /**
     * Calculates the image URL for a given card based on its state.
     * @param {object} card - The card object containing information about the card.
     * @returns {string} - The URL of the card image.
     */
    const calcImg = (card) => {
        const img = (card.isFlipped || card.isMatched) ? card.img : 'card';
        return `/images/${img}.jpg`;
    }

    /**
     * Flips a card at the specified row and column index.
     * @param {number} rowIndex - The index of the row in the grid.
     * @param {number} colIndex - The index of the column in the grid.
     */
    const flipCard = (rowIndex, colIndex) => {
        // Check if the card is already matched or flipped
        if (grid[rowIndex][colIndex].isMatched || grid[rowIndex][colIndex].isFlipped) {
            return;
        }

        let updatedGrid = [...grid];
        updatedGrid[rowIndex][colIndex].isFlipped = true;
        if (lastFlippedCard) {
            const updatedStepsCounter = stepsCounter + 1;
            setStepsCounter(updatedStepsCounter);

            if (updatedGrid[rowIndex][colIndex].img === updatedGrid[lastFlippedCard.rowIndex][lastFlippedCard.colIndex].img) {
                updatedGrid[rowIndex][colIndex].isMatched = true;
                updatedGrid[lastFlippedCard.rowIndex][lastFlippedCard.colIndex].isMatched = true;
                const allCardsMatch = updatedGrid.every(row => row.every(card => card.isMatched));
                if (allCardsMatch) {
                    setIsGameOver(true);
                    setRanks({
                        ...ranks,
                        [name]: pointsCalculation(updatedStepsCounter),
                    })
                }
            } else {
                setTimeout(() => {
                    updatedGrid = [...updatedGrid];
                    updatedGrid[rowIndex][colIndex].isFlipped = false;
                    updatedGrid[lastFlippedCard.rowIndex][lastFlippedCard.colIndex].isFlipped = false;
                    setGrid(updatedGrid);
                }, settings.delay * 1000);
            }
            setLastFlippedCard(null);
        } else {
            setLastFlippedCard({ rowIndex, colIndex });
        }
        setGrid(updatedGrid);
    }

    /**
     * Calculates the points earned based on the number of steps taken.
     * @param {number} updatedStepsCounter - The number of steps taken in the game.
     * @returns {number} - The calculated points.
     */
    const pointsCalculation = (updatedStepsCounter) => {
        const totalCards = settings.rows * settings.columns;
        const points = (totalCards * 10) - (updatedStepsCounter * 5);
        return points;
    }

    /**
     * Calculates the rank of the current player based on their points.
     * @returns {number|null} - The rank of the player, or null if not found.
     */
    const calcRank = () => {
        const ranksArray = Object.entries(ranks);
        ranksArray.sort((a, b) => b[1] - a[1]);
        const rankIndex = ranksArray.findIndex(([key]) => key === name);
        return rankIndex !== -1 ? rankIndex + 1 : null;
    }


    return (
        <div className="container text-center p-3" style={{ maxWidth: "450px" }}>

            {isGameOver ? (
                <>
                    <h2>
                        Game Over! <br />
                    </h2>
                    <h5>
                        Number of cards you played: {settings.rows * settings.columns} <br />
                        Score: {ranks[name]}<br />
                        Rank: {calcRank()}
                        <Rank ranks={ranks} />
                    </h5>
                </>
            ) : (
                <>
                    <h4 >Steps: {stepsCounter} </h4>
                    {grid.map((row, rowIndex) => (
                        <div className="row rounded border g-0" key={rowIndex}>
                            {row.map((card, colIndex) => (
                                <div className="col rounded border p-0 m-0" key={colIndex}>
                                    <img
                                        className="img-fluid"
                                        src={calcImg(card)}
                                        alt="Example"
                                        onClick={() => flipCard(rowIndex, colIndex)}
                                    />
                                </div>
                            ))}
                        </div>
                    ))}
                </>
            )}
            <BackButton onClick={() => setIsPlaying(false)} />
        </div>
    );
}

export default Game;
