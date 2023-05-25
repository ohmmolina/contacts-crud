<script setup lang="ts">
import type { Contact, newContact } from '../types'
import type { CrudResponse } from '@/shared/types'
import { ref, computed, watchEffect } from 'vue'
import { storeToRefs } from 'pinia'
import { convertFileToBase64 } from '@/shared/utils/filesConvertions'
import { useContactsStore } from '../stores/contacts'
import { isNumber } from '@/shared/utils/validators'
import Button from '@/shared/components/ButtonBase.vue'
import Input from '@/shared/components/InputBase.vue'

defineProps<{
  isEditing?: boolean
}>()
const emit = defineEmits(['saved'])

const contactsStore = useContactsStore()
const { getContactToEdit: contactToEdit } = storeToRefs(useContactsStore())

const firstName = ref({
  value: '',
  hint: '',
  error: false
})
const lastName = ref({
  value: '',
  hint: '',
  error: false
})
const phone = ref({
  value: '',
  hint: '',
  error: false
})
const email = ref({
  value: '',
  hint: '',
  error: false
})
const address = ref({
  value: '',
  hint: '',
  error: false
})

watchEffect(() => {
  if (!contactToEdit.value) return
  firstName.value.value = contactToEdit.value.firstName
  lastName.value.value = contactToEdit.value.lastName
  phone.value.value = contactToEdit.value.phone
  email.value.value = contactToEdit.value.email
  if (contactToEdit.value.address) address.value.value = contactToEdit.value.address
})

function cleanErrors() {
  firstName.value.error = false
  lastName.value.error = false
  phone.value.error = false
  email.value.error = false
  address.value.error = false

  firstName.value.hint = ''
  lastName.value.hint = ''
  phone.value.hint = ''
  email.value.hint = ''
  address.value.hint = ''
}
function validateErrors(message: string) {
  cleanErrors()
  if (message.toLowerCase().includes('first name')) {
    firstName.value.hint = message
    firstName.value.error = true
    return
  }
  if (message.toLowerCase().includes('last name')) {
    lastName.value.hint = message
    lastName.value.error = true
    return
  }
  if (message.toLowerCase().includes('phone')) {
    phone.value.hint = message
    phone.value.error = true
    return
  }
  if (message.toLowerCase().includes('email')) {
    email.value.hint = message
    email.value.error = true
    return
  }
  if (message.toLowerCase().includes('address')) {
    address.value.hint = message
    address.value.error = true
    return
  }
  //TODO: badge default error
}

const fileEl = ref<HTMLInputElement | null>(null)
const file = ref<File | null>(null)
const urlFile = computed(() => {
  if (contactToEdit.value?.image && !file.value) return contactToEdit.value.image
  if (file.value) return URL.createObjectURL(file.value)
  return ''
})
function mirrorClick() {
  fileEl.value?.click()
}
function uploadFile($event: Event) {
  const target = $event.target as HTMLInputElement
  if (!target.files) return
  file.value = target.files[0]
}

async function save() {
  let fileB64 = ''
  if (file.value) {
    fileB64 = await convertFileToBase64(file.value)
  }
  const contact: newContact = {
    firstName: firstName.value.value,
    lastName: lastName.value.value,
    phone: typeof phone.value.value === 'number' ? `${phone.value.value}` : phone.value.value,
    email: email.value.value,
    address: address.value.value,
    image: fileB64
  }
  let res: CrudResponse = { success: false, message: '' }
  if (contactToEdit.value) {
    const contactEdit: Contact = { ...contact, id: contactToEdit.value.id }
    res = contactsStore.editContact(contactEdit)
    if (!res.success) {
      validateErrors(`${res.message}`)
      return
    }
  } else {
    res = contactsStore.addContact(contact)
    if (!res.success) {
      validateErrors(`${res.message}`)
      return
    }
  }
  cleanErrors()
  emit('saved', res.message)
}
</script>
<template>
  <form class="grid grid-col-1 sm:grid-cols-2 md:grid-cols-3 bg-inherit gap-y-5 gap-x-2">
    <div class="sm:col-span-2 md:col-span-3 flex flex-col items-center gap-2">
      <input type="file" accept="image/*" class="hidden" ref="fileEl" @change="uploadFile" />
      <div v-if="file || urlFile" class="w-20 h-20">
        <img :src="urlFile" class="w-full h-full rounded-full shadow-md" />
      </div>
      <Button
        v-else
        color="primary"
        variant="icon"
        icon="add_photo_alternate"
        size="2xl"
        @click="mirrorClick"
      />
      <Button color="primary" variant="text" @click="mirrorClick">Add photo</Button>
    </div>
    <Input
      label="First name"
      variant="outlined"
      color="primary"
      max="256"
      :hint="firstName.hint"
      :hasError="firstName.error"
      v-model.trim="firstName.value"
    />
    <Input
      label="Last name"
      variant="outlined"
      color="primary"
      max="256"
      :hint="lastName.hint"
      :hasError="lastName.error"
      v-model.trim="lastName.value"
    />
    <Input
      type="email"
      label="Email"
      variant="outlined"
      color="primary"
      max="256"
      :hint="email.hint"
      :hasError="email.error"
      v-model="email.value"
    />
    <Input
      type="tel"
      label="Phone"
      variant="outlined"
      color="primary"
      max="10"
      :hint="phone.hint"
      :hasError="phone.error"
      v-model="phone.value"
      @keypress="isNumber"
    />
    <Input
      label="Address"
      variant="outlined"
      color="primary"
      :hint="address.hint"
      :hasError="address.error"
      v-model="address.value"
    />
    <div class="sm:col-span-2 md:col-span-3 text-right">
      <Button color="primary" @click="save">{{ isEditing ? 'Save' : 'Add' }}</Button>
    </div>
  </form>
</template>
