import { createApp } from "vue";
import App from "./App.vue";
import "./main.css";
import * as VueRouter from "vue-router";
import ShoppingCartPage from "./pages/ShoppingCartPage.vue";
import ProductsPage from "./pages/ProductsPage.vue";
import ProductDetailPage from "./pages/ProductDetailPage.vue";
import NotFoundPage from "./pages/NotFoundPage.vue";
import RegisterPage from "./pages/RegisterPage.vue";
import LoginPage from "./pages/LoginPage.vue";

createApp(App)
  .use(
    VueRouter.createRouter({
      history: VueRouter.createWebHistory(),
      routes: [
        { path: "/products", component: ProductsPage },
        { path: "/cart", component: ShoppingCartPage },
        { path: "/register", component: RegisterPage },
        {
          path: "/login",
          component: LoginPage,
          beforeEnter: (to, from, next) => {
            if (localStorage.getItem("token")) {
              next({ path: "/products" });
            } else {
              next();
            }
          },
        },
        { path: "/products/:id", component: ProductDetailPage },
        { path: "/:pathMatch(.*)*", component: NotFoundPage },
      ],
    })
  )
  .mount("#app");
