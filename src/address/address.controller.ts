import {Context} from "hono"

    import {addressService,get_addressService,create_addressService ,update_addressService, delete_addressService } from "./address.service"

export const list_address = async (c: Context) => {
    try {
        //limit the number of users to be returned

        const limit = Number(c.req.query('limit'))

        const data = await addressService(limit);
        if (data == null || data.length == 0) {
            return c.text("address not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const get_address = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const address= await get_addressService(id);
    if (address == undefined) {
        return c.text("address not found", 404);
    }
    return c.json(address, 200);
}
export const create_address = async (c: Context) => {
    try {
        const address = await c.req.json();
        const created_address= await create_addressService(address);


        if (!created_address) return c.text("address not created", 404);
        return c.json({ msg: created_address }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const update_address= async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const address= await c.req.json();
    try {
        // search for the user
        const searched_address = await get_addressService(id);
        if (searched_address == undefined) return c.text("address not found", 404);
        // get the data and update it
        const res = await update_addressService(id, address);
        // return a success message
        if (!res) return c.text("address not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const delete_address = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        //search for the user
        const address= await get_addressService(id);
        if (address == undefined) return c.text("address not found", 404);
        //deleting the user
        const res = await delete_addressService(id);
        if (!res) return c.text("address not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}