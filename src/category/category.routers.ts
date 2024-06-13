import {Hono} from 'hono';
import{zValidator} from "@hono/zod-validator"
import{listCategory,getCategory,createCategory,updateCategory} from "./category.controller"
import { stateZod } from '../validators';
import {userRoleAuth,adminRoleAuth} from "../middleware/bearAuth"
export const categoryRouters=new Hono()




//get all state
categoryRouters.get("/category",adminRoleAuth ,listCategory)



//find one state

categoryRouters.get("/category/:id",userRoleAuth,getCategory)
//create a state
categoryRouters.post("/category",zValidator('json',stateZod,(result,c)=>{
    if(!result.success){
        return c.json(result.error,400)
    }
}),createCategory)
//update a state
categoryRouters.put("/category/:id",updateCategory)


