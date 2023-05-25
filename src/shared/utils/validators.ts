import type { ValidatorResponse } from '../types'

export function validateEmail(email: string): ValidatorResponse {
  const response: ValidatorResponse = {
    valid: false,
    message: ''
  }
  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/
  if (!emailRegex.test(email)) {
    response.message = 'Invalid email'
    return response
  }
  if (email.length > 256) {
    response.message = 'Email is too long'
    return response
  }
  response.valid = true
  return response
}

export function validatePhone(phone: string): ValidatorResponse {
  const response: ValidatorResponse = {
    valid: false,
    message: ''
  }
  const phoneRegex = /^\d{10}$/
  if (!phoneRegex.test(phone)) {
    response.message = 'Invalid phone number'
    return response
  }
  response.valid = true
  return response
}

export function isNumber(evt: KeyboardEvent, withPoint = false): void {
  const keysAllowed: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
  if (withPoint) keysAllowed.push('.')
  const keyPressed: string = evt.key

  if (!keysAllowed.includes(keyPressed)) {
    evt.preventDefault()
  }
}
