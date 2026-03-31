export const askAI = async (message: string) => {
  // Replace with your actual serverless function or proxy
  // Never expose your API key directly in the frontend
  /*
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  });
  return response.json();
  */
  
  // Mock logic for demo
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("This is a simulated AI response. Please connect your OpenAI API via a secure backend to get real answers.");
    }, 1000);
  });
};