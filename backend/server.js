import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 5000;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const app = express();

app.use(cors());
app.use(express.json());

// POST route to handle recipe generation
app.post("/api/generate-recipe", async (req, res) => {
    try {
        const { ingredients, cuisine, servings, notes } = req.body;

        if (!ingredients) {
            return res.status(400).json({ error: "Ingredients are required" });
        }

        const prompt = `
Create a recipe with the following details:
- Ingredients: ${ingredients}
- Cuisine: ${cuisine}
- Servings: ${servings}
- Notes: ${notes}

Return a clear recipe with:
1. Title
2. Ingredients list
3. Step-by-step instructions
`;

        // Call LLM API
        const response = await fetch("https://api.openai.com/v1/responses", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: "gpt-4.1-mini",
                input: prompt,
            }),
        });

        const data = await response.json();

        res.json({
            result: data.output?.[0]?.content?.[0]?.text || "No response",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong" });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});