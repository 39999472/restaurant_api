import {z} from 'zod'

export const stateZod=z.object({
    id:z.number(),
    name:z.string(),
    email:z.string(),
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
