import { Knex } from "knex";

exports.up = async function (knex: Knex) {
    await knex.schema.createTable("box_rates", (table) => {
        table.increments("id").primary();
        table.date("date").notNullable();
        table.string("warehouse_name").notNullable();
        table.string("box_delivery_and_storage_expr").notNullable();
        table.string("box_delivery_base").notNullable();
        table.string("box_delivery_liter").notNullable();
        table.string("box_storage_base").notNullable();
        table.string("box_storage_liter").notNullable();

        table.unique(["date", "warehouse_name"]);
    });
};

exports.down = function (knex: Knex) {
    return knex.schema.dropTable("box_rates");
};
