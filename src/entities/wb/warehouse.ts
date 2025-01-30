import { ZodValidationErrors } from "#shared/errors.messages.ts";
import { numberRegex } from "#shared/zod.ts";
import { z } from "zod";

/** WB склад */
export const warehouseScheme = z.object({
    /**
     * Коэффициент, %. На него умножается стоимость доставки и хранения. Во всех тарифах этот коэффициент уже учтён.
     *
     * @type {string}
     */
    boxDeliveryAndStorageExpr: z.string().regex(numberRegex, ZodValidationErrors.invNumFormat),
    // .transform((val) => Number(val))
    // .refine((val) => !isNaN(val), ZodValidationErrors.invNumFormat),
    /**
     * Доставка 1 литра, ₽.
     *
     * @type {string}
     */
    boxDeliveryBase: z.string().regex(numberRegex, ZodValidationErrors.invNumFormat),
    // .transform((val) => Number(val))
    // .refine((val) => !isNaN(val), ZodValidationErrors.invNumFormat),
    /**
     * Доставка каждого дополнительного литра, ₽.
     *
     * @type {string}
     */
    boxDeliveryLiter: z.string().regex(numberRegex, ZodValidationErrors.invNumFormat),
    // .transform((val) => Number(val))
    // .refine((val) => !isNaN(val), ZodValidationErrors.invNumFormat),
    /**
     * Хранение 1 литра, ₽.
     *
     * @type {string}
     */
    boxStorageBase: z.string().regex(numberRegex, ZodValidationErrors.invNumFormat),
    // .transform((val) => Number(val))
    // .refine((val) => !isNaN(val), ZodValidationErrors.invNumFormat),
    /**
     * Хранение каждого дополнительного литра, ₽.
     *
     * @type {string}
     */
    boxStorageLiter: z.string().regex(numberRegex, ZodValidationErrors.invNumFormat),
    // .transform((val) => Number(val))
    // .refine((val) => !isNaN(val), ZodValidationErrors.invNumFormat),
    /**
     * Название склада.
     *
     * @type {string}
     */
    warehouseName: z.string(),
});
export type Warehouse = z.infer<typeof warehouseScheme>;
