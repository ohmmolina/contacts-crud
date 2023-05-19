/*  EXAMPLE OF API CALLS */

import type { FetchRespone } from '../types'

const API_URL = 'http://localhost:3000'

export async function GetJSON(path: string, requestInit: RequestInit = {}): Promise<FetchRespone> {
  try {
    const response = await fetch(`${API_URL}${path}`, { ...requestInit })
    const status = response.status
    // Destructuring if data and error are not in response, then other structure logic will be applied
    const { data, error } = await response.json()
    if (error) {
      return { status, data, error }
    }
    return { status, data }
  } catch (error) {
    if (typeof error === 'string') return { status: 500, data: null, error }
    if (error instanceof Error) return { status: 500, data: null, error: error.message }
    return { status: 500, data: null, error: 'Error' }
  }
}
