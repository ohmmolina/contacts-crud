import type { Router } from 'vue-router'

function metaTitle(router: Router) {
  router.beforeEach((to) => {
    if (to.meta.title) {
      document.title = <string>to.meta.title
    }
  })
}

export default metaTitle
