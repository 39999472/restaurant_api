import {Hono} from 'hono';
import{zValidator} from "@hono/zod-validator"
import{list_driver,get_driver,create_driver,update_driver} from "./driver.controller"
import { stateZod } from '../validators';
export const driverRouters=new Hono()




//get all state
driverRouters.get("/driver", list_driver)

//driver

//find one state

driverRouters.get("/driver/:id",get_driver)

//create a state
driverRouters.post("/driver",zValidator('json',stateZod,(result,c)=>{
    if(!result.success){
        return c.json(result.error,400)
    }
}),create_driver)
//update a state
driverRouters.put("/driver/:id",update_driver)