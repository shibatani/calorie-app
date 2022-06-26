import { getDatabase, ref, push, set, get, remove, update, child, query, orderByChild, equalTo } from "firebase/database";
import { CaloryParams, updateParams } from "types/calories"

export default class CaloriesClient {
  async fetchCalories(date: string) {
    const db = getDatabase();
    const que = query(ref(db, `calories`), orderByChild("date"), equalTo(date))
    const response = await get(que)
    const result: CaloryParams[] = []

    if (response.val()) {
      Object.keys(response.val()).forEach((key) => {
        result.push(response.val()[key])
      })
    }
    return result
  }

  async fetchCalory(id: string) {
    const dbRef = ref(getDatabase());
    const response = await get(child(dbRef, `calories/${id}`))
    return response.val()
  }

  async createCalory(params: CaloryParams) {
    const db = getDatabase();
    const key = push(ref(db, 'calories')).key;
    params.id = key!
    const response = set((ref(db, `calories/${key}`)), { ...params })
    return response
  }

  async updateCalory(params: CaloryParams) {
    const db = getDatabase();
    const updates: updateParams = {};
    updates[`/calories/${params.id}`] = params;
    const response = update(ref(db), updates)
    return response
  }

  async deleteCalory(id: string) {
    const db = getDatabase();
    const response = await remove((ref(db, `calories/${id}`)))
    return response
  }
}