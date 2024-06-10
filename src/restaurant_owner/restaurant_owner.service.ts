import db from "../drizzle/db";
import {eq}from "drizzle-orm";
import{TI_restaurant_owner,TS_restaurant_owner,restaurant_ownerTable} from "../drizzle/schema"
export const restaurant_ownerService = async (limit?: number): Promise<TS_restaurant_owner[] | null> => {
    if (limit) {
        return await db.query.restaurant_ownerTable.findMany({
            limit: limit
        });
    }
    return await db.query.restaurant_ownerTable.findMany();
}

export const getRestaurant_ownerService = async (id: number): Promise<TI_restaurant_owner | undefined> => {
    return await db.query.restaurant_ownerTable.findFirst({
        where: eq(restaurant_ownerTable.id, id)
    })
}

export const createRestaurant_ownerService = async (restaurant_owner: TI_restaurant_owner) => {
    await db.insert(restaurant_ownerTable).values(restaurant_owner)
    return "restaurant_owner created successfully";
}

export const updateRestaurant_ownerService = async (id: number, restaurant_owner: TI_restaurant_owner) => {
    await db.update(restaurant_ownerTable).set(restaurant_owner).where(eq(restaurant_ownerTable.id, id))
    return "restaurant_owner updated successfully";
}

export const deleteRestaurant_ownerService = async (id: number) => {
    await db.delete(restaurant_ownerTable).where(eq(restaurant_ownerTable.id, id))
    return "restaurant_owner deleted successfully";
}