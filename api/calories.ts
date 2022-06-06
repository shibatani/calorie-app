import { getDatabase, ref, push, set, get } from "firebase/database";

export type CaloryParams = {
  title: string
  date: string
  calory: number
  kind: string
}

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
    const response = set(push(ref(db, 'calories')), { ...params }) as any
    return response as any
  }
}