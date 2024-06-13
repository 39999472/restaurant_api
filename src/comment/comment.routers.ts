import {Hono} from 'hono';
import{zValidator} from "@hono/zod-validator"
import{list_comment,get_comment,create_comment,update_comment} from "./comment.controller"
import { stateZod } from '../validators';
import {userRoleAuth,adminRoleAuth} from "../middleware/bearAuth"

export const commentRouters=new Hono()




//get all state
commentRouters.get("/comment",adminRoleAuth, list_comment)



//find one state

commentRouters.get("/comment/:id",userRoleAuth,get_comment)
//create a state
commentRouters.post("/comment",zValidator('json',stateZod,(result,c)=>{
    if(!result.success){
        return c.json(result.error,400)
    }
}),create_comment)
//update a state
commentRouters.put("/comment/:id",update_comment)


