import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Resetpassword from '../views/Resetpassword.vue'
import Productall from '../views/Productall.vue'
import ShoppingCart from '../views/Shoppingcart.vue'
import Profile from '../views/Profile.vue'
import Setting from '../views/Setting.vue'
import Address from '../views/Address.vue'
import Order from '../views/Order.vue'
import Payment from '../views/Payment.vue'
import Chat from '../views/Chat.vue'
import Productdetails from '../views/Productdetails.vue'
import Advicecenter from '../views/Advicecenter.vue'

const routes = [
  { path: '/', component: Login },
  { path: '/home', component: Home },
  { path: '/login', component: Login},
  { path: '/register', component: Register},
  { path: '/resetpassword', component: Resetpassword},
  { path: "/productall", component: Productall },
  { path: "/products/:category?", name: "ProductsByCategory", component: Productall },
  { path: '/shoppingcart' , component: ShoppingCart},
  { path: '/profile' , component : Profile},
  { path: '/address' , component : Address},
  { path: '/order', component : Order},
  { path: '/setting', component : Setting},
  { path: '/payment', component : Payment},
  { path : '/chat' , component : Chat},
  { path: "/product/:id", component: Productdetails },
  { path : '/Advicecenter', component : Advicecenter}
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router