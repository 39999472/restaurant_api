import {Hono} from 'hono';
import{zValidator} from "@hono/zod-validator"
import{list_orders,get_orders,create_orders,update_orders} from "./orders.controller"
import { stateZod } from '../validators';
export const ordersRouters=new Hono()




//get all state
ordersRouters.get("/orders", list_orders)



//find one state

ordersRouters.get("/orders/:id",get_orders)
//create a state
ordersRouters.post("/orders",zValidator('json',stateZod,(result,c)=>{
    if(!result.success){
        return c.json(result.error,400)
    }
}),create_orders)
//update a state
ordersRouters.put("/orders/:id",update_orders)

