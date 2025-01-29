import { ZodValidationErrors } from "#shared/errors.ts";
import { numberRegex } from "#shared/zod.js";
import { z } from "zod";

/** WB короб */
export const box = z.object({
    /**
     * Коэффициент, %. На него умножается стоимость доставки и хранения. Во всех тарифах этот коэффициент уже учтён.
     *
     * @type {string}
     */
    boxDeliveryAndStorageExpr: z.string().regex(numberRegex, ZodValidationErrors.invNumFormat),
    /**
     * Доставка 1 литра, ₽.
     *
     * @type {string}
     */
    boxDeliveryBase: z.string().regex(numberRegex, ZodValidationErrors.invNumFormat),
    /**
     * Доставка каждого дополнительного литра, ₽.
     *
     * @type {string}
     */
    boxDeliveryLiter: z.string().regex(numberRegex, ZodValidationErrors.invNumFormat),
    /**
     * Хранение 1 литра, ₽.
     *
     * @type {string}
     */
    boxStorageBase: z.string().regex(numberRegex, ZodValidationErrors.invNumFormat),
    /**
     * Хранение каждого дополнительного литра, ₽.
     *
     * @type {string}
     */
    boxStorageLiter: z.string().regex(numberRegex, ZodValidationErrors.invNumFormat),
    /**
     * Название склада.
     *
     * @type {string}
     */
    warehouseName: z.string(),
});
