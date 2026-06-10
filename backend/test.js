require("dotenv").config();

const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
    res.send("AI Backend Running 🚀");
});

// AI Analyze Route
app.post("/analyze", async (req, res) => {

    const fileName = req.body.fileName;

    const prompt = `
You are a career assistant AI.

Analyze this resume file name: ${fileName}

Give:
1. Skill Score out of 100
2. 3 Strengths
3. 3 Improvements
4. 3 Interview Questions
`;

    try {

        const response = await axios.post(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
        contents: [
            {
                parts: [
                    {
                        text: prompt
                    }
                ]
            }
        ]
    }
);

        const aiText =
            response.data.candidates[0].content.parts[0].text;

        res.json({
            result: aiText
        });

    } catch (error) {

        console.log(error.response?.data || error.message);

        res.status(500).json({
            error: "AI request failed",
            details: error.message
        });
    }
});

// Start Server
app.listen(3000, () => {
    console.log("AI Server running on http://localhost:3000");
});