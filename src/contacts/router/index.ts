import ContactsView from '../views/ContactsView.vue'
import ContactView from '../views/ContactView.vue'

const ContactsRoute = {
  path: '/contacts',
  name: 'contacts',
  component: ContactsView,
  children: [
    {
      path: ':id',
      name: 'contact',
      component: ContactView
    }
  ],
  meta: {
    title: 'Contacts'
  }
}

export default ContactsRoute
