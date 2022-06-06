import { getDatabase, ref, push, set, get, remove } from "firebase/database";
import { CaloryParams } from "types/calories"

export default class CaloriesClient {
  async fatchCalories() {
    const db = getDatabase();
    const response = await get(ref(db, `calories`)) as any
    const result: CaloryParams[] = []
    Object.keys(response.val()).forEach((key) => {
      result.push(response.val()[key])
    })
    return result
  }

  async createCalory(params: CaloryParams) {
    const db = getDatabase();
    const key = push(ref(db, 'calories')).key;
    params.id = key!
    const response = set((ref(db, `calories/${key}`)), { ...params }) as any
    return response as any
  }

  async deleteCalory(id: string) {
    const db = getDatabase();
    const response = await remove((ref(db, `calories/${id}`))) as any
    return response as any
  }
}