export interface ErapulusResponse<T> {
  status: number,
  payload: T,
  message: string
}
