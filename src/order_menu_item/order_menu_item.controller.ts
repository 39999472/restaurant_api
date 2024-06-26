import {Context} from "hono"

    import {order_menu_itemService,get_order_menu_itemService,create_order_menu_itemService ,update_order_menu_itemService, delete_order_menu_itemService } from "./order_menu_item.service"

export const list_order_menu_item = async (c: Context) => {
    try {
        

        const limit = Number(c.req.query('limit'))

        const data = await order_menu_itemService(limit);
        if (data == null || data.length == 0) {
            return c.text("order_menu_item not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const get_order_menu_item = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const order_menu_item = await get_order_menu_itemService(id);
    if (order_menu_item == undefined) {
        return c.text("order_menu_item not found", 404);
    }
    return c.json(order_menu_item, 200);
}
export const create_order_menu_item = async (c: Context) => {
    try {
        const order_menu_item = await c.req.json();
        const created_order_menu_item= await create_order_menu_itemService(order_menu_item)


        if (!created_order_menu_item) return c.text("order_menu_item not created", 404);
        return c.json({ msg: created_order_menu_item }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const update_order_menu_item= async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const order_menu_item= await c.req.json();
    try {
        
        const searched_order_menu_item = await get_order_menu_itemService(id);
        if (searched_order_menu_item == undefined) return c.text("order_menu_item not found", 404);
        
        const res = await update_order_menu_itemService(id, order_menu_item);
        // return a success message
        if (!res) return c.text("order_menu_item not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const delete_order_menu_item = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        
        const order_menu_item = await get_order_menu_itemService(id);
        if (order_menu_item == undefined) return c.text("order_menu_item not found", 404);
        
        const res = await delete_order_menu_itemService(id);
        if (!res) return c.text("order_menu_item not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}