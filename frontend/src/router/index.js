import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/login/:action",
    name: "Login",
    props: true,
    component: () =>
      import("../components/Login.vue")
  },
  {
    path: "/book/:actionOnBook",
    name: "AddEditBook",
    props: true,
    component: () =>
      import("../components/AddEditBook.vue")
  }

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
