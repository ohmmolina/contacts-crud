import type { ValidatorResponse, CrudResponse } from '@/shared/types'
import type { Contact, newContact } from '../types'
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { validateEmail, validatePhone } from '@/shared/utils/validators'

export const useContactsStore = defineStore('contacts', () => {
  const contacts = ref<Contact[]>([])
  const contactsFiltered = ref<Contact[]>([])
  const contactToEdit = ref<Contact | null>(null)

  const getContacts = computed(() => contactsFiltered.value || contacts.value)
  const getContactToEdit = computed(() => contactToEdit.value)

  function validateContact(contact: newContact): ValidatorResponse {
    const response: ValidatorResponse = {
      valid: false,
      message: ''
    }
    try {
      if (!contact.firstName) throw new Error('First name is required')
      if (contact.firstName.length > 256) throw new Error('First name is too long')

      if (!contact.lastName) throw new Error('Last name is required')
      if (contact.lastName.length > 256) throw new Error('Last name is too long')

      if (!contact.email) throw new Error('Email is required')
      const validEmail = validateEmail(contact.email)
      if (!validEmail.valid) throw new Error(validEmail.message)

      if (!contact.phone) throw new Error('Phone is required')
      const validPhone = validatePhone(contact.phone)
      if (!validPhone.valid) throw new Error(validPhone.message)

      response.valid = true
      return response
    } catch (error) {
      if (error instanceof Error) {
        response.message = error.message
        return response
      } else {
        console.warn(error)
        response.message = 'Something went wrong. Please try again later'
        return response
      }
    }
  }
  function createId(): number {
    contacts.value.sort((a, b) => a.id - b.id)
    const lastContact = contacts.value[contacts.value.length - 1]
    const lastId = lastContact ? lastContact.id : 0
    return lastId + 1
  }

  function persistContact() {
    localStorage.setItem('contacts', JSON.stringify(contacts.value))
  }
  function loadContacts() {
    try {
      const contactsString = localStorage.getItem('contacts')
      if (contactsString) {
        const contactsArray = JSON.parse(contactsString)
        contactsArray.forEach((contact: Contact) => {
          const validContact = validateContact(contact)
          if (!validContact.valid) throw new Error(validContact.message)
        })
        contacts.value = contactsArray
        contactsFiltered.value = contactsArray
      }
    } catch (error) {
      console.warn(error)
    }
  }
  loadContacts()

  function addContact(contact: newContact): CrudResponse {
    const response: CrudResponse = {
      success: false,
      message: ''
    }
    try {
      const validContact = validateContact(contact)
      if (!validContact.valid) throw new Error(validContact.message)
      const id = createId()
      contacts.value.push({ ...contact, id })
      persistContact()

      response.success = true
      response.message = id
      return response
    } catch (error) {
      console.warn(error)
      if (error instanceof Error) response.message = error.message
      else response.message = 'Something went wrong. Please try again later'
      return response
    }
  }
  function setContactToEdit(contact: Contact | null): void {
    contactToEdit.value = contact
  }
  function editContact(contact: Contact): CrudResponse {
    const response: CrudResponse = {
      success: false,
      message: ''
    }
    const index = contacts.value.findIndex((c) => c.id === contact.id)
    if (index === -1) throw new Error('Contact not found')
    try {
      const validContact = validateContact(contact)
      if (!validContact.valid) throw new Error(validContact.message)

      contacts.value[index] = contact
      persistContact()

      response.success = true
      response.message = contact.id
      return response
    } catch (error) {
      console.warn(error)
      if (error instanceof Error) response.message = error.message
      else response.message = 'Something went wrong. Please try again later'
      return response
    }
  }
  function deleteContact(contact: Contact): CrudResponse {
    const response: CrudResponse = {
      success: false,
      message: ''
    }
    try {
      if (!contact.id) throw new Error('Contact id is required')
      const index = contacts.value.findIndex((c) => c.id === contact.id)
      if (index === -1) throw new Error('Contact not found')
      contacts.value.splice(index, 1)
      persistContact()

      response.success = true
      response.message = contact.id
      return response
    } catch (error) {
      console.warn(error)
      if (error instanceof Error) response.message = error.message
      else response.message = 'Something went wrong. Please try again later'
      return response
    }
  }

  function searchContact(searchTerm: string): void {
    console.log(searchTerm)
    const search = searchTerm.toLowerCase()
    const filteredContacts = contacts.value.filter((contact) => {
      const fullName = `${contact.firstName} ${contact.lastName}`.toLowerCase()
      console.log(fullName)
      const address = contact.address?.toLowerCase() ?? ''
      console.log(address)
      return (
        fullName.includes(search) ||
        contact.email?.includes(search) ||
        contact.phone.includes(search) ||
        address.includes(search)
      )
    })
    contactsFiltered.value = filteredContacts || contacts.value
  }

  return {
    getContacts,
    getContactToEdit,
    addContact,
    setContactToEdit,
    editContact,
    deleteContact,
    searchContact
  }
})
