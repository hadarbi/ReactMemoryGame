import React from 'react';

/**
 * Setting component renders a form to configure settings for rows, columns, and delay.
 * 
 * @param {Object} props - The component props
 * @param {Object} props.settings - Current settings object with keys: rows, columns, delay
 * @param {Function} props.setSettings - Function to update the settings
 * @returns {JSX.Element} The rendered component
 */
function Setting({ settings, setSettings }) {
    /**
     * Creates an onChange handler for a specific key in the settings object.
     * 
     * @param {string} key - The key in the settings object to update
     * @returns {Function} The event handler function
     */
    const onChange = (key) => (e) => {
        const value = e.target.value;
        const updatedSettings = {
            ...settings,
            [key]: value,
        };
        setSettings(updatedSettings);
    }

    return (
        <div className="container pt-5 text-center form-group">
            <form>
                <div className="row">
                    <div className="col">
                        <label htmlFor="NumberOfRows">Number of rows:</label>
                        <select
                            value={settings.rows}
                            onChange={onChange('rows')}
                            className="form-control"
                            id="NumberOfRows">
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </select>
                    </div>
                    <div className="col">
                        <label htmlFor="NumberOfColumns">Number of columns:</label>
                        <select
                            value={settings.columns}
                            onChange={onChange('columns')}
                            className="form-control"
                            id="NumberOfColumns">
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </select>
                    </div>
                    <div className="col">
                        <label htmlFor="Delay">Delay (in seconds):</label>
                        <select
                            value={settings.delay}
                            onChange={onChange('delay')}
                            className="form-control"
                            id="Delay">
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
