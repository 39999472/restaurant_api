import db from "../drizzle/db";
import {eq}from "drizzle-orm";
import{TI_order_menu_item,TS_order_menu_item,order_menu_itemTable} from "../drizzle/schema"
export const order_menu_itemService = async (limit?: number): Promise<TS_order_menu_item[] | null> => {
    if (limit) {
        return await db.query.order_menu_itemTable.findMany({
            limit: limit
        });
    }
    return await db.query.order_menu_itemTable.findMany();
}
//order_menu_item
export const get_order_menu_itemService = async (id: number): Promise<TI_order_menu_item| undefined> => {
    return await db.query.order_menu_itemTable.findFirst({
        where: eq(order_menu_itemTable.id, id)
    })
}

export const create_order_menu_itemService = async (order_menu_item: TI_order_menu_item) => {
    await db.insert(order_menu_itemTable).values(order_menu_item)
    return "order_menu_item created successfully";
}

export const update_order_menu_itemService = async (id: number, order_menu_item: TI_order_menu_item) => {
    await db.update(order_menu_itemTable).set(order_menu_item).where(eq(order_menu_itemTable.id, id))
    return "state updated successfully";
}

export const delete_order_menu_itemService = async (id: number) => {
    await db.delete(order_menu_itemTable).where(eq(order_menu_itemTable.id, id))
    return "state deleted successfully";
}
