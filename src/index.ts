import{serve} from '@hono/node-server'
import { Hono } from 'hono'
import "dotenv/config"
import {timeout} from 'hono/timeout'
// import {logger} from 'hono/logger'
// import {csrf} from 'hono/csrf'
// import {trimTrailingSlash} from 'hono/trimTrailing-slash'
import {stateRouters} from "./state/state.routers"
import{cityRouters} from "./city/city.routers"
import { restaurantRouters } from './restaurant/restaurant.routers'
import { categoryRouters } from './category/category.routers'
import {order_menu_itemRouters} from "./order_menu_item/order_menu_item.routers"
import { menu_itemRouters } from './menu_item/menu_item.routers'
import { ordersRouters } from './orders/orders.routers'
import { addressRouters } from './address/address.routers'
import {commentRouters} from "./comment/comment.routers"
import { restaurant_ownerRouters } from './restaurant_owner/restaurant_owner.routers'
import { usersRouters } from './users/users.routers'
import { order_statusRouters } from './order_status/order_status.routers'
import{status_catalogRouters} from './status_catalog/status_catalog.routers'
import{authRouters} from './auth/auth.routers'
const app=new Hono().basePath('/api');


// app.use(logger())
// app.use(csrf())
// app.use(trimTrailingSlash())


app.get('/ok',(c)=>{
  return c.text('the server is running')
})


app.route("/",stateRouters)
app.route("/",cityRouters)
app.route("/",restaurantRouters)
app.route("/",categoryRouters)
app.route("/",order_menu_itemRouters)
app.route("/",menu_itemRouters)
app.route("/",ordersRouters)
app.route("/",addressRouters)
app.route("/",commentRouters)
app.route("/",restaurant_ownerRouters)
app.route("/",usersRouters)
app.route("/",order_statusRouters)
app.route("/",status_catalogRouters)
app.route("auth/",authRouters)

const port= 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port: Number(process.env.PORT)|| 3000
})