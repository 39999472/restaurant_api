import {Hono} from 'hono';
import{zValidator} from "@hono/zod-validator"
import{listRestaurant,getRestaurant,createRestaurant,updateRestaurant,deleteRestaurant} from "./restaurant.controller"
import { restaurantZod } from '../validators';
import { adminRoleAuth, bothRoleAuth, userRoleAuth } from '../middleware/bearAuth';

export const restaurantRouters=new Hono()





restaurantRouters.get("/restaurant",bothRoleAuth,listRestaurant)


restaurantRouters.post("/restaurant",zValidator('json',restaurantZod,(result,c)=>{
    if(!result.success){
        return c.json(result.error,400)
    }
}),adminRoleAuth,createRestaurant)
restaurantRouters.get("/restaurant/:id",bothRoleAuth,getRestaurant)
restaurantRouters.put("/restaurant/:id",zValidator('json',restaurantZod,(result,c)=>{
    if(!result.success){
        return c.json(result.error,400)
    }
}),adminRoleAuth,updateRestaurant)

.delete("/restaurant/:id",adminRoleAuth,deleteRestaurant)