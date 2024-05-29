import React from 'react';

/**
 * Menu component renders buttons for different menu options.
 *
 * @param {Object} props - The component props.
 * @param {Function} props.setIsPlaying - Function to set the playing state.
 * @param {Function} props.setIsSettingsOpen - Function to set the settings open state.
 * @param {Function} props.setIsScoresOpen - Function to set the scores open state.
 * @returns {JSX.Element} The rendered menu buttons.
 */
function Menu({ setIsPlaying, setIsSettingsOpen, setIsScoresOpen }) {
    /**
     * Resets all states and sets a specific state to true.
     *
     * @param {boolean} playing - The value to set for the playing state.
     * @param {boolean} settingsOpen - The value to set for the settings open state.
     * @param {boolean} scoresOpen - The value to set for the scores open state.
     */
    const resetAll = (playing, settingsOpen, scoresOpen) => {
        setIsPlaying(playing);
        setIsSettingsOpen(settingsOpen);
        setIsScoresOpen(scoresOpen);
    };

    return (
        <div className="text-center">
            <button
                className="btn btn-primary mx-2"
                onClick={() => { resetAll(true, false, false); }}
                type="button">
                Play
            </button>
            <button
                className="btn btn-light mx-2"
                onClick={() => { resetAll(false, true, false); }}
                type="button">
                Setting
            </button>
            <button
                className="btn btn-light mx-2"
                onClick={() => { resetAll(false, false, true); }}
                type="button">
                Scores
            </button>
        </div>
    );
}

export default Menu;
