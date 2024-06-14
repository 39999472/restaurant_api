import {Hono} from 'hono';
import{zValidator} from "@hono/zod-validator"
import{listState,getState,createState,updateState} from "./state.controller"
import { stateZod } from '../validators';
import { adminRoleAuth, userRoleAuth } from '../middleware/bearAuth';
export const stateRouters=new Hono()





stateRouters.get("/state",adminRoleAuth,listState)





stateRouters.get("/state/:id",userRoleAuth,getState)
//create a state
stateRouters.post("/state",zValidator('json',stateZod,(result,c)=>{
    if(!result.success){
        return c.json(result.error,400)
    }
}),createState)

stateRouters.put("/state/:id",updateState)




