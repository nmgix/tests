import { CargoItem } from "./cargodb.types";
import { execute } from "../../helpers/sqlconnection";

export enum DatabaseQueries {
  GetCargo = `
    SELECT id, name, distance, count, date
    FROM travel_table
    ORDER BY id
    `,
  // OFFSET ? ROWS FETCH NEXT ? ROWS ONLY
  SetCargo = `
    INSERT INTO travel_table (id, name, distance, count, date)
    VALUES
  `,
  DeleteCargo = `
    DELETE FROM travel_table WHERE id = ?
  `,
}

export const getCargo = async (offset: number, next: number) => {
  return execute<CargoItem[]>(DatabaseQueries.GetCargo, [offset, next]);
};

export const setNewCargo = async (cargo: CargoItem[]) => {
  return execute<{}>(
    `${DatabaseQueries.SetCargo} ${cargo
      .map((element) => `(NULL, '${element.name}', '${element.distance}', '${element.count}', '${element.date}')`)
      .join(",")}`,
    []
  );
};

export const deleteCargoOne = async (id: number) => {
  return execute<{}>(DatabaseQueries.DeleteCargo, id);
};
