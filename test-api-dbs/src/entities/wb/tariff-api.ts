import { z } from "zod";
import { warehouseScheme } from "./warehouse";

/** WB эндпоинт "Коэффициенты складов" */
export const tariffApiResponseScheme = z.object({
    response: z.object({
        data: z.object({
            /**
             * Дата начала следующего тарифа.
             *
             * @type {string}
             */
            dtNextBox: z.string(),
            /**
             * Дата окончания последнего установленного тарифа.
             *
             * @type {string}
             */
            dtTillMax: z.string(),
            /** Тарифы для коробов, сгруппированные по складам. */
            warehouseList: z.array(warehouseScheme),
        }),
    }),
});
export type TariffApiResponse = z.infer<typeof tariffApiResponseScheme>;
