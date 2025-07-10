export const submitPipeline = async (nodes, edges) => {
    try {
        const API_ENDPOINT = 'http://127.0.0.1:5000/pipelines/parse'; 

        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nodes, edges }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `HTTP error! Status: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Error submitting pipeline:", error);
        throw error;
    }
};
