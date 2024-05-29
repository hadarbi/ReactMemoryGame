import { useEffect, useState } from 'react';
import { RANKS_LOCAL_STORAGE_KEY } from '../constants';

/**
 * Custom hook to manage ranks using local storage.
 *
 * This hook provides a state variable for ranks and a function to update it.
 * It synchronizes the ranks state with local storage to persist the data.
 *
 * @returns {Object} An object containing the ranks state and the setRanks function.
 */
export const useManageRanks = () => {
    const [ranks, setRanks] = useState({});

    useEffect(() => {
        const hasLoadedRanks = Object.entries(ranks).length > 0;
        if (hasLoadedRanks) {
            localStorage.setItem(RANKS_LOCAL_STORAGE_KEY, JSON.stringify(ranks));
        } else {
            const ranksFromStorage = localStorage.getItem(RANKS_LOCAL_STORAGE_KEY);
            if (ranksFromStorage) {
                setRanks(JSON.parse(ranksFromStorage));
            }
        }
    }, [ranks]);

    return {
        ranks,
        setRanks,
    };
};
