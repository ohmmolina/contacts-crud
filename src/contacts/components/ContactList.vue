<script setup lang="ts">
import type { Contact } from '../types'
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useContactsStore } from '../stores/contacts'
import Button from '@/shared/components/ButtonBase.vue'

defineEmits(['editing'])

const contactsStore = useContactsStore()
const { getContacts: contacts } = storeToRefs(useContactsStore())

const showConfirmModal = ref(false)
const contactToDelete = ref<Contact | null>(null)

function preDelete(contact: Contact) {
  contactToDelete.value = contact
  showConfirmModal.value = true
}
function deleteContact() {
  if (!contactToDelete.value) return
  contactsStore.deleteContact(contactToDelete.value)
  showConfirmModal.value = false
}
</script>
<template>
  <div class="overflow-x-hidden">
    <!-- CONFIRMATION MODAL  -->
    <Transition name="fade" mode="out-in">
      <div
        v-if="showConfirmModal"
        class="fixed block inset-0 bg-surface/46 dark:bg-surface-dark/46 overflow-y-auto h-full w-full transition-all"
        @click.self="showConfirmModal = false"
      >
        <div
          class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-2/5 md:w-1/3 md:h-2/5 bg-surface-variant dark:bg-surface-dark-variant text-surface-on dark:text-surface-dark-on rounded-lg shadow-xl"
        >
          <h5 class="text-center text-xl font-bold mt-8">
            Are you sure you want to delete <br />
            {{ contactToDelete?.firstName }} {{ contactToDelete?.lastName }} ?
          </h5>
          <p class="mt-8 text-center text-sm">Once it is deleted can not be restore</p>
          <div class="absolute bottom-5 left-1/2 -translate-x-1/2 w-2/3 flex justify-around">
            <Button color="primary" @click="showConfirmModal = false"> Cancel </Button>
            <Button color="primary" variant="outlined" @click="deleteContact"> Confirm </Button>
          </div>
        </div>
      </div>
    </Transition>
    <!-- CONTACTS LIST -->
    <Transition name="fade-right">
      <div v-if="contacts.length > 0" class="list 2xl:grid 2xl:grid-cols-2 2xl:gap-2">
        <div
          v-for="contact in contacts"
          :key="contact.id"
          class="flex items-center mb-3 py-2 px-2 md:py-4 md:px-10 bg-primary-container dark:bg-secondary-dark-container text-primary-on-container dark:text-surface-dark-on rounded-lg"
        >
          <div class="mr-3 md:mr-5">
            <img
              :src="contact.image !== '' ? contact.image : 'https://picsum.photos/400'"
              alt="profile"
              class="mx-auto rounded-full w-14 h-14 md:w-20 md:h-20"
            />
          </div>
          <div>
            <h3 class="mb-1 font-semibold md:mb-2 md:text-lg">
              {{ contact.firstName }} {{ contact.lastName }}
            </h3>
            <h4 class="text-xs md:mr-2 md:inline">
              <span class="font-semibold">Email: </span>
              <a :href="`mailto: ${contact.email}`">{{ contact.email }}</a>
            </h4>
            <h4 class="text-xs md:mr-2 md:inline">
              <span class="font-semibold">Phone: </span>
              <a :href="`tel: ${contact.phone}`">{{ contact.phone }}</a>
            </h4>
            <h4 class="text-xs md:inline">
              <span class="font-semibold">Address: </span>
              <a
                target="_blank"
                :href="contact.address ? `https://maps.google.com/?q=${contact.address}` : ''"
              >
                {{ contact.address ? contact.address : 'N/A' }}
              </a>
            </h4>
          </div>
          <div class="flex-grow flex flex-col items-end justify-end md:flex-row md:items-center">
            <Button
              icon="edit"
              variant="icon"
              color="secondary"
              class="mb-2 md:mb-0 md:mr-4"
              @click="$emit('editing', contact)"
            />
            <Button icon="delete" variant="icon" color="secondary" @click="preDelete(contact)" />
          </div>
        </div>
      </div>
    </Transition>
    <!-- FALLBACK CONCATS LIST -->
    <Transition name="fade" :duration="{ enter: 5000, leave: 100 }">
      <div v-if="contacts.length === 0">
        <h3
          class="my-2 font-comfortaa font-light text-center text-2xl text-primary-dark-container-on"
        >
          No contacts yet
        </h3>
      </div>
    </Transition>
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
.fade-right-leave-active {
  animation: fade-right-leave 0.5s;
}
@keyframes fade-right-leave {
  from {
    opacity: 1;
    transform: translateX(0px);
  }
  to {
    opacity: 0;
    transform: translateX(2000px);
  }
}
</style>
