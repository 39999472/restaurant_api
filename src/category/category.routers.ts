import {Hono} from 'hono';
import{zValidator} from "@hono/zod-validator"
import{listCategory,getCategory,createCategory,updateCategory,deleteCategory} from "./category.controller"
import { categoryZod } from '../validators';
import {userRoleAuth,adminRoleAuth, bothRoleAuth} from "../middleware/bearAuth"
export const categoryRouters=new Hono()




//
categoryRouters.get("/category",bothRoleAuth ,listCategory)

categoryRouters.post("/category",zValidator('json',categoryZod,(result,c)=>{
    if(!result.success){
        return c.json(result.error,400)
    }
}),adminRoleAuth,createCategory)

categoryRouters
.get("category/:id", bothRoleAuth, getCategory)
.put("category/:id", zValidator('json', categoryZod, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}),adminRoleAuth, updateCategory)
.delete("/category/:id",adminRoleAuth,deleteCategory)


