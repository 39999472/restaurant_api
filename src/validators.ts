import {z} from 'zod'

export const stateZod=z.object({
    code:z.number(),
    name:z.string(),
    
})
export const cityZod=z.object({
    name:z.string(),
    state_id:z.string(),

})
export const addressZod=z.object({
    street_address_1: z.string(),
    street_address_2: z.string(),
    city_id: z.number(),
    zip_code: z.string(),
    delivery_instructions: z.string(),
    user_id: z.number(),
})
export const restaurantZod=z.object({
    name: z.string(),
    street_address: z.string(),
    zip_code: z.string(),
    city_id: z.number() 
})
export const usersZod=z.object({
    name: z.string(),
    contact_phone: z.string(),
    phone_verified: z.boolean(),
    email: z.string(),
    email_verified: z.boolean(),
    confirmation_code: z.string(),
    password: z.string()
})
export const categoryZod=z.object({
    name:z.string(),
    menu_item:z.number()
})

export const menu_itemsZod=z.object({
    name: z.string(),
    restaurant_id: z.number(),
    category_id: z.number(),
    description: z.string(),
    ingredients: z.string(),
    price: z.number(),
    active: z.boolean()
})
export const restaurant_ownerZod=z.object({
    restaurant_id:z.string(),
    owner_id:z.number(),
    users:z.string(),
    restaurant:z.string()
})

export const driverZod=z.object({
    car_make: z.string(),
    car_model: z.string(),
    car_year: z.string(),
    user_id: z.number(),
    online: z.boolean(),
    delivering: z.boolean()
})

export const ordersZod=z.object({
    restaurant_id: z.number(),
    estimated_delivery_time: z.string(),
    actual_delivery_time: z.string(),
    delivery_address: z.string(),
    user_id: z.number(),
    driver_id: z.number(),
    price: z.string(),
    discount: z.string(),
    final_price: z.string(),
    comment: z.string()
})
export const order_menu_itemsZod=z.object({
    order_id: z.number(),
    menu_item_id: z.number(),
    quantity: z.number(),
    item_price: z.string(),
    price: z.string(),
    comment: z.string()
})

export const status_catalogZod=z.object({
    name:z.string(),
    description:z.string()
})
export const order_statusZod=z.object({
    order_id:z.number(),
    status_catalog_id:z.number()
})

export const commentsZod=z.object({
    order_id: z.number(),
    user_id: z.number(),
    comment_text: z.string(),
    is_complaint: z.boolean(),
    is_praise: z.boolean()
})



export const loginUserSchema=z.object({
    username:z.string(),
    password:z.string()
})
export const registerUserSchema=z.object({ 
    userId:z.number(),
    username:z.string(),
    password:z.string(),
    role:z.string().optional()
})
