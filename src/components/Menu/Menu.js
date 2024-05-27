

function Menu({ setIsPlaying, setIsSettingsOpen, setIsScoresOpen }) {
    const resetAll = () => {
        setIsPlaying(false);
        setIsSettingsOpen(false);
        setIsScoresOpen(false);
    }
    return (
        <div className="text-center">
            <button class="btn btn-primary mx-2" onClick={() => { resetAll(); setIsPlaying(true); }} type="button">Play</button>
            <button class="btn btn-light mx-2" onClick={() => { resetAll(); setIsSettingsOpen(true); }} type="button">Setting</button>
            <button class="btn btn-light mx-2" onClick={() => { resetAll(); setIsScoresOpen(true); }} type="button">Scores</button>
        </div >
    );
}

export default Menu;