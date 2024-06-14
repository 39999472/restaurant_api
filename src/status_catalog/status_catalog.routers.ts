import { zValidator } from "@hono/zod-validator";
import { Hono } from 'hono';
import { stateZod } from '../validators';
import { create_status_catalog, get_status_catalog, list_status_catalog, update_status_catalog } from "./status_catalog.controller";
import { adminRoleAuth ,userRoleAuth} from "../middleware/bearAuth";
export const status_catalogRouters=new Hono()





status_catalogRouters.get("/status_catalog",adminRoleAuth, list_status_catalog)




status_catalogRouters.get("/status_catalog/:id",userRoleAuth,get_status_catalog)

status_catalogRouters.post("/status_catalog",zValidator('json',stateZod,(result,c)=>{
    if(!result.success){
        return c.json(result.error,400)
    }
}),create_status_catalog)

status_catalogRouters.put("/status_catalog/:id",update_status_catalog)

