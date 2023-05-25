import { describe, test, expect, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useContactsStore } from '../stores/contacts'

describe('Contacts', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    window.localStorage.clear()
  })
  test('Should add a contact', () => {
    const contactsStore = useContactsStore()
    const contact = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'test@email.com',
      phone: '1234567890',
      address: '123 Main St'
    }
    const res = contactsStore.addContact(contact)
    expect(contactsStore.getContacts).toEqual([
      {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'test@email.com',
        phone: '1234567890',
        address: '123 Main St'
      }
    ])
    expect(res).toEqual({
      success: true,
      message: 1
    })
  })
  test('Should add a contact without address', () => {
    const contactsStore = useContactsStore()
    const contact = {
      firstName: 'John',
      lastName: 'Doe',
      phone: '1234567890',
      email: 'test@email.com'
    }
    const res = contactsStore.addContact(contact)
    expect(contactsStore.getContacts).toEqual([
      {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        phone: '1234567890',
        email: 'test@email.com'
      }
    ])
    expect(res).toEqual({
      success: true,
      message: 1
    })
  })
  test('Should not add a contact with missing required value', () => {
    const contactsStore = useContactsStore()
    const res = contactsStore.addContact({
      lastName: 'Doe',
      email: 'test@email.com',
      phone: '1234567890'
    })
    const res2 = contactsStore.addContact({
      firstName: 'John',
      email: 'test@email.com',
      phone: '1234567890'
    })
    const res3 = contactsStore.addContact({
      firstName: 'John',
      lastName: 'Doe',
      phone: '1234567890'
    })
    const res4 = contactsStore.addContact({
      firstName: 'John',
      lastName: 'Doe',
      email: 'test@email.com'
    })
    expect(contactsStore.getContacts).toEqual([])
    expect(res).toEqual({
      success: false,
      message: 'First name is required'
    })
    expect(res2).toEqual({
      success: false,
      message: 'Last name is required'
    })
    expect(res3).toEqual({
      success: false,
      message: 'Email is required'
    })
    expect(res4).toEqual({
      success: false,
      message: 'Phone is required'
    })
  })
  test('Should not add a contact with invalid email', () => {
    const contactsStore = useContactsStore()
    const contact = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'test',
      phone: '1234567890'
    }
    const res = contactsStore.addContact(contact)
    expect(contactsStore.getContacts).toEqual([])
    expect(res).toEqual({
      success: false,
      message: 'Invalid email'
    })
  })
  test('Should not add a contact with too long email', () => {
    const contactsStore = useContactsStore()
    const res = contactsStore.addContact({
      firstName: 'John',
      lastName: 'Doe',
      email: 'test@email' + 'a'.repeat(250) + '.com',
      phone: '1234567890'
    })
    expect(contactsStore.getContacts).toEqual([])
    expect(res).toEqual({
      success: false,
      message: 'Email is too long'
    })
  })
  test('Should not add a contact with too long first or last name', () => {
    const contactsStore = useContactsStore()
    const res = contactsStore.addContact({
      firstName: 'a'.repeat(257),
      lastName: 'Doe',
      email: 'test@email.com',
      phone: '1234567890'
    })
    const res2 = contactsStore.addContact({
      firstName: 'John',
      lastName: 'a'.repeat(257),
      email: 'test@email.com',
      phone: '1234567890'
    })
    expect(contactsStore.getContacts).toEqual([])
    expect(res).toEqual({
      success: false,
      message: 'First name is too long'
    })
    expect(res2).toEqual({
      success: false,
      message: 'Last name is too long'
    })
  })
  test('Should not add a contact with invalid phone number', () => {
    const contactsStore = useContactsStore()
    const res = contactsStore.addContact({
      firstName: 'John',
      lastName: 'Doe',
      phone: '1ab3456789',
      email: 'test@email.com'
    })
    expect(contactsStore.getContacts).toEqual([])
    expect(res).toEqual({
      success: false,
      message: 'Invalid phone number'
    })
  })
  test('Id should increment', () => {
    const contactsStore = useContactsStore()
    const contact = {
      firstName: 'John',
      lastName: 'Doe',
      phone: '1234567890',
      email: 'test@email.com'
    }
    contactsStore.addContact(contact)
    contactsStore.addContact(contact)
    contactsStore.addContact(contact)
    expect(contactsStore.getContacts).toEqual([
      {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        phone: '1234567890',
        email: 'test@email.com'
      },
      {
        id: 2,
        firstName: 'John',
        lastName: 'Doe',
        phone: '1234567890',
        email: 'test@email.com'
      },
      {
        id: 3,
        firstName: 'John',
        lastName: 'Doe',
        phone: '1234567890',
        email: 'test@email.com'
      }
    ])
  })

  test('Should edit a contact', () => {
    const contactsStore = useContactsStore()
    const contact = {
      firstName: 'John',
      lastName: 'Doe',
      phone: '1234567890',
      email: 'test@email.com'
    }
    const res = contactsStore.addContact(contact)
    const resEdit = contactsStore.editContact({
      id: Number(res.message),
      firstName: 'Jane',
      lastName: 'Doee',
      phone: '1234567899',
      email: 'test@test.com'
    })
    expect(contactsStore.getContacts).toEqual([
      {
        id: 1,
        firstName: 'Jane',
        lastName: 'Doee',
        phone: '1234567899',
        email: 'test@test.com'
      }
    ])
    expect(resEdit).toEqual({
      success: true,
      message: 1
    })
  })
  test('Should not edit a contact with missing required value', () => {
    const contactsStore = useContactsStore()
    const contact = {
      firstName: 'John',
      lastName: 'Doe',
      phone: '1234567890',
      email: 'test@email.com'
    }
    const res = contactsStore.addContact(contact)
    const resEdit = contactsStore.editContact({
      id: Number(res.message),
      lastName: 'Doee',
      phone: '1234567899',
      email: 'test@email.com'
    })
    expect(contactsStore.getContacts).toEqual([
      {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        phone: '1234567890',
        email: 'test@email.com'
      }
    ])
    expect(resEdit).toEqual({
      success: false,
      message: 'First name is required'
    })
  })

  test('Should delete a contact', () => {
    const contactsStore = useContactsStore()
    const contact = {
      firstName: 'John',
      lastName: 'Doe',
      phone: '1234567890',
      email: 'test@email.com'
    }
    const res = contactsStore.addContact(contact)
    const resDelete = contactsStore.deleteContact({
      id: Number(res.message),
      ...contact
    })
    expect(contactsStore.getContacts).toEqual([])
    expect(resDelete).toEqual({
      success: true,
      message: 1
    })
  })
  test('Should delete a contact with missing contact keys', () => {
    const contactsStore = useContactsStore()
    const contact = {
      firstName: 'John',
      lastName: 'Doe',
      phone: '1234567890',
      email: 'test@email.com'
    }
    const res = contactsStore.addContact(contact)
    const resDelete = contactsStore.deleteContact({
      id: Number(res.message)
    })
    expect(contactsStore.getContacts).toEqual([])
    expect(resDelete).toEqual({
      success: true,
      message: 1
    })
  })
  test('Should not delete a contact with invalid id nor missing id', () => {
    const contactsStore = useContactsStore()
    const contact = {
      firstName: 'John',
      lastName: 'Doe',
      phone: '1234567890',
      email: 'test@emial.com'
    }
    contactsStore.addContact(contact)
    const resDelete = contactsStore.deleteContact({
      ...contact
    })
    const resDelete2 = contactsStore.deleteContact({
      id: 2,
      ...contact
    })
    expect(contactsStore.getContacts).toEqual([
      {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        phone: '1234567890',
        email: 'test@emial.com'
      }
    ])
    expect(resDelete).toEqual({
      success: false,
      message: 'Contact id is required'
    })
    expect(resDelete2).toEqual({
      success: false,
      message: 'Contact not found'
    })
  })
})
