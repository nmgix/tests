import { z } from "zod";
import { box } from "./box";

/** WB эндпоинт "Коэффициенты складов" */
export const tariffApiResponse = z.object({
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
            warehouseList: z.array(box),
        }),
    }),
});
