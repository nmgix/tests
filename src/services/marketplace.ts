import { axiosInstance } from "#axios.ts";
import { tariffApiResponseScheme } from "#entities/wb/tariff-api.ts";
import { logger } from "#logger.ts";
import { formatDate } from "#shared/date.ts";
import { MarketplaceErrors } from "#shared/errors.messages.ts";

export async function fetchTariffs(date: Date = new Date()) {
    try {
        const response = await axiosInstance.get<{ response: typeof tariffApiResponseScheme }>(process.env.WB_BOX_TARIFF_ENDPOINT, {
            params: {
                date: formatDate(date),
            },
        });
        return tariffApiResponseScheme.parse(response.data.response);
    } catch (error) {
        logger.error(`${MarketplaceErrors.fetchTariffs}: ${error}`);
    }
}
