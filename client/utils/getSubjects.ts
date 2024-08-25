export const getSubjects = async (exam: string) => {
    try {
        const accessToken = localStorage.getItem("acc_compify");
        const response = await fetch('http://localhost:5000/api/v1/prep/subjects', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': accessToken as string
            },
            body: JSON.stringify({ exam }),
        });

        const data = await response.json();
        return JSON.parse(data.response);
    } catch (err) {
        console.error(err);
    }
};
