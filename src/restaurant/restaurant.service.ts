import db from "../drizzle/db";
import {eq}from "drizzle-orm";
import{TI_restaurant,TS_restaurant,restaurantTable} from "../drizzle/schema"
export const restaurantService = async (limit?: number): Promise<TS_restaurant[] | null> => {
    if (limit) {
        return await db.query.restaurantTable.findMany({
            limit: limit
        });
    }
    return await db.query.restaurantTable.findMany();
}

export const getRestaurantService = async (id: number): Promise<TI_restaurant | undefined> => {
    return await db.query.restaurantTable.findFirst({
        where: eq(restaurantTable.id, id)
    })
}

export const createRestaurantService = async (restaurant: TI_restaurant) => {
    await db.insert(restaurantTable).values(restaurant)
    return "restaurant created successfully";
}

export const updateRestaurantService = async (id: number, restaurant: TI_restaurant) => {
    await db.update(restaurantTable).set(restaurant).where(eq(restaurantTable.id, id))
    return "restaurant updated successfully";
}

export const deleteRestaurantService = async (id: number) => {
    await db.delete(restaurantTable).where(eq(restaurantTable.id, id))
    return "restaurant deleted successfully";
}