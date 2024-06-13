import {Hono} from 'hono';
import{zValidator} from "@hono/zod-validator"
import{list_order_status,get_order_status,create_order_status,update_order_status} from "./order_status.controller"
import { stateZod } from '../validators';
import { adminRoleAuth,userRoleAuth } from '../middleware/bearAuth';
export const order_statusRouters=new Hono()




//get 
order_statusRouters.get("/order_status",adminRoleAuth, list_order_status)



//find one state

order_statusRouters.get("/order_status/:id",userRoleAuth, get_order_status)
//create a state
order_statusRouters.post("/order_status",zValidator('json',stateZod,(result,c)=>{
    if(!result.success){
        return c.json(result.error,400)
    }
}),create_order_status)
//update a state
order_statusRouters.put("/orders/:id",update_order_status)


