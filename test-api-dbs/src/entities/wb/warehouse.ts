import { ZodValidationErrors } from "../../shared/errors.messages";
import { numberRegex } from "../../shared/zod";
import { z } from "zod";

import db from "../../db/sql/knex";
import { Model, snakeCaseMappers } from "objection";
Model.knex(db);

function parseNumberOrDash() {
    return z
        .union([z.string(), z.number()])
        .refine((val) => {
            if (typeof val === "string") return val === "-" || numberRegex.test(val);
            else return true;
        }, ZodValidationErrors.invNumFormat)
        .transform((val) => {
            if (typeof val === "number") return val;
            if (val === "-") return val;
            return Number(val.replace(",", "."));
        });
}

/** WB склад */
export const warehouseScheme = z.object({
    /**
     * Коэффициент, %. На него умножается стоимость доставки и хранения. Во всех тарифах этот коэффициент уже учтён.
     *
     * @type {string}
     */
    boxDeliveryAndStorageExpr: parseNumberOrDash(),
    /**
     * Доставка 1 литра, ₽.
     *
     * @type {string}
     */
    boxDeliveryBase: parseNumberOrDash(),
    /**
     * Доставка каждого дополнительного литра, ₽.
     *
     * @type {string}
     */
    boxDeliveryLiter: parseNumberOrDash(),
    /**
     * Хранение 1 литра, ₽.
     *
     * @type {string}
     */
    boxStorageBase: parseNumberOrDash(),
    /**
     * Хранение каждого дополнительного литра, ₽.
     *
     * @type {string}
     */
    boxStorageLiter: parseNumberOrDash(),
    /**
     * Название склада.
     *
     * @type {string}
     */
    warehouseName: z.string(),
});
export type Warehouse = z.infer<typeof warehouseScheme>;
export class WarehouseKnexModel extends Model {
    static tableName = "box_rates";
    static get columnNameMappers() {
        return snakeCaseMappers();
    }
}

/** Получение значений Warehouse */
export const processWarehouses = (chunk: Warehouse[]) => {
    if (chunk[0] === undefined) return [];
    const zodChunk = z.array(warehouseScheme).parse(chunk);
    return [Object.keys(chunk[0]), ...zodChunk.map((obj) => Object.values(obj))];
};
