import {Context} from "hono"

    import {menu_itemService,get_menu_itemService,create_menu_itemService ,update_menu_itemService, delete_menu_itemService } from "./menu_item.service"

export const list_menu_item = async (c: Context) => {
    try {
        

        const limit = Number(c.req.query('limit'))

        const data = await menu_itemService(limit);
        if (data == null || data.length == 0) {
            return c.text("menu_item not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}
//menu_item
export const get_menu_item = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const menu_item = await get_menu_itemService(id);
    if (menu_item == undefined) {
        return c.text("menu_item not found", 404);
    }
    return c.json(menu_item, 200);
}
export const create_menu_item= async (c: Context) => {
    try {
        const menu_item = await c.req.json();
        const created_menu_item= await create_menu_itemService(menu_item);


        if (!created_menu_item) return c.text("menu_item not created", 404);
        return c.json({ msg: created_menu_item}, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const update_menu_item= async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const menu_item= await c.req.json();
    try {
        
        const searched_menu_item= await get_menu_itemService(id);
        if (searched_menu_item == undefined) return c.text("menu_item not found", 404);
        
        const res = await update_menu_itemService(id, menu_item);
        
        if (!res) return c.text("menu_item not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const delete_menu_item = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        
        const menu_item = await get_menu_itemService(id);
        if (menu_item == undefined) return c.text("menu_item not found", 404);
        
        const res = await delete_menu_itemService(id);
        if (!res) return c.text("state not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}