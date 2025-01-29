declare namespace NodeJS {
    export interface ProcessEnv {
        NODE_ENV: "development" | "production"; // "test"

        WB_API_KEY: string;
        WB_BASE_URL: string;
        WB_BOX_TARIFF_ENDPOINT: string;

        POSTGRES_USER: string;
        POSTGRES_PASSWORD: string;
        POSTGRES_DB: string;
        DATABASE_URL: string;
        PGADMIN_DEFAULT_EMAIL: string;
        PGADMIN_DEFAULT_PASSWORD: string;
    }
}
