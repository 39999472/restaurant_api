import {Context} from "hono"

    import {driverService,get_driverService,create_driverService ,update_driverService, delete_driverService } from "./driver.service"

export const list_driver= async (c: Context) => {
    try {
        //limit the number of users to be returned

        const limit = Number(c.req.query('limit'))

        const data = await driverService(limit);
        if (data == null || data.length == 0) {
            return c.text("city not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const get_driver= async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const driver = await get_driverService(id);
    if (driver == undefined) {
        return c.text("driver not found", 404);
    }
    return c.json(driver, 200);
}
export const create_driver= async (c: Context) => {
    try {
        const driver = await c.req.json();
        const created_driver= await create_driverService(driver);


        if (!created_driver) return c.text("driver not created", 404);
        return c.json({ msg: created_driver}, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const update_driver= async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const driver= await c.req.json();
    try {
        // search for the user
        const searched_driver= await get_driverService(id);
        if (searched_driver== undefined) return c.text("driver not found", 404);
        // get the data and update it
        const res = await update_driverService(id, driver);
        // return a success message
        if (!res) return c.text("driver not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const delete_driver = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        //search for the user
        const driver = await get_driverService(id);
        if (driver == undefined) return c.text("driver not found", 404);
        //deleting the user
        const res = await delete_driverService(id);
        if (!res) return c.text("driver not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}
//driver