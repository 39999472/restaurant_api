import {Hono} from 'hono';
import{zValidator} from "@hono/zod-validator"
import{list_users,get_users,create_users,update_users} from "./users.controller"
import { stateZod } from '../validators';
import{adminRoleAuth, userRoleAuth} from "../middleware/bearAuth"
export const usersRouters=new Hono()





usersRouters.get("/users",adminRoleAuth, list_users)

usersRouters.get("/users/:id",userRoleAuth,get_users)
//create a state
usersRouters.post("/users",zValidator('json',stateZod,(result,c)=>{
    if(!result.success){
        return c.json(result.error,400)
    }
}),create_users)

usersRouters.put("/users/:id",update_users)


