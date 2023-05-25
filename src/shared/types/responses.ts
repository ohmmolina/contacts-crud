export interface FetchRespone {
  data: unknown
  status: number
  error?: string
}
export interface ValidatorResponse {
  valid: boolean
  message: string
}
export interface CrudResponse {
  success: boolean
  message: unknown
}
