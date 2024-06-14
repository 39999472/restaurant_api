import {Hono} from 'hono';
import{zValidator} from "@hono/zod-validator"
import{list_orders,get_orders,create_orders,update_orders} from "./orders.controller"
import { stateZod } from '../validators';
import { adminRoleAuth, userRoleAuth } from '../middleware/bearAuth';
export const ordersRouters=new Hono()




//get all state
ordersRouters.get("/orders",adminRoleAuth, list_orders)





ordersRouters.get("/orders/:id",userRoleAuth,get_orders)

ordersRouters.post("/orders",zValidator('json',stateZod,(result,c)=>{
    if(!result.success){
        return c.json(result.error,400)
    }
}),create_orders)

ordersRouters.put("/orders/:id",update_orders)



