import {Context} from "hono"

    import {restaurant_ownerService,getRestaurant_ownerService,createRestaurant_ownerService ,updateRestaurant_ownerService, deleteRestaurant_ownerService } from "./restaurant_owner.service"

export const listRestaurant_owner= async (c: Context) => {
    try {
        //limit the number of users to be returned

        const limit = Number(c.req.query('limit'))

        const data = await restaurant_ownerService(limit);
        if (data == null || data.length == 0) {
            return c.text("owner not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getRestaurant_owner= async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const restaurant_owner= await getRestaurant_ownerService(id);
    if (restaurant_owner== undefined) {
        return c.text("restaurant_owner not found", 404);
    }
    return c.json(restaurant_owner, 200);
}
export const createRestaurant_owner = async (c: Context) => {
    try {
        const owner= await c.req.json();
        const createdRestaurant_owner= await createRestaurant_ownerService(owner);


        if (!createdRestaurant_owner) return c.text("restaurant_owner not created", 404);
        return c.json({ msg: createdRestaurant_owner}, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updateRestaurant_owner= async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const restaurant_owner= await c.req.json();
    try {
        // search for the user
        const searchedRestaurant_owner = await getRestaurant_ownerService(id);
        if (searchedRestaurant_owner == undefined) return c.text("Restaurant_owner not found", 404);
        // get the data and update it
        const res = await updateRestaurant_ownerService(id,restaurant_owner);
        // return a success message
        if (!res) return c.text("restaurant_owner not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deleteRestaurant_owner= async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        //search for the user
        const restaurant_owner = await getRestaurant_ownerService(id);
        if (restaurant_owner== undefined) return c.text("restaurant owner not found", 404);
        //deleting the user
        const res = await deleteRestaurant_ownerService(id);
        if (!res) return c.text("restaurant_owner not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}
//owner