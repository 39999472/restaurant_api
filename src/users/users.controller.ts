import {Context} from "hono"

    import {usersService,get_usersService,create_usersService ,update_usersService, delete_usersService } from "./users.service"

export const list_users = async (c: Context) => {
    try {
        

        const limit = Number(c.req.query('limit'))

        const data = await usersService(limit);
        if (data == null || data.length == 0) {
            return c.text("users not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const get_users = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const users = await get_usersService(id);
    if (users == undefined) {
        return c.text("users not found", 404);
    }
    return c.json(users, 200);
}
export const create_users = async (c: Context) => {
    try {
        const users = await c.req.json();
    
        const created_users= await create_usersService(users);


        if (!created_users) return c.text("users not created", 404);
        return c.json({ msg: created_users }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const update_users= async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const users= await c.req.json();
    try {
        
        const searched_users = await get_usersService(id);
        if (searched_users == undefined) return c.text("users not found", 404);
        
        const res = await update_usersService(id, users);
    
        if (!res) return c.text("users not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const delete_users = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {

        const users = await get_usersService(id);
        if (users == undefined) return c.text("users not found", 404);
        
        const res = await delete_usersService(id);
        if (!res) return c.text("users not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}
//users