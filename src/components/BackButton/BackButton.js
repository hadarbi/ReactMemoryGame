import React from 'react';

/**
 * BackButton component represents a button to navigate back.
 * @param {function} onClick - The function to call when the button is clicked.
 * @returns {JSX.Element} - The JSX button element.
 */
function BackButton({ onClick }) {
    return (
        <button className="btn btn-primary my-2" onClick={onClick} type="button">return</button>
    );
}

export default BackButton;
