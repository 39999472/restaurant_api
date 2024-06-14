import {Context} from "hono"

    import {status_catalogService,create_status_catalogService ,get_status_catalogService,update_status_catalogService, delete_status_catalogService } from "./status_catalog.service"

export const list_status_catalog= async (c: Context) => {
    try {
        

        const limit = Number(c.req.query('limit'))

        const data = await status_catalogService(limit);
        if (data == null || data.length == 0) {
            return c.text("status_category not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const get_status_catalog = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const status_catalog = await get_status_catalogService(id);
    if (status_catalog == undefined) {
        return c.text("status_catalog not found", 404);
    }
    return c.json(status_catalog, 200);
}
export const create_status_catalog = async (c: Context) => {
    try {
        const status_catalog = await c.req.json();
        const created_status_catalog= await create_status_catalogService(status_catalog);


        if (!created_status_catalog) return c.text("status_catalog not created", 404);
        return c.json({ msg: created_status_catalog }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const update_status_catalog= async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const status_catalog= await c.req.json();
    try {
        
        const searched_status_catalog= await get_status_catalogService(id);
        if (searched_status_catalog == undefined) return c.text("status_catalog not found", 404);
        
        const res = await update_status_catalogService(id, status_catalog);
        
        if (!res) return c.text("status_catalog not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const delete_status_catalog = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        
        const status_catalog = await get_status_catalogService(id);
        if (status_catalog == undefined) return c.text("status_catalog not found", 404);
        
        const res = await delete_status_catalogService(id);
        if (!res) return c.text("status_catalog not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

//status_category

