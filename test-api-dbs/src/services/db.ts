import { Warehouse, WarehouseKnexModel, warehouseScheme } from "../entities/wb/warehouse";
import { logger } from "../logger";
import { formatDate } from "../shared/date";
import { DBErrors } from "../shared/errors.messages";
import z from "zod";

export const setWarehouses = async (data: Warehouse[], date: Date = new Date()) => {
    if (!data) throw new Error(DBErrors.missingProperites);
    if (data.length === 0) return;
    logger.info(`Сохранение тарифов за ${formatDate(date)}`);
    const zodData = z.array(warehouseScheme).parse(data);
    await WarehouseKnexModel.query()
        .insert(zodData.map((w) => ({ ...w, date })))
        .onConflict(["date", "warehouse_name"])
        .merge();

    return true;
};

export const getWarehouses = async (date: Date = new Date()) => {
    logger.info(`Получение тарифов за ${formatDate(date)}`);
    const foundWarehouses = await WarehouseKnexModel.query().where("date", "=", date);
    return z.array(warehouseScheme).parse(foundWarehouses);
};
