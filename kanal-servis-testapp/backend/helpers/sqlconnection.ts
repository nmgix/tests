import { createPool, Pool } from "mysql";
import { DATA_SOURCES } from "./vars";
const dataSource = DATA_SOURCES.mySqlDataSource;
let pool: Pool;

export function connectMySQL() {
  try {
    pool = createPool({
      connectionLimit: dataSource.DB_CONNECTION_LIMIT,
      host: dataSource.DB_HOST,
      user: dataSource.DB_USER,
      password: dataSource.DB_PASSWORD,
      database: dataSource.DB_DATABASE,
    });

    console.log("MySQL Adapter Pool generated successfully");
  } catch (error) {
    console.log("MySQL Adatper connecting error: ", error);
    throw new Error("fatal error of sql adapter");
  }
}

export function execute<T>(query: string, params: string | number | string[] | number[]): Promise<T> {
  try {
    if (!pool) throw new Error("adapater not yet made");

    return new Promise<T>((resolve, reject) => {
      pool.query(query, params, (error, result) => {
        if (error) reject(error);
        else resolve(result);
      });
    });
  } catch (error) {
    console.log("MySQL Adatper connecting error: ", error);
    throw new Error("fatal error of sql adapter");
  }
}
