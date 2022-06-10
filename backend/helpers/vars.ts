export const DATA_SOURCES = {
  mySqlDataSource: {
    DB_HOST: process.env.SQL_HOST,
    DB_USER: process.env.SQL_USER,
    DB_PASSWORD: process.env.SQL_PASSWORD,
    DB_PORT: process.env.SQL_PORT,
    DB_DATABASE: process.env.SQL_DATABASE,
    DB_CONNECTION_LIMIT: process.env.SQL_LIMIT ? parseInt(process.env.SQL_LIMIT) : 4,
  },
};
