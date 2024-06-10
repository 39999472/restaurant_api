import {Hono} from 'hono';
import{zValidator} from "@hono/zod-validator"
import{list_address,get_address,create_address,update_address} from "./address.controller"
import { stateZod } from '../validators';

export const addressRouters=new Hono()




//get all stateress", list_address)
addressRouters.get("/address",list_address)
//

//find one state

addressRouters.get("/address/:id",get_address)
//create a state
addressRouters.post("/address",zValidator('json',stateZod,(result,c)=>{
    if(!result.success){
        return c.json(result.error,400)
    }
}),create_address)
//update a state
addressRouters.put("/address/:id",update_address)
