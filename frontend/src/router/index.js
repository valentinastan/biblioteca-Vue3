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
    path: "/books/:id",
    name: "BookDetails",
    props: true,
    component: () =>
      import("../components/BookDetails.vue")
  },

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
