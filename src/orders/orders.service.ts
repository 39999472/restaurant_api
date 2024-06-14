import db from "../drizzle/db";
import {eq}from "drizzle-orm";
import{TI_order,TS_order,ordersTable} from "../drizzle/schema"
export const ordersService = async (limit?: number): Promise<TS_order[] | null> => {
    if (limit) {
        return await db.query.ordersTable.findMany({
            limit: limit
        });
    }
    return await db.query.ordersTable.findMany();
}
//
export const get_ordersService = async (id: number): Promise<TI_order| undefined> => {
    return await db.query.ordersTable.findFirst({
        where: eq(ordersTable.id, id)
    })
}


export const create_ordersService = async (orders: TI_order) => {
    await db.insert(ordersTable).values(orders)
    return "orders created successfully";
}

export const update_ordersService = async (id: number, orders: TI_order) => {
    await db.update(ordersTable).set(orders).where(eq(ordersTable.id, id))
    return "orders updated successfully";
}

export const delete_ordersService = async (id: number) => {
    await db.delete(ordersTable).where(eq(ordersTable.id, id))
    return "orders deleted successfully";
}