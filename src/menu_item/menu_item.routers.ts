import {Hono} from 'hono';
import{zValidator} from "@hono/zod-validator"
import{list_menu_item,get_menu_item,create_menu_item,update_menu_item,delete_menu_item} from "./menu_item.controller"
import { menu_itemsZod } from '../validators';
import { userRoleAuth,adminRoleAuth, bothRoleAuth } from '../middleware/bearAuth';
export const menu_itemRouters=new Hono()





menu_itemRouters
.get("/menu_item",bothRoleAuth, list_menu_item)
.post("/menu_item",zValidator('json',menu_itemsZod,(result,c)=>{
    if(!result.success){
        return c.json(result.error,400)
    }
}),adminRoleAuth,create_menu_item)
.get("/menu_item/:id",bothRoleAuth,get_menu_item)
.put("/menu_item",zValidator('json',menu_itemsZod,(result,c)=>{
    if(!result.success){
        return c.json(result.error,400)
    }
}),adminRoleAuth,update_menu_item)
.delete("/menu_item/:id",adminRoleAuth,delete_menu_item)


