import { axiosInstance } from "#axios.ts";
import { tariffApiResponse } from "#entities/wb/tariff-api.ts";
import { formatDate } from "#shared/date.ts";

export async function fetchTariffs(date: Date = new Date()) {
    try {
        const response = await axiosInstance.get<{ response: typeof tariffApiResponse }>(process.env.WB_BOX_TARIFF_ENDPOINT, {
            params: {
                date: formatDate(date),
            },
        });
        return response.data.response;
    } catch (error) {
        console.error("Error fetching tariffs:", error);
        throw error;
    }
}
