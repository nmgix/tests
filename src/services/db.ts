import { Warehouse, WarehouseKnexModel, warehouseScheme } from "#entities/wb/warehouse.ts";
import { logger } from "#logger.ts";
import { formatDate } from "#shared/date.ts";
import { DBErrors } from "#shared/errors.messages.ts";
import z from "zod";

export const setWarehouses = async (data: Warehouse[], date: Date = new Date()) => {
    if (!data) throw new Error(DBErrors.missingProperites);
    if (data.length === 0) return;
    logger.info(`Сохранение тарифов за ${formatDate(date)}`);
    const zodData = z.array(warehouseScheme).parse(data);
    const insertResult = await WarehouseKnexModel.query().insert(zodData.map((w) => ({ ...w, date })));
    logger.info(insertResult);

    return true;
    // .onConflict(["date", "warehouse_name"]) // Если конфликт (date + warehouse_name уже есть)
    // .merge();
    // z.array(warehouseScheme).parse(chunk);
};

export const getWarehouses = (date: Date = new Date()) => {
    logger.info(`Получение тарифов за ${formatDate(date)}`);
};
