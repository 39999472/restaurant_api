import db from "../drizzle/db";
import {eq}from "drizzle-orm";
import{TI_menu_item,TS_menu_item,menu_itemTable} from "../drizzle/schema"
export const menu_itemService = async (limit?: number): Promise<TS_menu_item[] | null> => {
    if (limit) {
        return await db.query.menu_itemTable.findMany({
            limit: limit
        });
    }
    return await db.query.menu_itemTable.findMany();
}

export const get_menu_itemService = async (id: number): Promise<TI_menu_item| undefined> => {
    return await db.query.menu_itemTable.findFirst({
        where: eq(menu_itemTable.id, id)
    })
}

export const create_menu_itemService = async (state: TI_menu_item) => {
    await db.insert(menu_itemTable).values(state)
    return "menu_item created successfully";
}

export const update_menu_itemService = async (id: number, menu_item: TI_menu_item) => {
    await db.update(menu_itemTable).set(menu_item).where(eq(menu_itemTable.id, id))
    return "menu_item updated successfully";
}

export const delete_menu_itemService = async (id: number) => {
    await db.delete(menu_itemTable).where(eq(menu_itemTable.id, id))
    return "menu_item deleted successfully";
}
