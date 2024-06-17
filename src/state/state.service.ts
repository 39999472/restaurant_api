import db from "../drizzle/db";
import {eq}from "drizzle-orm";
import{TI_state,TS_state,stateTable} from "../drizzle/schema"
export const stateService = async (limit?: number): Promise<TS_state[] | null> => {
    if (limit) {
        return await db.query.stateTable.findMany({
            limit: limit
        });
    }
    return await db.query.stateTable.findMany();
}

export const getStateService = async (id: number): Promise<TI_state| undefined> => {
    return await db.query.stateTable.findFirst({
        where: eq(stateTable.id, id)
    })
}

export const createStateService = async (state: TI_state) => {
    await db.insert(stateTable).values(state)
    return "state created successfully";
}

export const updateStateService = async (id: number, state: TI_state) => {
    await db.update(stateTable).set(state).where(eq(stateTable.id, id))
    return "state updated successfully";
}

export const deleteStateService = async (id: number) => {
    await db.delete(stateTable).where(eq(stateTable.id, id))
    return "state deleted successfully";
}
// statewithCities
export const getStateWithCitiesService = async (id: number): Promise<TS_state | undefined> => {
    const state = await db.query.stateTable.findFirst({
      where: eq(stateTable.id, id),
      with: {
        cities: {
          columns: {
            name: true,
  
          }
        }
      }
    });
    return state;
  }