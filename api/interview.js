const Groq = require('groq-sdk');

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

const SYSTEM_PROMPT = `You are a senior technical interviewer at a top product-based company.

Rules:
• Ask only one question at a time
• Never reveal answers during the interview
• Ask follow-ups if answers are shallow
• Increase difficulty if answers are strong
• Track strengths and mistakes silently
• End interview after 8–10 questions

At the end, generate a structured interview report with scores (0-10), strengths, and weaknesses.`;

module.exports = async function handler(req, res) {
    // Enable CORS for local testing if needed (Vercel handles this in rewrites usually, but good practice)
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        console.log("Received request");
        if (!process.env.GROQ_API_KEY) {
            console.error("Missing GROQ_API_KEY");
            throw new Error("Server Misconfiguration: Missing API Key");
        }

        const { messages, role, jsonMode } = req.body;

        if (!messages || !Array.isArray(messages)) {
            return res.status(400).json({ error: 'Invalid messages format' });
        }

        const conversation = [
            { role: 'system', content: `${SYSTEM_PROMPT}\n\nCurrent Role: ${role || 'General Software Engineer'}` },
            ...messages
        ];

        console.log("Calling Groq API...");
        const chatCompletion = await groq.chat.completions.create({
            messages: conversation,
            model: 'llama-3.3-70b-versatile',
            temperature: jsonMode ? 0.2 : 0.7,
            max_tokens: jsonMode ? 2048 : 1024,
            response_format: jsonMode ? { type: "json_object" } : undefined,
        });

        const aiResponse = chatCompletion.choices[0]?.message?.content || "Consider this a pass. Let's move on.";
        console.log("Got response from Groq");

        res.status(200).json({ reply: aiResponse });

    } catch (error) {
        console.error('Backend Error:', error);
        res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
}
