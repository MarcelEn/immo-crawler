import { AbstractDB } from "../AbstractDB";

const tableName = "PushNotification";

export const PushNotificationSQL = {
    createTable: `
    CREATE TABLE IF NOT EXISTS ${tableName} (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        subscription varchar(255)
    )
    `,
    create: `
    INSERT INTO ${tableName} (subscription)
    VALUES (?)
    `,
    byId: `
    SELECT * FROM ${tableName}
    WHERE id = ?
    `,
    deleteById: `
    DELETE FROM ${tableName}
    WHERE id = ?
    `,
    all: `
    SELECT * FROM ${tableName}
    `,
};

export interface PushNotification {
    id: number;
    subscription: string;
}


export type PushNotificationDTO = Readonly<{
    create: (entry: Partial<PushNotification>) => Promise<number>;
    byId: (id: number) => Promise<PushNotification>;
    all: () => Promise<PushNotification[]>;
    deleteById: (id: number) => Promise<number>;
}>;

export const PushNotificationDTO = async (db: AbstractDB): Promise<PushNotificationDTO> => {
    await db.run(PushNotificationSQL.createTable);

    const byId: PushNotificationDTO["byId"] = async id => await db.get(PushNotificationSQL.byId, id);

    const all: PushNotificationDTO["all"] = async () => await db.each(PushNotificationSQL.all);

    const create: PushNotificationDTO["create"] = async ({ subscription }) => (await db.run(PushNotificationSQL.create, subscription)).lastID;

    const deleteById: PushNotificationDTO["deleteById"] = async (id: number) => (await db.run(PushNotificationSQL.deleteById, id)).lastID;

    return Object.freeze({
        all,
        byId,
        create,
        deleteById,
    });
}