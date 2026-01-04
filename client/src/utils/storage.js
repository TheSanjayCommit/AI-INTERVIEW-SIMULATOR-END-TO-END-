export const STORAGE_KEY = 'interview_history';

export const getHistory = () => {
    try {
        const history = localStorage.getItem(STORAGE_KEY);
        return history ? JSON.parse(history) : [];
    } catch (error) {
        console.error('Failed to parse interview history:', error);
        return [];
    }
};

export const saveAttempt = (attempt) => {
    try {
        const history = getHistory();
        const newHistory = [...history, attempt];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
    } catch (error) {
        console.error('Failed to save interview attempt:', error);
    }
};
