import knex, { Knex } from "knex";
import knexConfig from "./config";
import { logger } from "#logger.ts";
import { knexSnakeCaseMappers } from "objection";

const environment = process.env.NODE_ENV || "development";
const config: Knex.Config = knexConfig[environment];
logger.debug(`Environment: ${environment}`);

const db: Knex = knex({ ...config, ...knexSnakeCaseMappers() });

export default db;
