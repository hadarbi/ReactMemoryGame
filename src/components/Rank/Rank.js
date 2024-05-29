import React from 'react';

/**
 * Rank component displays a table of player ranks sorted by score.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.ranks - An object where keys are player names and values are scores.
 * @returns {JSX.Element} The rendered table of ranks.
 */
function Rank({ ranks }) {
    const ranksArray = Object.entries(ranks);
    ranksArray.sort((a, b) => b[1] - a[1]);

    return (
        <table className="container table table-striped my-3">
            <thead>
                <tr>
                    <th scope="col">Rank</th>
                    <th scope="col">Player</th>
                    <th scope="col">Score</th>
                </tr>
            </thead>
            <tbody>
                {ranksArray.map((item, itemIndex) => (
                    <tr key={item[0]}>
                        <th scope="row">{itemIndex + 1}</th>
                        <td>{item[0]}</td>
                        <td>{item[1]}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default Rank;
