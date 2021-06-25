import Blade from './examples/blade.vue'
import Pulp from './examples/pulp.vue'
import Star from './examples/star.vue'
import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Pulp
    },
    {
      path: '/blade-runner',
      component: Blade
    },
    {
      path: '/pulp-fiction',
      component: Pulp
    },
    {
      path: '/star-wars',
      component: Star
    }
  ]
})
