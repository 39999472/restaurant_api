import db from "../drizzle/db";
import {eq}from "drizzle-orm";
import{TI_order_status,TS_order_status,order_statusTable} from "../drizzle/schema"
export const order_statusService = async (limit?: number): Promise<TS_order_status[] | null> => {
    if (limit) {
        return await db.query.order_statusTable.findMany({
            limit: limit
        });
    }
    return await db.query.order_statusTable.findMany();
}
//
export const get_order_statusService = async (id: number): Promise<TI_order_status| undefined> => {
    return await db.query.order_statusTable.findFirst({
        where: eq(order_statusTable.id, id)
    })
}

export const create_order_statusService = async (order_status: TI_order_status) => {
    await db.insert(order_statusTable).values(order_status)
    return "order_status created successfully";
}

export const update_order_statusService = async (id: number, order_status: TI_order_status) => {
    await db.update(order_statusTable).set(order_status).where(eq(order_statusTable.id, id))
    return "order_status updated successfully";
}

export const delete_order_statusService = async (id: number) => {
    await db.delete(order_statusTable).where(eq(order_statusTable.id, id))
    return "order_status deleted successfully";
}