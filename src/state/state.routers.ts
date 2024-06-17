import {Hono} from 'hono';
import{zValidator} from "@hono/zod-validator"
import{listState,getState,createState,updateState,deleteState} from "./state.controller"
import { stateZod } from '../validators';
import { adminRoleAuth, bothRoleAuth, userRoleAuth } from '../middleware/bearAuth';
export const stateRouters=new Hono()





stateRouters.get("/state",bothRoleAuth,listState)
//create a state
stateRouters.post("/state",zValidator('json',stateZod,(result,c)=>{
    if(!result.success){
        return c.json(result.error,400)
    }
}),adminRoleAuth,createState)
stateRouters.get("/state/:id",bothRoleAuth,getState)

stateRouters.put("/state/:id",zValidator('json',stateZod,(result,c)=>{
    if(!result.success){
        return c.json(result.error,400)
    }
}),adminRoleAuth,updateState)

stateRouters.delete("/state/:id",adminRoleAuth,deleteState)




