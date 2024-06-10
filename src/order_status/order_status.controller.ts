import {Context} from "hono"

    import {order_statusService,get_order_statusService,create_order_statusService ,update_order_statusService, delete_order_statusService } from "./order_status.service"

export const list_order_status = async (c: Context) => {
    try {
        //limit the number of users to be returned

        const limit = Number(c.req.query('limit'))

        const data = await order_statusService(limit);
        if (data == null || data.length == 0) {
            return c.text("order_status not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}
//order_status

export const get_order_status= async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const order_status = await get_order_statusService(id);
    if (order_status == undefined) {
        return c.text("order_status not found", 404);
    }
    return c.json(order_status, 200);
}
export const create_order_status = async (c: Context) => {
    try {
        const order_status = await c.req.json();
        const created_order_status= await create_order_statusService(order_status);


        if (!created_order_status) return c.text("order_status not created", 404);
        return c.json({ msg: created_order_status }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const update_order_status= async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const order_status= await c.req.json();
    try {
        // search for the user
        const searched_order_status= await get_order_statusService(id);
        if (searched_order_status== undefined) return c.text("order_status not found", 404);
        // get the data and update it
        const res = await update_order_statusService(id, order_status);
        // return a success message
        if (!res) return c.text("order_status not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const delete_order_status= async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        //search for the user
        const order_status= await get_order_statusService(id);
        if (order_status == undefined) return c.text("order_status not found", 404);
        //deleting the user
        const res = await delete_order_statusService(id);
        if (!res) return c.text("order_status not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}