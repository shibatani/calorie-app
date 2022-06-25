import { getDatabase, ref, push, set, get, remove, update, child } from "firebase/database";
import { CaloryParams, updateParams } from "types/calories"

export default class CaloriesClient {
  async fetchCalories() {
    const db = getDatabase();
    const response = await get(ref(db, `calories`)) as any
    const result: CaloryParams[] = []
    Object.keys(response.val()).forEach((key) => {
      result.push(response.val()[key])
    })
    return result as any
  }

  async fetchCalory(id: string) {
    const dbRef = ref(getDatabase());
    const response = await get(child(dbRef, `calories/${id}`)) as any
    return response.val() as any
  }

  async createCalory(params: CaloryParams) {
    const db = getDatabase();
    const key = push(ref(db, 'calories')).key;
    params.id = key!
    const response = set((ref(db, `calories/${key}`)), { ...params }) as any
    return response as any
  }

  async updateCalory(params: CaloryParams) {
    const db = getDatabase();
    const updates: updateParams = {};
    updates[`/calories/${params.id}`] = params;
    const response = update(ref(db), updates) as any
    return response as any
  }

  async deleteCalory(id: string) {
    const db = getDatabase();
    const response = await remove((ref(db, `calories/${id}`))) as any
    return response as any
  }
}