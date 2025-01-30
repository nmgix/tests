import { axiosInstance } from "#axios.ts";
import { TariffApiResponse, tariffApiResponseScheme } from "#entities/wb/tariff-api.ts";
import { logger } from "#logger.ts";
import { formatDate } from "#shared/date.ts";
import { MarketplaceErrors } from "#shared/errors.messages.ts";

export async function fetchTariffs(dateDay: Date = new Date()) {
    try {
        logger.info(`Получение тарифов на коробы от даты: ${formatDate(dateDay)}`);
        const response = await axiosInstance.get<{ response: typeof tariffApiResponseScheme }>(process.env.WB_BOX_TARIFF_ENDPOINT, {
            params: {
                date: formatDate(dateDay),
            },
        });
        if (!response?.data?.response) throw new Error();
        return tariffApiResponseScheme.parse(response.data) as TariffApiResponse;
    } catch (error) {
        logger.error(error ? `${MarketplaceErrors.fetchBoxTariffs}: ${error}` : MarketplaceErrors.fetchBoxTariffs);
        return null;
    }
}
