export const getResponseFromBot = async (text: string): Promise<string> => {
    const accessToken = localStorage.getItem("acc_compify");
  const response = await fetch('https://compify.onrender.com/api/v1/study/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'token': accessToken as string

    },
    body: JSON.stringify({ text }),
  });

  const data = await response.json();
  return data.response;
};