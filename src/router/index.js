import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index'
import Details from '../views/Details'
import Detail from '../views/Detail'
import Reg from '../views/Reg'
import ProductList from '../views/ProductList'
import ShoppingCar from '../views/ShoppingCar'
import activity from '../views/activity'
import discount from '../views/discount'
import paradise from '../views/paradise'
import personal from '../views/personal'
import surround from '../views/surround'

Vue.use(VueRouter)

const routes = [
  {path: '/',component: Index},
  {path: '/Index',name: 'Index',component: Index},
  {path: '/Details/:pid',name: 'Details',component: Details,props:true},
  {path: '/Detail/:pid',name: 'Detail',component: Detail,props:true},
  {path: '/ProductList',name: 'ProductList',component: ProductList},
  {path: '/Reg',name: 'Reg',component: Reg},
  {path: '/ShoppingCar/:uid',name: 'ShoppingCar',component: ShoppingCar,props:true},
  {path: '/activity',name: 'activity',component: activity},
  {path: '/discount',name: 'discount',component: discount},
  {path: '/paradise',name: 'paradise',component: paradise},
  {path: '/personal/:uid',name: 'personal',component: personal,props:true},
  {path: '/surround',name: 'surround',component: surround}
]

const router = new VueRouter({
  routes
})

export default router
