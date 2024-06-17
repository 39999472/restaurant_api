import {Hono} from 'hono';
import{zValidator} from "@hono/zod-validator"
import{list_order_status,get_order_status,create_order_status,update_order_status,delete_order_status} from "./order_status.controller"
import { order_statusZod } from '../validators';
import { adminRoleAuth,bothRoleAuth,userRoleAuth } from '../middleware/bearAuth';
export const order_statusRouters=new Hono()




//get 
order_statusRouters.get("/order_status",bothRoleAuth, list_order_status)

order_statusRouters.post("/order_status",zValidator('json',order_statusZod,(result,c)=>{
    if(!result.success){
        return c.json(result.error,400)
    }
}),adminRoleAuth,create_order_status)

order_statusRouters
.get("/order_status/:id",bothRoleAuth,get_order_status)
.put("/order_status/:id",zValidator('json',order_statusZod,(result,c)=>{
    if(!result.success){
        return c.json(result.error,400)
    }
}),adminRoleAuth,update_order_status)
.delete("/order_status/:id",adminRoleAuth,delete_order_status)
