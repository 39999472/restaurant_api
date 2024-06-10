import {Context} from "hono"

    import {commentService,get_commentService,create_commentService ,update_commentService, delete_commentService } from "./comment.service"

export const list_comment = async (c: Context) => {
    try {
        //limit the number of users to be returned

        const limit = Number(c.req.query('limit'))

        const data = await commentService(limit);
        if (data == null || data.length == 0) {
            return c.text("comment not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const get_comment= async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const comment = await get_commentService(id);
    
    if (comment == undefined) {
        return c.text("comment not found", 404);
    }
    return c.json(comment, 200);
}
export const create_comment= async (c: Context) => {
    try {
        const comment = await c.req.json();
        const created_comment= await create_commentService(comment);


        if (!created_comment) return c.text("comment not created", 404);
        return c.json({ msg: created_comment}, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const update_comment= async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const comment= await c.req.json();
    try {
        // search for the user
        const searched_comment= await get_commentService(id);
        if (searched_comment== undefined) return c.text("comment not found", 404);
        // get the data and update it
        const res = await update_commentService(id, comment);
        // return a success message
        if (!res) return c.text("comment not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const delete_comment = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        //search for the user
        const comment = await get_commentService(id);
        if (comment == undefined) return c.text("comment not found", 404);
    
        //deleting the user
        const res = await delete_commentService(id);
        if (!res) return c.text("city not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}
//comment