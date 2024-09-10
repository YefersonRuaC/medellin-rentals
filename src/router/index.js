import { createRouter, createWebHistory } from 'vue-router'
import { onAuthStateChanged } from 'firebase/auth'
import { useFirebaseAuth } from 'vuefire'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/property/:id',
      name: 'property',
      component: () => import('../views/PropertyView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/admin/AdminLayout.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: 'properties',
          name: 'admin-properties',
          component: () => import('../views/admin/AdminView.vue'),
          // meta: { requiresAuth: true },
        },
        {
          path: 'new',
          name: 'new-property',
          component: () => import('../views/admin/NewPropertyView.vue'),
          // meta: { requiresAuth: true },
        },
        {
          path: 'edit/:id',
          name: 'edit-property',
          component: () => import('../views/admin/EditPropertyView.vue'),
          // meta: { requiresAuth: true },
        }
      ]
    }
  ]
})

//Navigation GUARD
router.beforeEach( async(to, from, next) => {

  const requiresAuth = to.matched.some(url => url.meta.requiresAuth)

  if(requiresAuth) {
    try {
      await authenticateUser()
      next()

    } catch (error) {
      console.log(error)
      next({name: 'login'})
    }

  } else {
    next()
  }
  //to: is where we gonna go
  //from: is where we are already
  //next(): send to the next middleware
})

function authenticateUser() {

  const auth = useFirebaseAuth()

  //Returning the promise
  //resolve: when the promise is fullfied (condition fulffied) in this case if the user is authenticated
  //reject: when the promise is not fulldied, in this case if the user is not authenticated
  return new Promise((resolve, reject) => {
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      //ubsubscribe: is an observer, this is use when we are interested in check state changes in our app
      //An observer notifies us when something change
      unsubscribe()//In this case ubsubscribe make only one call to onAuthStateChanged and then don't hear
      //changes in onAuthStateChanged (only is executed one time)

      if(user) {
        resolve()
      } else {
        reject()
      }
    })

  })
}

export default router
