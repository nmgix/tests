import { CargoItem } from "../../helpers/cargodb_data";
import { execute } from "../../helpers/sqlconnection";

export enum DatabaseQueries {
  GetCargo = `
    SELECT id, name, distance, count, date
    FROM travel_table
    ORDER BY id
    `,
  // OFFSET ? ROWS FETCH NEXT ? ROWS ONLY
}

export const getCargo = async (offset: number, next: number) => {
  return execute<CargoItem[]>(DatabaseQueries.GetCargo, [offset, next]);
};
