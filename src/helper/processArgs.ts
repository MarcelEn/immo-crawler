const getEnvStyledArg = (name: string, defaultValue: string) =>
    (process.argv.map(arg => arg.split("="))
        .filter(arg => arg.length === 2)
        .find(([key]) => key === name)
        || [name, defaultValue])[1];

export const isDevModeEnabled = () => getEnvStyledArg("MODE", "PROD") === "DEV";

export const getDBPath = () => getEnvStyledArg("DB_PATH", "db.db");

export const getPort = () => parseInt(getEnvStyledArg("DB_PATH", "3000"), 10);