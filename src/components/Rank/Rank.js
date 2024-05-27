function Rank({ ranks }) {

    // Convert the ranks object to an array of [name, score] pairs
    const ranksArray = Object.entries(ranks);

    // Sort the array by scores in descending order
    ranksArray.sort((a, b) => b[1] - a[1]);

    return (
        <table class="container table table-striped my-3">
            <thead>
                <tr>
                    <th scope="col">Rank</th>
                    <th scope="col">Player</th>
                    <th scope="col">Score</th>
                </tr>
            </thead>
            <tbody>
                {ranksArray.map((item, itemIndex) => (
                    <tr>
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
