import {Hono} from 'hono';
import{zValidator} from "@hono/zod-validator"
import{list_address,get_address,create_address,update_address,delete_address} from "./address.controller"
import { addressZod } from '../validators';
import { userRoleAuth,adminRoleAuth, bothRoleAuth } from '../middleware/bearAuth';

export const addressRouters=new Hono()





addressRouters
.get("/address",bothRoleAuth,list_address)
.post("/address", zValidator('json', addressZod, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), adminRoleAuth, create_address)
//



addressRouters
.get("/address/:id" ,bothRoleAuth,get_address)
.put("/address/:id",zValidator('json',addressZod,(result,c)=>{
    if(!result.success){
        return c.json(result.error,400)
    }
}),adminRoleAuth, update_address)

addressRouters.delete("/address/:id",adminRoleAuth,delete_address)




