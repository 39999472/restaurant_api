import {Hono} from 'hono';
import{zValidator} from "@hono/zod-validator"
import{listRestaurant,getRestaurant,createRestaurant,updateRestaurant} from "./restaurant.controller"
import { stateZod } from '../validators';
import { adminRoleAuth, userRoleAuth } from '../middleware/bearAuth';

export const restaurantRouters=new Hono()





restaurantRouters.get("/restaurant", adminRoleAuth,listRestaurant)
restaurantRouters.get("/restaurant/:id",userRoleAuth ,getRestaurant)

restaurantRouters.post("/restaurant",zValidator('json',stateZod,(result,c)=>{
    if(!result.success){
        return c.json(result.error,400)
    }
}),createRestaurant)

restaurantRouters.put("/restaurant/:id",updateRestaurant)

