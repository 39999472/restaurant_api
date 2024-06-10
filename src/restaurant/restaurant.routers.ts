import {Hono} from 'hono';
import{zValidator} from "@hono/zod-validator"
import{listRestaurant,getRestaurant,createRestaurant,updateRestaurant} from "./restaurant.controller"
import { stateZod } from '../validators';

export const restaurantRouters=new Hono()




//get all state
restaurantRouters.get("/restaurant", listRestaurant)



//find one state

restaurantRouters.get("/restaurant/:id",getRestaurant)
//create a state
restaurantRouters.post("/restaurant",zValidator('json',stateZod,(result,c)=>{
    if(!result.success){
        return c.json(result.error,400)
    }
}),createRestaurant)
//update a state
restaurantRouters.put("/restaurant/:id",updateRestaurant)