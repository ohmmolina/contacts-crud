export interface Contact {
  id: number
  firstName: string
  lastName: string
  email: string
  phone: string
  address?: string
  image?: string
}
export type newContact = Omit<Contact, 'id'>
