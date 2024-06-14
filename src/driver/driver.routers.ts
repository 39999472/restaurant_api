import {Hono} from 'hono';
import{zValidator} from "@hono/zod-validator"
import{list_driver,get_driver,create_driver,update_driver} from "./driver.controller"
import { stateZod } from '../validators';
import { adminRoleAuth,userRoleAuth } from '../middleware/bearAuth';
export const driverRouters=new Hono()





driverRouters.get("/driver",adminRoleAuth ,list_driver)





driverRouters.get("/driver/:id",userRoleAuth,get_driver)


driverRouters.post("/driver",zValidator('json',stateZod,(result,c)=>{
    if(!result.success){
        return c.json(result.error,400)
    }
}),create_driver)

driverRouters.put("/driver/:id",update_driver)



