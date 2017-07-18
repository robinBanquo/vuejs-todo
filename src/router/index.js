import Vue from 'vue'
import Router from 'vue-router'
import todosList from '@/components/todosList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'todosList',
      component: todosList
    }
  ]
})
