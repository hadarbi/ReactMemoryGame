
const buildGrid = (settings) => {
    const totalCards = settings.rows * settings.columns;
    const numPairs = totalCards / 2;

    // Create an array with pairs of numbers from 0 to 15
    let allCardNumbers = [];
    for (let i = 0; i < 16; i++) {
        allCardNumbers.push(i);
    }

    // Function to shuffle the array
    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    };

    // Shuffle the available card numbers
    shuffleArray(allCardNumbers);

    // Select the required number of pairs
    let selectedCardNumbers = allCardNumbers.slice(0, numPairs);

    // Create pairs and flatten the array
    let cardNumbers = [];
    selectedCardNumbers.forEach(num => {
        cardNumbers.push(num, num);
    });

    // Shuffle the card numbers to randomize their positions
    shuffleArray(cardNumbers);

    let grid = [];
    let cardIndex = 0;
    for (let i = 0; i < settings.rows; i++) {
        let row = [];
        for (let j = 0; j < settings.columns; j++) {
            const cardImg = cardNumbers[cardIndex]; // Get the next card image number
            const card = { img: cardImg, isFlipped: false, isMatched: false };
            row.push(card);
            cardIndex++;
        }
        grid.push(row);
    }
    return grid;
};

export default buildGrid;
