import {Hono} from 'hono';
import{zValidator} from "@hono/zod-validator"
import{listCity,getCity,createCity,updateCity} from "./city.contoroller"
import { stateZod } from '../validators';
import { userRoleAuth,adminRoleAuth } from '../middleware/bearAuth';
export const cityRouters=new Hono()




//get all state
cityRouters.get("/city",adminRoleAuth, listCity)



//find one state

cityRouters.get("/city/:id",userRoleAuth,getCity)
//create a state
cityRouters.post("/city",zValidator('json',stateZod,(result,c)=>{
    if(!result.success){
        return c.json(result.error,400)
    }
}),createCity)
//update a state
cityRouters.put("/city/:id",updateCity)


