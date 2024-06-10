import {Hono} from 'hono';
import{zValidator} from "@hono/zod-validator"
import{list_status_catalog,get_status_catalog,create_status_catalog,update_status_catalog} from "./status_catalog.controller"
import { stateZod } from '../validators';
export const status_catalogRouters=new Hono()




//get all state
status_catalogRouters.get("/status_catalog", list_status_catalog)



//find one state
status_catalogRouters.get("/status_catalog/:id",get_status_catalog)
//create a state
status_catalogRouters.post("/status_catalog",zValidator('json',stateZod,(result,c)=>{
    if(!result.success){
        return c.json(result.error,400)
    }
}),create_status_catalog)
//update a state
status_catalogRouters.put("/status_catalog/:id",update_status_catalog)
