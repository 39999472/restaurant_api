import { zValidator } from "@hono/zod-validator";
import { Hono } from 'hono';
import { status_catalogZod } from '../validators';
import { create_status_catalog, get_status_catalog, list_status_catalog, update_status_catalog,delete_status_catalog } from "./status_catalog.controller";
import { adminRoleAuth ,bothRoleAuth,userRoleAuth} from "../middleware/bearAuth";
export const status_catalogRouters=new Hono()





status_catalogRouters.get("/status_catalog",bothRoleAuth, list_status_catalog)





status_catalogRouters.post("/status_catalog",zValidator('json',status_catalogZod,(result,c)=>{
    if(!result.success){
        return c.json(result.error,400)
    }
}),adminRoleAuth,create_status_catalog)

status_catalogRouters.get("/status_catalog/:id",bothRoleAuth,get_status_catalog)

status_catalogRouters.post("/status_catalog/:id",zValidator('json',status_catalogZod,(result,c)=>{
    if(!result.success){
        return c.json(result.error,400)
    }
}),adminRoleAuth,update_status_catalog)

.delete("/status_catalog/:id",adminRoleAuth,delete_status_catalog)