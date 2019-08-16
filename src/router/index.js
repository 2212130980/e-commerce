import Vue from 'vue'
import Router from 'vue-router'
import shop from '@/views/shop.vue'
import item from '@/views/item.vue'
import login from '@/views/login.vue'
import '@/assets/css/reset.css'
import '@/assets/css/header.css'
import Account from "@/views/account";
import PersonalData from "@/views/account/personalData";
import Order from "@/views/account/order";
import address from "../views/account/address";
import Cart from "../views/cart";
import Checkout from "../views/checkout";
import Payment from "../views/payment";
import myCollection from "../views/myCollection";
Vue.use(Router)

export default new Router({
  mode: 'hash',
  scrollBehavior (to, from, savePosition) {
    if (savePosition) {
      return savePosition
    } else {
      return {x: 0, y: 0}
    }
  },
  routes: [
    {
      path: '/',
      name: 'shop',
      component: shop,
      meta: {
        keepAlive: false // 需要缓存
      }
    },
    {
      path: '/phone',
      name: 'shop',
      component: shop,
      meta: {
        keepAlive: true // 需要缓存
      }
    },
    {
      path: '/shop',
      name: 'shop',
      component: shop,
      meta: {
        compName: 'shop',
        keepAlive: true // 需要缓存
      }
    },
    {
      path: '/item',
      name: 'Item',
      component: item
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/account',
      component: Account,
      children: [
        {
          path: '',
          name: 'Account',
          component: Order
        },
        {
          path: '/personalData',
          name: 'PersonalData',
          component: PersonalData
        },
        {
          path: '/address',
          name: 'Address',
          component: address
        }
      ]
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    },
    {
      path: '/checkout',
      name: 'Checkout',
      component: Checkout
    },
    {
      path: '/payment',
      name: 'Payment',
      component: Payment
    },
    {
      path: '/myCollection',
      name: 'myCollection',
      component: myCollection
    }
  ]
})
