import { AbstractDB } from "../AbstractDB";

const tableName = "ImmoWhiteList";

export const ImmoWhiteListSQL = {
    createTable: `
    CREATE TABLE IF NOT EXISTS ${tableName} (
        id INTEGER PRIMARY KEY
    )
    `,
    create: `
    INSERT INTO ${tableName} (id)
    VALUES (?)
    `,
    byId: `
    SELECT * FROM ${tableName}
    WHERE id = ?
    `,
    deleteById: `
    DELETE FROM ${tableName}
    WHERE id = ?
    `
};

export interface ImmoWhiteListEntry {
    id: number;
}


export type ImmoWhiteListDTO = Readonly<{
    create: (entry: ImmoWhiteListEntry) => Promise<number>;
    byId: (id: number) => Promise<ImmoWhiteListEntry>;
    deleteById: (id: number) => Promise<number>;
}>;

export const ImmoWhiteListDTO = async (db: AbstractDB): Promise<ImmoWhiteListDTO> => {
    await db.run(ImmoWhiteListSQL.createTable);

    const byId: ImmoWhiteListDTO["byId"] = async id => await db.get(ImmoWhiteListSQL.byId, id);

    const create: ImmoWhiteListDTO["create"] = async ({ id }) => (await db.run(ImmoWhiteListSQL.create, id)).lastID;

    const deleteById: ImmoWhiteListDTO["deleteById"] = async (id: number) => (await db.run(ImmoWhiteListSQL.deleteById, id)).lastID;

    return Object.freeze({
        byId,
        create,
        deleteById, 
    });
}