import { useEffect, useState } from 'react';

/**
 * Custom hook to validate settings and name inputs.
 *
 * @param {Object} params - The parameters object.
 * @param {Object} params.settings - The settings object containing rows and columns.
 * @param {string} params.name - The name to be validated.
 * @returns {Object} An object containing the activeErrors array.
 */
export const useValidation = ({ settings, name }) => {
    const [errors, setErrors] = useState({});

    useEffect(() => {
        // Validating Name Input
        setErrors(prevState => ({ ...prevState, textInput: '' }));

        if (!name) {
            setErrors(prevState => ({ ...prevState, textInput: 'Name must be filled.' }));
        } else {
            const isOnlyAlphanumeric = /^[a-zA-Z0-9]+$/.test(name);
            if (!isOnlyAlphanumeric) {
                setErrors(prevState => ({ ...prevState, textInput: 'Name must contain only letters or numbers.' }));
            }
        }
    }, [name]);

    useEffect(() => {
        // Validating settings
        setErrors(prevState => ({ ...prevState, boardSize: '' }));

        const isSettingsValid = (settings.rows * settings.columns) % 2 === 0;
        if (!isSettingsValid) {
            setErrors(prevState => ({ ...prevState, boardSize: 'Board size must be an even number.' }));
        }
    }, [settings]);

    const activeErrors = Object.values(errors).filter(val => !!val);

    return { activeErrors };
};
