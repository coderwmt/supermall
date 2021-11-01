import Vue from "vue"
import VueRouter from "vue-router"

const Home = () => import("views/Home/Home.vue")
const Category = () => import("views/Category/Category.vue")
const Cart = () => import("views/Cart/Cart.vue")
const Profile = () => import("views/Profile/Profile.vue")
const Detail = () => import("views/Detail/Detail.vue")

Vue.use(VueRouter)

const routes = [
  {
    path:"/",
    redirect: "/home"
  },
  {
    path:"/home",
    component:Home
  },
  {
    path:"/category",
    component:Category
  },
  {
    path:"/cart",
    component:Cart
  },
  {
    path:"/profile",
    component:Profile
  },
  {
    path:"/detail/:iid",
    component:Detail
  }
]

const router = new VueRouter({
  routes,
  mode:"history"
})

export default router
