import {Hono} from 'hono';
import{zValidator} from "@hono/zod-validator"
import{list_orders,get_orders,create_orders,update_orders,delete_orders} from "./orders.controller"
import { ordersZod } from '../validators';
import { adminRoleAuth, bothRoleAuth, userRoleAuth } from '../middleware/bearAuth';
export const ordersRouters=new Hono()




//get all state
ordersRouters
.get("/orders",bothRoleAuth, list_orders)
.post("/orders",zValidator('json',ordersZod,(result,c)=>{
    if(!result.success){
        return c.json(result.error,400)
    }
}),adminRoleAuth,create_orders)

ordersRouters.get("/orders/:id",bothRoleAuth,get_orders)
.put("/orders/:id",zValidator('json',ordersZod,(result,c)=>{
    if(!result.success){
        return c.json(result.error,400)
    }
}),adminRoleAuth,update_orders)
.delete("/orders/:id",adminRoleAuth,delete_orders)



