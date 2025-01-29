import axios from "axios";

// дублирование
import "#shared/dotenv.ts";

export const axiosInstance = axios.create({
    baseURL: process.env.WB_BASE_URL,
    headers: {
        "Content-Type": "application/json",
        "Authorization": process.env.WB_API_KEY,
    },
});
