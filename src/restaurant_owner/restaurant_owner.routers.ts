import {Hono} from 'hono';
import{zValidator} from "@hono/zod-validator"
import{listRestaurant_owner,getRestaurant_owner,createRestaurant_owner,updateRestaurant_owner,deleteRestaurant_owner} from "./restaurant_owner.controller"
import { restaurant_ownerZod } from '../validators';
import { adminRoleAuth, bothRoleAuth, userRoleAuth } from '../middleware/bearAuth';

export const restaurant_ownerRouters=new Hono()





restaurant_ownerRouters.get("/Restaurant_owner",bothRoleAuth,listRestaurant_owner)

restaurant_ownerRouters.post("/Restaurant_owner",zValidator('json',restaurant_ownerZod,(result,c)=>{
    if(!result.success){
        return c.json(result.error,400)
    }
}),adminRoleAuth,createRestaurant_owner)



restaurant_ownerRouters.get("/Restaurant_owner/:id",bothRoleAuth,getRestaurant_owner)
restaurant_ownerRouters.put("/Restaurant_owner/:id",zValidator('json',restaurant_ownerZod,(result,c)=>{
    if(!result.success){
        return c.json(result.error,400)
    }
}),adminRoleAuth,updateRestaurant_owner)
.delete("/restaurant_owner/:id",adminRoleAuth,deleteRestaurant_owner)


