import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

//
// ✅ TEXT UPLOAD
//
export const uploadKnowledge = async (
  botId: string,
  content: string
) => {
  try {
    const res = await api.post("/knowledge/upload", {
      botId,
      content,
    });

    return res.data;
  } catch (error: any) {
    console.error(
      "Text Upload Error:",
      error.response?.data || error.message
    );

    throw new Error(
      error.response?.data?.error || "Failed to upload text"
    );
  }
};

//
// 🔥 URL TRAINING (THIS WAS MISSING)
//
export const uploadFromUrl = async (
  botId: string,
  url: string
) => {
  try {
    const res = await api.post("/knowledge/url", {
      botId,
      url,
    });

    return res.data;
  } catch (error: any) {
    console.error(
      "URL Upload Error:",
      error.response?.data || error.message
    );

    throw new Error(
      error.response?.data?.error || "Failed to train from URL"
    );
  }
};