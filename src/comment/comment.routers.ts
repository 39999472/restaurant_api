import {Hono} from 'hono';
import{zValidator} from "@hono/zod-validator"
import{list_comment,get_comment,create_comment,update_comment,delete_comment} from "./comment.controller"
import { commentsZod } from '../validators';
import {userRoleAuth,adminRoleAuth, bothRoleAuth} from "../middleware/bearAuth"

export const commentRouters=new Hono()





commentRouters.get("/comment",bothRoleAuth, list_comment)
.post("/comment",zValidator('json',commentsZod,(result,c)=>{
    if(!result.success){
        return c.json(result.error,400)
    }
}),adminRoleAuth,create_comment)

commentRouters
.get("/comment/:id",bothRoleAuth,get_comment)
.put("/comment/:id",zValidator('json',commentsZod,(result,c)=>{
    if(!result.success){
        return c.json(result.error,400)
    }
}),adminRoleAuth,update_comment)
.delete("/comment/:id",adminRoleAuth,delete_comment)


