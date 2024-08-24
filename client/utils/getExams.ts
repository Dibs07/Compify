const baseUrl = "http://localhost:5000/api/v1/prep/"

export const getExams = async () => {
    try {
        const response: any = await fetch(baseUrl,
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

export const getSubjects = async () => { 
    try {
        const response: any = await fetch(`${baseUrl}/subjects`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        const data: any = await response.json();
        return JSON.parse(data.response);
    } catch (error) {
        console.log(error);
    }
}