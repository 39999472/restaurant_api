import {Context} from "hono"

    import {restaurantService,getRestaurantService , createRestaurantService,updateRestaurantService, deleteRestaurantService } from "./restaurant.service"

export const listRestaurant= async (c: Context) => {
    try {
        //limit the number of users to be returned

        const limit = Number(c.req.query('limit'))

        const data = await restaurantService(limit);
        if (data == null || data.length == 0) {
            return c.text("restaurant not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getRestaurant= async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const restaurant = await getRestaurantService(id);
    if (restaurant == undefined) {
        return c.text("restaurant not found", 404);
    }
    return c.json(restaurant, 200);
}
export const createRestaurant = async (c: Context) => {
    try {
        const restaurant = await c.req.json();
        const createdRestaurant= await createRestaurantService(restaurant);


        if (!createdRestaurant) return c.text("restaurant not created", 404);
        return c.json({ msg: createdRestaurant }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updateRestaurant= async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const restaurant= await c.req.json();
    try {
        
        const searched_restaurant = await getRestaurantService(id);
        if (searched_restaurant == undefined) return c.text("restaurant not found", 404);
        
        const res = await updateRestaurantService(id,restaurant);
        
        if (!res) return c.text("restaurant not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deleteRestaurant= async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        
        const restaurant = await getRestaurantService(id);
        if (restaurant == undefined) return c.text("restaurant not found", 404);
        
        const res = await deleteRestaurantService(id);
        if (!res) return c.text("restaurant not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}