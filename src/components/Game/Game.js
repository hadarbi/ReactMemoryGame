import { useState } from "react";
import buildGrid from "../../utils/buildGrid";
import Rank from '../Rank/Rank';
import BackButton from '../BackButton/BackButton';

function Game({ settings, setIsPlaying, ranks, setRanks, name }) {
    const [grid, setGrid] = useState(buildGrid(settings));
    const [lastFlippedCard, setLastFlippedCard] = useState(null);
    const [stepsCounter, setStepsCounter] = useState(0);
    const [isGameOver, setIsGameOver] = useState(false);


    const calcImg = (card) => {
        const img = (card.isFlipped || card.isMatched) ? card.img : 'card'
        return `/images/${img}.jpg`

    }

    const flipCard = (rowIndex, colIndex) => {
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
            }
            else {
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

    const pointsCalculation = (updatedStepsCounter) => {
        const totalCards = settings.rows * settings.columns;
        const points = (totalCards * 10) - (updatedStepsCounter * 5);
        return points;
    }

    const calcRank = () => {
        // Convert the ranks object to an array of [name, score] pairs
        const ranksArray = Object.entries(ranks);

        // Sort the array by scores in descending order
        ranksArray.sort((a, b) => b[1] - a[1]);

        // Find the index of the given name in the sorted array
        const rankIndex = ranksArray.findIndex(([key]) => key === name);

        // Return the rank (index + 1)
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
                        <div className="row rounded border g-0" key={rowIndex}>  {/* Remove gutters between columns */}
                            {row.map((card, colIndex) => (
                                <div className="col rounded border p-0 m-0" key={colIndex}>  {/* Remove padding and margin from columns */}
                                    <img
                                        className="img-fluid"  // Make the images take full width of the column
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
