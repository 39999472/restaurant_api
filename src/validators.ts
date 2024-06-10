import {z} from 'zod'

export const stateZod=z.object({
    id:z.number(),
    name:z.string(),
    email:z.string(),
})

