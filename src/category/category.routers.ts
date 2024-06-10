import {Hono} from 'hono';
import{zValidator} from "@hono/zod-validator"
import{listCategory,getCategory,createCategory,updateCategory} from "./category.controller"
import { stateZod } from '../validators';
export const categoryRouters=new Hono()




//get all state
categoryRouters.get("/category", listCategory)



//find one state

categoryRouters.get("/category/:id",getCategory)
//create a state
categoryRouters.post("/category",zValidator('json',stateZod,(result,c)=>{
    if(!result.success){
        return c.json(result.error,400)
    }
}),createCategory)
//update a state
categoryRouters.put("/category/:id",updateCategory)
