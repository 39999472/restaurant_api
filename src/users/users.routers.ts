import {Hono} from 'hono';
import{zValidator} from "@hono/zod-validator"
import{list_users,get_users,create_users,update_users} from "./users.controller"
import { stateZod } from '../validators';
export const usersRouters=new Hono()




//get all state
usersRouters.get("/users", list_users)



//find one state

usersRouters.get("/users/:id",get_users)
//create a state
usersRouters.post("/users",zValidator('json',stateZod,(result,c)=>{
    if(!result.success){
        return c.json(result.error,400)
    }
}),create_users)
//update a state
usersRouters.put("/users/:id",update_users)