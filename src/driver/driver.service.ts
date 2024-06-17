import db from "../drizzle/db";
import {eq}from "drizzle-orm";
import{TI_driver,TS_driver,driverTable} from "../drizzle/schema"
export const driverService = async (limit?: number): Promise<TS_driver[] | null> => {
    if (limit) {
        return await db.query.driverTable.findMany({
            limit: limit
        });
    }
    return await db.query.driverTable.findMany();
}

export const get_driverService = async (id: number): Promise<TI_driver| undefined> => {
    return await db.query.driverTable.findFirst({
        where: eq(driverTable.id, id)
    })
}

export const create_driverService = async (driver: TI_driver) => {
    await db.insert(driverTable).values(driver)
    return "driver created successfully";
}

export const update_driverService = async (id: number, driver: TI_driver) => {
    await db.update(driverTable).set(driver).where(eq(driverTable.id, id))
    return "driver updated successfully";
}

export const delete_driverService = async (id: number) => {
    await db.delete(driverTable).where(eq(driverTable.id, id))
    return "driver deleted successfully";
}

export const getDriverWithOrdersService=async(id:number)=>{
    const driver=await db.query.driverTable.findFirst({
        where:eq(driverTable.id,id),
        columns:{
            car_model:true,
            car_make:true,
            online:true
        },
        with:{
            user:{
                columns:{
                    name:true,
                    email:true,
                    contact_phone:true,
                }
            },
            orders:{
                columns:{
                    delivery_address_id:true,
                    estimated_delivery_time:true,
                }
            }
        },
    });
    return driver;
}