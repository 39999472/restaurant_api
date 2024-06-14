import {Hono} from 'hono';
import{zValidator} from "@hono/zod-validator"
import{listRestaurant_owner,getRestaurant_owner,createRestaurant_owner,updateRestaurant_owner} from "./restaurant_owner.controller"
import { stateZod } from '../validators';
import { adminRoleAuth, userRoleAuth } from '../middleware/bearAuth';

export const restaurant_ownerRouters=new Hono()





restaurant_ownerRouters.get("/Restaurant_owner",adminRoleAuth,listRestaurant_owner)





restaurant_ownerRouters.get("/Restaurant_owner/:id",userRoleAuth,getRestaurant_owner)

restaurant_ownerRouters.post("/Restaurant_owner",zValidator('json',stateZod,(result,c)=>{
    if(!result.success){
        return c.json(result.error,400)
    }
}),createRestaurant_owner)

restaurant_ownerRouters.put("/restaurant_owner/:id",updateRestaurant_owner)


