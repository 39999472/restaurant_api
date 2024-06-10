import {Hono} from 'hono';
import{zValidator} from "@hono/zod-validator"
import{list_order_menu_item,get_order_menu_item,create_order_menu_item,update_order_menu_item} from "./order_menu_item.controller"
import { stateZod } from '../validators';

export const order_menu_itemRouters=new Hono()




//get all state
order_menu_itemRouters.get("/order_menu_item", list_order_menu_item)



//find one state

order_menu_itemRouters.get("/order_menu_item/:id",get_order_menu_item)
//create a state
order_menu_itemRouters.post("/order_menu_item",zValidator('json',stateZod,(result,c)=>{
    if(!result.success){
        return c.json(result.error,400)
    }
}),create_order_menu_item)
//update a state
order_menu_itemRouters.put("/order_menu_item/:id",update_order_menu_item)
