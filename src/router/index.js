import Vue from "vue";
import VueRouter from "vue-router";
import beforeEach from "./beforeEach";

Vue.use(VueRouter);

const routes = [
  {
    path: "/auth",
    component: () => import("@/views/auth/Auth"),
    children: [
      {
        path: "",
        name: "Sign In",
        component: () => import("@/views/auth/children/SignIn"),
      },
      {
        path: "sign-up",
        name: "Sign Up",
        component: () => import("@/views/auth/children/SignUp"),
      },
    ],
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("@/views/home/Home"),
  },
  {
    path: "/about",
    name: "About",
    component: () => import("@/views/about/About"),
  },
  {
    path: "/main",
    name: "Main",
    meta: { authRequired: true },
    component: () => import("@/views/main/Main"),
  },
  {
    path: "*",
    redirect: "/home",
  },
];

const router = new VueRouter({
  //mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(beforeEach);

export default router;
