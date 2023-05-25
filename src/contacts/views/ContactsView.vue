<script setup lang="ts">
import { ref } from 'vue'
import type { Contact } from '../types'
import { useContactsStore } from '../stores/contacts'
import Button from '@/shared/components/ButtonBase.vue'
import Input from '@/shared/components/InputBase.vue'
import ConctactForm from '../components/ConctactForm.vue'
import ContactList from '../components/ContactList.vue'

const contactsStore = useContactsStore()
const showContactForm = ref(false)
const isEditing = ref(false)

function closeContactForm() {
  showContactForm.value = false
  isEditing.value = false
  contactsStore.setContactToEdit(null)
}

const searchValue = ref('')
function search(search: string) {
  if (search === '') {
    searchValue.value = ''
  }
  contactsStore.searchContact(search)
}
function editingContact(contact: Contact) {
  isEditing.value = true
  showContactForm.value = true
  contactsStore.setContactToEdit(contact)
}
</script>
<template>
  <div>
    <div
      class="flex gap-x-5 gap-y-2 flex-col sm:flex-row md:gap-0 justify-center items-center sm:justify-between mx-4 md:mx-10 mb-4 bg-background dark:bg-background-dark"
    >
      <h1 class="text-2xl md:4xl xl:6xl bg-inherit">Contacts</h1>
      <Input
        v-model="searchValue"
        label="Search"
        icon-lead="search"
        icon-trail="cancel"
        variant="outlined"
        color="primary"
        @input="search"
        @icon-trail-click="search('')"
      />
      <Button
        icon="add"
        text="Add Contact"
        color="primary"
        size="sm"
        @click="showContactForm = !showContactForm"
      />
    </div>
    <Transition name="fade">
      <div
        v-if="showContactForm"
        class="px-4 md:px-8 py-4 bg-secondary-container text-secondary-container-on mx-4 md:mx-8 dark:bg-secondary-dark-container dark:text-secondary-container-on-dark rounded-lg shadow-xl"
      >
        <div class="flex justify-between">
          <div>
            <h2 class="text-lg font-semibold mb-2">
              {{ isEditing ? 'Update Contact' : 'New Contact' }}
            </h2>
            <p class="text-sm mb-4">
              {{ isEditing ? 'Change the contact info' : 'Add a new contact to your list.' }}
            </p>
          </div>
          <Button icon="close" variant="icon" @click="closeContactForm" />
        </div>
        <ConctactForm :is-editing="isEditing" @saved="closeContactForm" />
      </div>
    </Transition>
    <ContactList class="mt-4 mx-2 md:mx-10" @editing="editingContact" />
  </div>
</template>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
