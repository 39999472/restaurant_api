import "dotenv/config"

import {verify} from "hono/jwt";
 import {Context,Next} from "hono"
interface HonoRequest<T,U>{
    user?:T;
}


 export const verifyToken= async(token: string, secret :string)=>{
    try{
        const decoded=await verify(token as  string, secret)
        return decoded;

    }catch(error:any){
        return null 
    }
 }


 export const authMiddleware= async(c:Context & {req:HonoRequest<any,unknown>},next:Next,requiredRole:string)=>{


    const token=c.req.header("authorization");
    if (!token)return c.json({error:"Token not provided"},401)
        const decoded=await verifyToken(token,process.env.JWT_SECRET as string);

    if(!decoded) return c.json({error:"invalid token"},401)
        
            
    
     
            if(requiredRole === 'both'){
            if (decoded.role==="admin"||decoded.role==="user"){
                c.req.user=decoded;
                return next();

            }
            }else if(decoded.role===requiredRole){
                c.req.user=decoded;
                return next();
            }
 }



 export const bothRoleAuth= async(c:Context,next:Next)=>await authMiddleware(c,next,"both")
 export const adminRoleAuth=async(c:Context,next:Next)=> await authMiddleware(c,next,"admin")
 export const userRoleAuth=async(c:Context,next:Next)=> await authMiddleware(c,next,"user")