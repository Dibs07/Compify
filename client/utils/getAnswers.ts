import { Answer } from "@/lib/store/answers";

export const getAnswers = async (subject:string,exam:string,answers:Answer[],chapters:string[]) => {
    try {
        const accessToken = localStorage.getItem("acc_compify");
        const response: any = await fetch('https://compify.onrender.com/api/v1/prep/answers',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'token': accessToken as string
                },
                body: JSON.stringify({answers,exam,subject,chapters})
            }
        );
        const data: any = await response.json();
        return (data.response);
    } catch (err) {
        console.log(err);
    }
};