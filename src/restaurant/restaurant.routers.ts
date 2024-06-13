import {Hono} from 'hono';
import{zValidator} from "@hono/zod-validator"
import{listRestaurant,getRestaurant,createRestaurant,updateRestaurant} from "./restaurant.controller"
import { stateZod } from '../validators';
import { adminRoleAuth, userRoleAuth } from '../middleware/bearAuth';

export const restaurantRouters=new Hono()




//get all state
restaurantRouters.get("/restaurant",adminRoleAuth, listRestaurant)
restaurantRouters.get("/restaurant/:id",userRoleAuth ,getRestaurant)


//find one state_rstaurant)
//create a state
restaurantRouters.post("/restaurant",zValidator('json',stateZod,(result,c)=>{
    if(!result.success){
        return c.json(result.error,400)
    }
}),createRestaurant)
//update a state
restaurantRouters.put("/restaurant/:id",updateRestaurant)

