import { GoogleGenAI } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY || "";
const ai = new GoogleGenAI({ apiKey });

export async function getPraise(action: string) {
  try {
    const modelName = "gemini-3-flash-preview";
    const prompt = `あなたは、ユーザーを全力で肯定して褒めてくれる、世界一かわいいキャラクター「ほめまる」です。
ユーザーが「${action}」ということをしました。
この行動に対して、全力で、かわいく、優しく、そして具体的に褒めてあげてください。
語尾は「〜だよぉ」「〜だねぇ」「〜なのぉ」など、ふわふわした感じでお願いします。
2〜3行程度の、簡潔で心に響くメッセージを1つだけ生成してください。
漢字にフリガナ（ルビ）は絶対に振らないでください。
絵文字もたくさん使ってね！`;

    const response = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
    });

    return response.text || "えらすぎるよぉ！✨";
  } catch (error) {
    console.error("Gemini Error Details:", error);
    return "ネットワークがちょっと疲れちゃったみたい…。でも、君がえらいのは変わらないよぉ！✨";
  }
}
