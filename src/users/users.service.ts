import db from "../drizzle/db";
import {eq}from "drizzle-orm";
import{TI_user,TS_user,usersTable} from "../drizzle/schema"
export const usersService = async (limit?: number): Promise<TS_user[] | null> => {
    if (limit) {
        return await db.query.usersTable.findMany({
            limit: limit
        });
    }
    return await db.query.usersTable.findMany();
}

export const get_usersService = async (id: number): Promise<TI_user| undefined> => {
    return await db.query.usersTable.findFirst({
        where: eq(usersTable.id, id)
    })
}

export const create_usersService = async (users: TI_user) => {
    await db.insert(usersTable).values(users)
    return "users created successfully";
}

export const update_usersService = async (id: number, users: TI_user) => {
    await db.update(usersTable).set(users).where(eq(usersTable.id, id))
    return "users updated successfully";
}

export const delete_usersService = async (id: number) => {
    await db.delete(usersTable).where(eq(usersTable.id, id))
    return "state deleted successfully";
}