export const getQuestions = async (exam:string, subject:string, chapters:string[], medium:string, numberOfQuestions:string, pyq:boolean) => {
    try {
        const accessToken = localStorage.getItem("acc_compify");
        const response: any = await fetch('http://localhost:5000/api/v1/prep/questions',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'token': accessToken as string
                },
                body: JSON.stringify({exam, subject, chapters, medium, numberOfQuestions, pyq})
            }
        );
        const data: any = await response.json();

        return (data);
    } catch (err) {
        console.log(err);
    }
};