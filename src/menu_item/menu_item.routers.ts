import {Hono} from 'hono';
import{zValidator} from "@hono/zod-validator"
import{list_menu_item,get_menu_item,create_menu_item,update_menu_item} from "./menu_item.controller"
import { stateZod } from '../validators';
import { userRoleAuth,adminRoleAuth } from '../middleware/bearAuth';
export const menu_itemRouters=new Hono()





menu_itemRouters.get("/menu_item",adminRoleAuth, list_menu_item)





menu_itemRouters.get("/menu_item/:id",userRoleAuth, list_menu_item)

menu_itemRouters.post("/menu_item",zValidator('json',stateZod,(result,c)=>{
    if(!result.success){
        return c.json(result.error,400)
    }
}),create_menu_item)

menu_itemRouters.put("/menu_item/:id",update_menu_item)

