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

    // gpt
    // чтобы ON CONFLICT DO UPDATE не вызывать в knex каждый раз
    await knex.raw(`
        CREATE OR REPLACE FUNCTION upsert_box_rates() RETURNS TRIGGER AS $$
        BEGIN
          INSERT INTO box_rates (date, warehouse_name, box_delivery_and_storage_expr, box_delivery_base, box_delivery_liter, box_storage_base, box_storage_liter)
          VALUES (NEW.date, NEW.warehouse_name, NEW.box_delivery_and_storage_expr, NEW.box_delivery_base, NEW.box_delivery_liter, NEW.box_storage_base, NEW.box_storage_liter)
          ON CONFLICT (date, warehouse_name)
          DO UPDATE SET
            box_delivery_and_storage_expr = EXCLUDED.box_delivery_and_storage_expr,
            box_delivery_base = EXCLUDED.box_delivery_base,
            box_delivery_liter = EXCLUDED.box_delivery_liter,
            box_storage_base = EXCLUDED.box_storage_base,
            box_storage_liter = EXCLUDED.box_storage_liter;
          RETURN NULL;
        END;
        $$ LANGUAGE plpgsql;
      `);
};

exports.down = function (knex: Knex) {
    return knex.schema.dropTable("box_rates");
};
