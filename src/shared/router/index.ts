//vue router config file
import { createRouter, createWebHistory } from 'vue-router'

/* Layouts  */
import Layouts from '../layouts'
import { ContactsRouter } from '@/contacts'

import metaTitle from './guards/metaTitle'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: Layouts.MainLayout,
      children: [ContactsRouter]
    }
  ]
})

metaTitle(router)

export default router
