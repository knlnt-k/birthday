import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/home.vue"),
    },{
      path: "/game/:id",
      name: "game",
      component: () => import("../views/game/game.vue"),
    },
  ],
});

export default router;
