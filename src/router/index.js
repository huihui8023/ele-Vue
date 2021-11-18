import Vue from 'vue'
import VueRouter from 'vue-router'

const Index = () => import("../views/index/Index.vue")
const Home = () => import("../views/home/Home.vue")
const Me = () => import("../views/me/Me.vue")
const Order = () => import("../views/order/Order.vue")
const Login = () => import("../views/login/Login.vue")
const Address = () => import("../views/address/Address.vue")
const City = () => import("../views/city/City.vue")
const SearchShop = () => import("../views/searchShop/SearchShop.vue")
const Shop = () => import("../views/shopInfo/Shop.vue")
const ShopOrder = () => import("../views/shopInfo/childrenComponents/shopNavBar/childrenComponents/ShopOrder")
const ShopDetail = () => import("../views/shopInfo/childrenComponents/shopNavBar/childrenComponents/ShopDetail")
const ShopComment = () => import("../views/shopInfo/childrenComponents/shopNavBar/childrenComponents/ShopComment")
const AddLocation = () => import("../views/location/AddLocation")
const MyLocation = () => import("../views/location/MyLocation")



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Index,
    children: [
      {
        path: '',
        redirect: '/home'
      },
      {
        path: '/home',
        name: 'Home',
        component: Home,
        meta: {
          showTab: true
        }
      },
      {
        path: '/order',
        name: 'Order',
        component: Order,
        meta: {
          showTab: true
        }
      },
      {
        path: '/me',
        name: 'Me',
        component: Me,
        meta: {
          showTab: true
        }
      },
      {
        path: '/address',
        name: 'address',
        component: Address,
        meta: {
          showTab: true
        }
      },
      {
        path: '/city',
        name: 'City',
        component: City,
        meta: {
          showTab: true
        }
      },
      {
        path: '/searchShop',
        name: 'SearchShop',
        component: SearchShop,
        meta: {
          showTab: true
        }
      },
      {
        path: '/shop',
        name: 'Shop',
        component: Shop,
        redirect: '/shopOrder',
        meta: {
          showTab: false
        },
        children: [
          {
            path: '/shopOrder',
            name: 'ShopOrder',
            component: ShopOrder
          },
          {
            path: '/shopDetail',
            name: 'ShopDetail',
            component: ShopDetail
          },
          {
            path: '/shopComment',
            name: 'ShopComment',
            component: ShopComment
          }
        ]
      },
      {
        path: '/myLocation',
        name: 'MyLocation',
        component: MyLocation,
        meta: {
          showTab: false
        }
      },
      {
        path: '/addLocation',
        name: 'AddLocation',
        component: AddLocation,
        meta: {
          showTab: false
        }
      },
    ]
  },
  {
    path: '/login',
    component: Login
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  linkActiveClass: 'active_class'
})

// 导航首位
router.beforeEach((to, from, next) => {
  const isLogin = localStorage.ele_login ? true : false
  if (to.path == "/login") {
    next()
  } else {
    isLogin ? next() : next("./login")
  }
})

export default router
