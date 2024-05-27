
function Setting({ settings, setSettings, setErrors }) {
    const onChange = (key) => (e) => {
        setErrors(prevState => ({ ...prevState, boardSize: '' }));
        const value = e.target.value;
        const updatedSettings = {
            ...settings,
            [key]: value,
        }
        console.log(updatedSettings);
        const isSettingsValid = (updatedSettings.rows * updatedSettings.columns) % 2 === 0;
        if (!isSettingsValid) {
            setErrors(prevState => ({ ...prevState, boardSize: "Board size must be even number." }));
        }
        setSettings(updatedSettings);

    }
    return (
        <div className="container pt-5 text-center form-group">
            <form>
                <div class="row">
                    <div class="col">
                        <label for="NumberOfRows">Number of rows:</label>
                        <select value={settings.rows} onChange={onChange('rows')} class="form-control" id="NumberOfRows" aria-describedby="">
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </select>
                    </div>
                    <div class="col">
                        <label for="NumberOfColumns">Number of columns:</label>
                        <select value={settings.columns} onChange={onChange('columns')} class="form-control" id="NumberOfColumns">
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </select>
                    </div>
                    <div class="col">
                        <label for="Delay">Delay (in seconds):</label>
                        <select value={settings.delay} onChange={onChange('delay')} class="form-control" id="Delay">
                            <option>0.5</option>
                            <option>1</option>
                            <option>1.5</option>
                            <option>2</option>
                        </select>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Setting;