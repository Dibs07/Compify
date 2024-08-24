export const getExams = async () => {
    try {
        const response: any = await fetch('http://localhost:5000/api/v1/prep/',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        const data: any = await response.json();
        return JSON.parse(data.response);
    } catch (err) {
        console.log(err);
    }
};