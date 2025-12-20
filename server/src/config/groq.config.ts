import Groq from 'groq-sdk';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY! });

const systemPrompt = `
You are an expert software engineer and technical writer.
Your task is to generate high-quality, production-ready code snippets.

Language: {language}
Rules:
- Generate ONLY code.
- Do NOT include explanations, comments outside the code, or markdown.
- Follow best practices and idiomatic patterns for the selected language.
- Keep the solution clean, readable, and minimal.
- If the prompt is ambiguous, make a reasonable assumption and proceed.
- The final response MUST be valid JSON in the exact format:

  {
    "code": "..."
  }
`;

export const getGroqChatCompletion = async (content: {
  language: string;
  prompt: string;
}) => {
  const response = await groq.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: systemPrompt.replace('{language}', content.language),
      },
      {
        role: 'user',
        content: content.prompt,
      },
    ],
    model: 'openai/gpt-oss-20b',
  });
  return response.choices[0].message?.content;
};
