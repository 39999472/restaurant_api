import "dotenv/config";
import { Context } from "hono";
import{createAuthUserService,userLoginService} from './auth.service'
import bycrpt from 'bcrypt'
import {sign} from "hono/jwt";


export const registerUser=async(c:Context)=>{
    try {
        const users = await c.req.json();
        const pass =users.password;
        const hashedPassword=await bycrpt.hash(pass,10);
        users.password = hashedPassword;
        const created_users= await createAuthUserService(users);


        if (!created_users) return c.text("users not created", 404);
        return c.json({ msg: created_users }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}






export const loginUser=async(c:Context)=>{
    
    try {
        const user = await c.req.json();
        //check user exist
        const userExist = await userLoginService(user);
        if (userExist === null) return c.json({ error: "User not found" }, 404);  // not found         
        const userMatch = await bycrpt.compare(user.password, userExist?.password as string);
        if (!userMatch) {
            return c.json({ error: "Invalid credentials" }, 401);  // unauthorized
        } else {
            // create a payload
            const payload = {
                sub: userExist?.username,
                role: userExist?.role,
                exp: Math.floor(Date.now() / 1000) + (60 * 180)  // 3 hour  => SESSION EXPIRATION
            }
            let secret = process.env.JWT_SECRET as string;  // secret key
            const token = await sign(payload, secret);   // create a JWT token
            let user = userExist?.user;
            let role = userExist?.role;
            return c.json({ token, user: { role, ...user } }, 200);  // return token and user details
        }
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }


}