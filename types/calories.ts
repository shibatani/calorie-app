export type CaloryParams = {
  id: string
  title: string
  date: string
  calory: number
  kind: string
}

export type updateParams = {
  [key: string]: CaloryParams
}