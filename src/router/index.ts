import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Resetpassword from '../views/Resetpassword.vue'
import Productall from '../views/Productall.vue'
import Product1 from '../views/Product1.vue'
import Product2 from '../views/Product2.vue'
import Product3 from '../views/Product3.vue'
import ShoppingCart from '../views/ShoppingCart.vue'


const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login},
  { path: '/register', component: Register},
  { path: '/resetpassword', component: Resetpassword},
  { path: '/productall' , component: Productall},
  { path: '/product1' , component: Product1},
  { path: '/product2' , component: Product2},
  { path: '/product3' , component: Product3},
  { path: '/shoppingcart' , component: ShoppingCart},

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router