import {Hono} from 'hono';
import{zValidator} from "@hono/zod-validator"
import{listCity,getCity,createCity,updateCity,deleteCity} from "./city.contoroller"
import { cityZod } from '../validators';
import { userRoleAuth,adminRoleAuth, bothRoleAuth } from '../middleware/bearAuth';
export const cityRouters=new Hono()




//get all cities
cityRouters
.get("/city",bothRoleAuth, listCity)

.post("/city", zValidator('json', cityZod, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), adminRoleAuth, createCity)

cityRouters
.get("/city/:id",bothRoleAuth,getCity)
.put("city/:id", zValidator('json', cityZod, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}),adminRoleAuth, updateCity)


.delete("/city/:id",adminRoleAuth,deleteCity)
