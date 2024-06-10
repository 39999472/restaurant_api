import {Hono} from 'hono';
import{zValidator} from "@hono/zod-validator"
import{list_menu_item,get_menu_item,create_menu_item,update_menu_item} from "./menu_item.controller"
import { stateZod } from '../validators';
export const menu_itemRouters=new Hono()




//get all state
menu_itemRouters.get("/menu_item", list_menu_item)



//find one state

menu_itemRouters.get("/menu_item/:id",get_menu_item)
//create a state
menu_itemRouters.post("/menu_item",zValidator('json',stateZod,(result,c)=>{
    if(!result.success){
        return c.json(result.error,400)
    }
}),create_menu_item)
//update a state
menu_itemRouters.put("/state/:id",update_menu_item)
