import {Hono} from 'hono';
import{zValidator} from "@hono/zod-validator"
import{list_driver,get_driver,create_driver,update_driver,delete_driver} from "./driver.controller"
import { driverZod } from '../validators';
import { adminRoleAuth,bothRoleAuth,userRoleAuth } from '../middleware/bearAuth';
export const driverRouters=new Hono()





driverRouters.get("/driver",bothRoleAuth ,list_driver)


driverRouters
.post("/driver",zValidator('json',driverZod,(result,c)=>{
    if(!result.success){
        return c.json(result.error,400)
    }
}),adminRoleAuth,create_driver)

driverRouters
.get("/driver/:id",bothRoleAuth,get_driver)
.put("/driver/:id",zValidator('json',driverZod,(result,c)=>{
    if(!result.success){
        return c.json(result.error,400)
    }
}),adminRoleAuth,update_driver)
.delete("/driver/:id",adminRoleAuth,delete_driver)




