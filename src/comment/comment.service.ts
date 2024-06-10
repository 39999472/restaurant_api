import db from "../drizzle/db";
import {eq}from "drizzle-orm";
import{TI_comment,TS_comment,commentTable} from "../drizzle/schema"
export const commentService = async (limit?: number): Promise<TS_comment[] | null> => {
    if (limit) {
        return await db.query.commentTable.findMany({
            limit: limit
        });
    }
    return await db.query.commentTable.findMany();
}

export const get_commentService = async (id: number): Promise<TI_comment| undefined> => {
    return await db.query.commentTable.findFirst({
        where: eq(commentTable.id, id)
    })
}

export const create_commentService = async (comment: TI_comment) => {
    await db.insert(commentTable).values(comment)
    return "comment created successfully";
}

export const update_commentService = async (id: number, comment: TI_comment) => {
    await db.update(commentTable).set(comment).where(eq(commentTable.id, id))
    return "comment updated successfully";
}

export const delete_commentService = async (id: number) => {
    await db.delete(commentTable).where(eq(commentTable.id, id))
    return "comment deleted successfully";
}  
//comment      