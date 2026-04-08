
async function generateApp(userInput) {
  const response = await fetch("/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: userInput,
    }),
  });

  const data = await response.json();
  console.log(data.code);
}
