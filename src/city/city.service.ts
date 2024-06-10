import db from "../drizzle/db";
import {eq}from "drizzle-orm";
import{TI_city,TS_city,cityTable} from "../drizzle/schema"
export const cityService = async (limit?: number): Promise<TS_city[] | null> => {
    if (limit) {
        return await db.query.cityTable.findMany({
            limit: limit
        });
    }
    return await db.query.cityTable.findMany();
}

export const getCityService = async (id: number): Promise<TI_city| undefined> => {
    return await db.query.cityTable.findFirst({
        where: eq(cityTable.id, id)
    })
}

export const createCityService = async (city: TI_city) => {
    await db.insert(cityTable).values(city)
    return "city created successfully";
}

export const updateCityService = async (id: number, city: TI_city) => {
    await db.update(cityTable).set(city).where(eq(cityTable.id, id))
    return "city updated successfully";
}

export const deleteCityService = async (id: number) => {
    await db.delete(cityTable).where(eq(cityTable.id, id))
    return "city deleted successfully";
}        