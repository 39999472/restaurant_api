import db from "../drizzle/db";
import {eq}from "drizzle-orm";
import{TI_address,TS_address,addressTable} from "../drizzle/schema"
export const addressService = async (limit?: number): Promise<TS_address[] | null> => {
    if (limit) {
        return await db.query.addressTable.findMany({
            limit: limit
        });
    }
    return await db.query.addressTable.findMany();
}

export const get_addressService = async (id: number): Promise<TI_address| undefined> => {
    return await db.query.addressTable.findFirst({
        where: eq(addressTable.id, id)
    })
}

export const create_addressService = async (address: TI_address) => {
    await db.insert(addressTable).values(address)
    return "address created successfully";
}

export const update_addressService = async (id: number, address: TI_address) => {
    await db.update(addressTable).set(address).where(eq(addressTable.id, id))
    return "address updated successfully";
}

export const delete_addressService = async (id: number) => {
    await db.delete(addressTable).where(eq(addressTable.id, id))
    return "address deleted successfully";
}
