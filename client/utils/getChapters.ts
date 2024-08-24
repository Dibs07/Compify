export const getChapters = async (subject:string,exam:string) => {
    try {
        const response: any = await fetch('http://localhost:5000/api/v1/prep/chapters',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({subject,exam})
            }
        );
        const data: any = await response.json();
        return JSON.parse(data.response);
    } catch (err) {
        console.log(err);
    }
};