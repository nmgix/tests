declare namespace NodeJS {
    export interface ProcessEnv {
        NODE_ENV: "development" | "production" | "test";

        WB_API_KEY: string;
        WB_BASE_URL: string;
        WB_BOX_TARIFF_ENDPOINT: string;
        GOOGLE_SHEET_NAME: string;
        GOOGLE_TRUSTED_EMAIL: string;
        GOOGLE_DEFAULT_SHEETS: string;

        DB_USER: string;
        DB_PASSWORD: string;
        DB_NAME: string;
        DB_HOST: string;
        DB_PORT: number;
        PGADMIN_DEFAULT_EMAIL: string;
        PGADMIN_DEFAULT_PASSWORD: string;
    }
}
