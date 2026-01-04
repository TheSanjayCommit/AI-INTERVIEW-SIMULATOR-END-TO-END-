/**
 * Service to interact with the backend API
 */
export const getAIResponse = async (messages, role) => {
    try {
        const response = await fetch('/api/interview', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ messages, role }),
        });

        if (!response.ok) {
            const errData = await response.json().catch(() => ({}));
            throw new Error(errData.error || `API Error: ${response.statusText}`);
        }

        const data = await response.json();
        return data.reply;
    } catch (error) {
        console.error("Error fetching AI response:", error);
        return `Error: ${error.message}. Please check connection or API Key.`;
    }
};
