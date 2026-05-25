export default async function handler(req, res){

  if(req.method !== "POST"){
    return res.status(405).json({ error:"Only POST allowed" });
  }

  try{

    const { messages } = req.body;

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method:"POST",
        headers:{
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type":"application/json"
        },
        body: JSON.stringify({
          model:"openai/gpt-4o-mini",
          messages: [
            {
              role:"system",
              content:"You are PocketDev AI, a helpful coding assistant."
            },
            ...messages
          ]
        })
      }
    );

    const data = await response.json();

    res.status(200).json({
      reply: data.choices?.[0]?.message?.content || "No response"
    });

  }catch(err){
    console.log(err);
    res.status(500).json({ error:"Server error" });
  }
}
