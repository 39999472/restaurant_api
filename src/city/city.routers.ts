import {Hono} from 'hono';
import{zValidator} from "@hono/zod-validator"
import{listCity,getCity,createCity,updateCity} from "./city.contoroller"
import { stateZod } from '../validators';
export const cityRouters=new Hono()




//get all state
cityRouters.get("/city", listCity)



//find one state

cityRouters.get("/city/:id",getCity)
//create a state
cityRouters.post("/city",zValidator('json',stateZod,(result,c)=>{
    if(!result.success){
        return c.json(result.error,400)
    }
}),createCity)
//update a state
cityRouters.put("/city/:id",updateCity)
