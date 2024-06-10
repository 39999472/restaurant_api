import {Hono} from 'hono';
import{zValidator} from "@hono/zod-validator"
import{listRestaurant_owner,getRestaurant_owner,createRestaurant_owner,updateRestaurant_owner} from "./restaurant_owner.controller"
import { stateZod } from '../validators';

export const restaurant_ownerRouters=new Hono()




//get all state
restaurant_ownerRouters.get("/Restaurant_owner", listRestaurant_owner)



//find one state

restaurant_ownerRouters.get("/Restaurant_owner/:id",getRestaurant_owner)
//create a state
restaurant_ownerRouters.post("/Restaurant_owner",zValidator('json',stateZod,(result,c)=>{
    if(!result.success){
        return c.json(result.error,400)
    }
}),createRestaurant_owner)
//update a state
restaurant_ownerRouters.put("/restaurant_owner/:id",updateRestaurant_owner)
//restaurant_owner