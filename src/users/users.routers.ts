import {Hono} from 'hono';
import{zValidator} from "@hono/zod-validator"
import{list_users,get_users,create_users,update_users,delete_users} from "./users.controller"
import { usersZod } from '../validators';
import{adminRoleAuth, bothRoleAuth, userRoleAuth} from "../middleware/bearAuth"
export const usersRouters=new Hono()





usersRouters.get("/users",bothRoleAuth,list_users)



usersRouters.post("/users",zValidator('json',usersZod,(result,c)=>{
    if(!result.success){
        return c.json(result.error,400)
    }
}),adminRoleAuth,create_users)
usersRouters.get("/users/:id",bothRoleAuth,get_users)
usersRouters.put("/users/:id",zValidator('json',usersZod,(result,c)=>{
    if(!result.success){
        return c.json(result.error,400)
    }
}),adminRoleAuth,update_users)

.delete("/users/:id",adminRoleAuth,delete_users)


