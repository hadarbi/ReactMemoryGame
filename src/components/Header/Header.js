import React from 'react';

/**
 * Header component renders the header section of the Memory Game.
 *
 * @returns {JSX.Element} The rendered header section.
 */
function Header() {
    return (
        <div className="py-3 text-center bg-light">
            <h1>Memory Game</h1>
            <h4 className="my-2">
                Select two cards and click on them to flip them and find the
                matching pairs with as few flips as possible.
            </h4>
        </div>
    );
}

export default Header;
