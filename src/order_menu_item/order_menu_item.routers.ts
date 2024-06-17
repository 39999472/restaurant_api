import {Hono} from 'hono';
import{zValidator} from "@hono/zod-validator"
import{list_order_menu_item,get_order_menu_item,create_order_menu_item,update_order_menu_item,delete_order_menu_item} from "./order_menu_item.controller"
import { order_menu_itemsZod } from '../validators';
import { adminRoleAuth, bothRoleAuth, userRoleAuth } from '../middleware/bearAuth';

export const order_menu_itemRouters=new Hono()





order_menu_itemRouters.get("/order_menu_item",bothRoleAuth,list_order_menu_item)

order_menu_itemRouters.post("/order_menu_item",zValidator('json',order_menu_itemsZod,(result,c)=>{
    if(!result.success){
        return c.json(result.error,400)
    }
}),adminRoleAuth,create_order_menu_item)

order_menu_itemRouters.get("/order_menu_item/:id",bothRoleAuth,get_order_menu_item)
order_menu_itemRouters.put("/order_menu_item/:id",zValidator('json',order_menu_itemsZod,(result,c)=>{
    if(!result.success){
        return c.json(result.error,400)
    }
}),adminRoleAuth,update_order_menu_item)
.delete("/order_menu_item",adminRoleAuth,delete_order_menu_item)