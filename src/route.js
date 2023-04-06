import { createRouter,createWebHashHistory} from "vue-router";

const home = () => import("./component/home.vue")
const login = () => import("./component/login.vue")

const routes = [
  {
    path: "/chat",
    name: "home",
    component: home,
  },
  {
    path: "/",
    name: "login",
    component: login
  }
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})