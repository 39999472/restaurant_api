import db from "../drizzle/db";
import {eq}from "drizzle-orm";
import{TI_status_catalog,TS_status_catalog,status_catalogTable} from "../drizzle/schema"
export const status_catalogService = async (limit?: number): Promise<TS_status_catalog[] | null> => {
    if (limit) {
        return await db.query.status_catalogTable.findMany({
            limit: limit
        });
    }
    return await db.query.status_catalogTable.findMany();
}

export const get_status_catalogService = async (id: number): Promise<TI_status_catalog| undefined> => {
    return await db.query.status_catalogTable.findFirst({
        where: eq(status_catalogTable.id, id)
    })
}

export const create_status_catalogService = async (status_catalog: TI_status_catalog) => {
    await db.insert(status_catalogTable).values(status_catalog)
    return "status_category created successfully";
}

export const update_status_catalogService = async (id: number, status_category: TI_status_catalog) => {
    await db.update(status_catalogTable).set(status_category).where(eq(status_catalogTable.id, id))
    return "status_category updated successfully";
}

export const delete_status_catalogService = async (id: number) => {
    await db.delete(status_catalogTable).where(eq(status_catalogTable.id, id))
    return "state deleted successfully";
}