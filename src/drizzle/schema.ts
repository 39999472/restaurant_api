import{relations} from "drizzle-orm";
import { boolean } from "drizzle-orm/pg-core";
import {pgTable,serial,text,varchar,integer,timestamp,} from "drizzle-orm/pg-core";
export const cityTable=pgTable("city",{
    id:serial("id").primaryKey(),
    name:varchar("name").notNull(),
   //  state_id:integer("state_id").notNull(),
    address:varchar("address",{length:100}).notNull(),
    state:text("state").notNull(),
    restaurant:text("restaurant").notNull(),
    state_id:integer("state_id").notNull().references(()=>stateTable.id,{onDelete:"cascade"})
})
 export const  stateTable=pgTable("state",{
    id:serial("id").primaryKey(),
    name:varchar("name").notNull(),
    code:text("code").notNull(),
    city:text("city").notNull(),
    
 });

 export const restaurantTable=pgTable("restaurant",{
    id:serial("id").primaryKey(),
    name:varchar("name").notNull(),
    street_address:varchar("street_address").notNull(),
    zip_code:text("zip_code").notNull(),
    city_id:integer("city_id").notNull().references(()=>cityTable.id,{onDelete:"cascade"}),
    created_at:timestamp("created_at").notNull(),
    updated_at:timestamp("updated_at").notNull(),
    menu_item:varchar("menu_item").notNull(),
    orders:varchar("orders").notNull(),
    city:varchar("city").notNull(),
    restaurant_owner:varchar("restaurant_owner").notNull(),
 });

 export const addressTable=pgTable("address",{
    id:serial("id").primaryKey(),
    street_address_1:varchar("street_address_1").notNull(),
    street_address_2:varchar("street_address_2").notNull(),
    zip_code:varchar("zip_code").notNull(),
    delivery_instructions:varchar("delivery_instructions").notNull(),
    user_id:integer("user_id").notNull().references(()=>usersTable.id,{onDelete:"cascade"}),
    city_id:integer("city_id").notNull().references(()=>cityTable.id,{onDelete:"cascade"}),
    created_at:timestamp("created_at").notNull(),
    updated_at:timestamp("updated_at").notNull(),
    city:varchar("city").notNull(),
    users:varchar("users").notNull(),
    orders:varchar("orders").notNull(),

 });

 export const restaurant_ownerTable=pgTable("restaurant_owner",{
    id:serial("restaurant_id").notNull(),
    restaurant_id:integer("restaurant_id").notNull().references(()=>restaurantTable.id,{onDelete:"cascade"}),
    owner_id:integer("ower_id").notNull().references(()=>usersTable.id,{onDelete:"cascade"}),
    users:varchar("users").notNull(),
    restaurant:varchar("restaurant").notNull(),
 });

 export const usersTable=pgTable("users",{
    id:serial("id").primaryKey(),
    name:varchar("name").notNull(),
    contact_phone:varchar("contact_phone").notNull(),
    email:varchar("email").notNull(),
    email_verified:boolean("email_verified").default(false),
    confirmation_code:varchar("confirmation_code").notNull(),
    password:varchar("password").notNull(),
    created_at:timestamp("created_at").notNull(),
    updated_at:timestamp("updated_at").notNull(),
    address:varchar("address").notNull(),
    comment:varchar("comment").notNull(),
    driver:varchar("driver").notNull(),
    orders:varchar("orders").notNull(),
    restaurant_owner:varchar("restaurant_owner").notNull(),

 });

 export const driverTable=pgTable("driver",{
    id:serial("id").primaryKey(),
    car_make:varchar("car_make").notNull(),
    car_model:varchar("car_model").notNull(),
    car_year:integer("car_year").notNull(),
    user_id:integer("user_id").notNull().references(()=>usersTable.id,{onDelete:"cascade"}),
    online:boolean("online").notNull(),
    delivering:boolean("delivering").notNull(),
    created_at:timestamp("created_at").defaultNow(),
    updated_at:timestamp("updated_at").defaultNow(),
    users:varchar("users").notNull(),
    orders:varchar("orders").notNull(),
    



 });

 export const commentTable=pgTable("comment",{
    id:serial("id").primaryKey().notNull(),
    order_id:integer("order_id").notNull().references(()=>ordersTable.id,{onDelete:"cascade"}),
    user_id:integer("user_id").notNull().references(()=>usersTable.id,{onDelete:"cascade"}),
    comment_text:varchar("comment_text").notNull(),
    is_complant:boolean("is_complant").notNull(),
    is_praise:boolean("is_praise").notNull(),
    created_at:timestamp("created_at").notNull(),
    updated_at:timestamp("updated_at").notNull(),
    orders:varchar("orders").notNull(),
    users:varchar("users").notNull(),

  
 });

 export const ordersTable=pgTable("orders",{
    id:serial("id").primaryKey().notNull(),
    restaurant_id:integer("restaurant_id").notNull().references(()=>restaurantTable.id,{onDelete:"cascade"}),
    estimated_delivery_time:timestamp("estimated_delivery_time").notNull(),
    actual_delivery_time:timestamp("actual_delivery_time").notNull(),
    delivery_address_id:integer("delivery_address_id").notNull().references(()=>addressTable.id,{onDelete:"cascade"}),
    user_id:integer("user_id").notNull().references(()=>usersTable.id,{onDelete:"cascade"}),
    driver_id:integer("driver_id").notNull().references(()=>driverTable.id,{onDelete:"cascade"}),
    price:integer("price").notNull(),
    discount:integer("discount").notNull(),
    final_price:integer("final_price").notNull(),
    comment:varchar("comment").notNull(),
    created_at:timestamp("created_at").notNull(),
    updated_at:timestamp("updated_at").notNull(),
    comments:varchar("comments").notNull(),
    order_menu_item:varchar("order_menu_item").notNull(),
    order_status:varchar("order_status").notNull(),
    address:varchar("address").notNull(),
    driver:varchar("driver").notNull(),
    restaurant:varchar("restaurant").notNull(),
    users:varchar("users").notNull(),
    
 });


 export const menu_itemTable=pgTable("menu_item",{
    id:serial("id").primaryKey().notNull(),
    name:varchar("name").notNull(),
    restaurant_id:integer("restaurant_id").notNull().references(()=>restaurantTable.id,{onDelete:"cascade"}),
    category_id:integer("category_id").notNull().references(()=>categoryTable.id,{onDelete:"cascade"}),
    description:varchar("description").notNull(),
    ingredients:varchar("ingredients").notNull(),
    price:integer("price").notNull(),
    active:boolean("active").notNull(),
    created_at:timestamp("created_at").notNull(),
    updated_at:timestamp("updated_at").notNull(),
    category:varchar("category").notNull(),
    restaurant:varchar("restaurant").notNull(),
    orders_menu_item:varchar("orders_menu_item").notNull(),
    
 });

 export const categoryTable=pgTable("category",{
    id:serial("id").primaryKey().notNull(),
    name:varchar("name").notNull(),
    menu_item:varchar("menu_item").notNull(),
 });


 export const order_menu_itemTable=pgTable("order_menu_item",{
    id:serial("id").primaryKey().notNull(),
    order_id:integer("order_id").notNull().references(()=>ordersTable.id,{onDelete:"cascade"}),
    menu_item_id:integer("menu_item_id").notNull().references(()=>menu_itemTable.id,{onDelete:"cascade"}),
    quality:integer("quality").notNull(),
    item_price:integer("item_price").notNull(),
    price:integer("price").notNull(),
    comment:varchar("comment").notNull(),
    menu_item:varchar("menu_item").notNull(),
    orders:varchar("orders").notNull(),
 });

 export const order_statusTable=pgTable("order_status",{
    id:serial("id").primaryKey().notNull(),
    order_id:integer("order_id").notNull().references(()=>ordersTable.id,{onDelete:"cascade"}),
    status_catalog_id:integer("status_catalog_id").notNull().references(()=>status_catalogTable.id,{onDelete:"cascade"}),
    created_at:timestamp("created_at").notNull(),
    orders:varchar("orders").notNull(),
    status_catalog:varchar("status_catalog").notNull(),
 });  


 export const status_catalogTable=pgTable("status_catalog",{
   id:integer("id").primaryKey().notNull(),
   name:varchar("name").notNull(),
   order_status:varchar("order_status").notNull(),
 });

// //
// export const stateRelations=relations(stateTable,({one})=>({
//     city:one(cityTable,{
//         fields:[stateTable.id],
//         references:[cityTable.state_id]
//     })
// }));


export const restaurantRelations = relations(restaurantTable, ({ many, one }) => ({
    menuItems: many(menu_itemTable),
    orders: many(ordersTable),
    city: one(cityTable, {
        fields: [restaurantTable.city_id],
        references: [cityTable.id]
    }),
    owners: many(restaurant_ownerTable)
}));

export const addressRelations = relations(addressTable, ({ one, many }) => ({
    city: one(cityTable, {
        fields: [addressTable.city_id],
        references: [cityTable.id]
    }),
    user: one(usersTable, {
        fields: [addressTable.user_id],
        references: [usersTable.id]
    }),
    orders: many(ordersTable)
}));

// City and Restaurant relationship
export const citiesRelations = relations(cityTable, ({ many }) => ({
    restaurants: many(restaurantTable)
}));

export const cityRelations = relations(cityTable, ({ many, one }) => ({
    state: one(stateTable, {
        fields: [cityTable.state_id],
        references: [stateTable.id]
    }),
    addresses: many(addressTable),
    restaurants: many(restaurantTable)
}));

// Category and MenuItem relationship
export const categoryRelations = relations(categoryTable, ({ many }) => ({
    menuItems: many(menu_itemTable)
}));

export const commentRelations = relations(commentTable, ({ one }) => ({
    order: one(ordersTable, {
        fields: [commentTable.order_id],
        references: [ordersTable.id]
    }),
    user: one(usersTable, {
        fields: [commentTable.user_id],
        references: [usersTable.id]
    })
}));

export const driverRelations = relations(driverTable, ({ one, many }) => ({
    user: one(usersTable, {
        fields: [driverTable.user_id],
        references: [usersTable.id]
    }),
    orders: many(ordersTable)
}));

export const menuItemRelations = relations(menu_itemTable, ({ one, many }) => ({
    restaurant: one(restaurantTable, {
        fields: [menu_itemTable.restaurant_id],
        references: [restaurantTable.id]
    }),
    category: one(categoryTable, {
        fields: [menu_itemTable.category_id],
        references: [categoryTable.id]
    }),
    orderMenuItems: many(order_menu_itemTable)
}));

export const orderMenuItemRelations = relations(order_menu_itemTable, ({ one }) => ({
    menuItem: one(menu_itemTable, {
        fields: [order_menu_itemTable.menu_item_id],
        references: [menu_itemTable.id]
    }),
    order: one(ordersTable, {
        fields: [order_menu_itemTable.order_id],
        references: [ordersTable.id]
    })
}));

export const orderStatusRelations = relations(order_statusTable, ({ one }) => ({
    order: one(ordersTable, {
        fields: [order_statusTable.order_id],
        references: [ordersTable.id]
    }),
    statusCatalog: one(status_catalogTable, {
        fields: [order_statusTable.status_catalog_id],
        references: [status_catalogTable.id]
    })
}));

export const orderRelations = relations(ordersTable, ({ one, many }) => ({
    restaurant: one(restaurantTable, {
        fields: [ordersTable.restaurant_id],
        references: [restaurantTable.id]
    }),
    deliveryAddress: one(addressTable, {
        fields: [ordersTable.delivery_address_id],
        references: [addressTable.id]
    }),
    user: one(usersTable, {
        fields: [ordersTable.user_id],
        references: [usersTable.id]
    }),
    driver: one(driverTable, {
        fields: [ordersTable.driver_id],
        references: [driverTable.id]
    }),
    comments: many(commentTable),
    orderMenuItems: many(order_menu_itemTable),
    orderStatuses: many(order_statusTable)
}));

export const restaurantOwnerRelations = relations(restaurant_ownerTable, ({ one }) => ({
    user: one(usersTable, {
        fields: [restaurant_ownerTable.owner_id],
        references: [usersTable.id]
    }),
    restaurant: one(restaurantTable, {
        fields: [restaurant_ownerTable.restaurant_id],
        references: [restaurantTable.id]
    })
}));

export const stateRelations = relations(stateTable, ({ many }) => ({
    cities: many(cityTable)
}));

export const statusCatalogRelations = relations(status_catalogTable, ({ many }) => ({
    orderStatuses: many(order_statusTable)
}));

export const userRelations = relations(usersTable, ({ many }) => ({
    addresses: many(addressTable),
    comments: many(commentTable),
    drivers: many(driverTable),
    orders: many(ordersTable),
    restaurantOwners: many(restaurant_ownerTable)
}));

// // Types
export type TI_user = typeof usersTable.$inferInsert;
export type TS_user = typeof usersTable.$inferSelect;
export type TI_address = typeof addressTable.$inferInsert;
export type TS_address = typeof addressTable.$inferSelect;
export type TI_city = typeof cityTable.$inferInsert;
export type TS_city = typeof cityTable.$inferSelect;
export type TI_state = typeof stateTable.$inferInsert;
export type TS_state = typeof stateTable.$inferSelect;
export type TI_restaurant = typeof restaurantTable.$inferInsert;
export type TS_restaurant = typeof restaurantTable.$inferSelect;
export type TI_category = typeof categoryTable.$inferInsert;
export type TS_category = typeof categoryTable.$inferSelect;
export type TI_menu_item = typeof menu_itemTable.$inferInsert;
export type TS_menu_item = typeof menu_itemTable.$inferSelect;
export type TI_order = typeof ordersTable.$inferInsert;
export type TS_order = typeof ordersTable.$inferSelect;
export type TI_order_menu_item = typeof order_menu_itemTable.$inferInsert;
export type TS_order_menu_item = typeof order_menu_itemTable.$inferSelect;
export type TI_order_status = typeof order_statusTable.$inferInsert;
export type TS_order_status = typeof order_statusTable.$inferSelect;
export type TI_status_catalog = typeof status_catalogTable.$inferInsert;
export type TS_status_catalog = typeof status_catalogTable.$inferSelect;
export type TI_comment = typeof commentTable.$inferInsert;
export type TS_comment = typeof commentTable.$inferSelect;
export type TI_driver = typeof driverTable.$inferInsert;
export type TS_driver = typeof driverTable.$inferSelect;
export type TI_restaurant_owner = typeof restaurant_ownerTable.$inferInsert;
export type TS_restaurant_owner = typeof restaurant_ownerTable.$inferSelect;