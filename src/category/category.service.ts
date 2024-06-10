import db from "../drizzle/db";
import {eq}from "drizzle-orm";
import{TI_category,TS_category,categoryTable} from "../drizzle/schema"
export const categoryService = async (limit?: number): Promise<TS_category[] | null> => {
    if (limit) {
        return await db.query.categoryTable.findMany({
            limit: limit
        });
    }
    return await db.query.categoryTable.findMany();
}

export const getCategoryService = async (id: number): Promise<TI_category| undefined> => {
    return await db.query.categoryTable.findFirst({
        where: eq(categoryTable.id, id)
    })
}

export const createCategoryService = async (category: TI_category) => {
    await db.insert(categoryTable).values(category)
    return "category created successfully";
}

export const updateCategoryService = async (id: number, category: TI_category) => {
    await db.update(categoryTable).set(category).where(eq(categoryTable.id, id))
    return "category updated successfully";
}

export const deleteCategoryService = async (id: number) => {
    await db.delete(categoryTable).where(eq(categoryTable.id, id))
    return "category deleted successfully";
}