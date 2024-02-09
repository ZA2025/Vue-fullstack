import { createApp } from "vue";
import App from "./App.vue";
import "./main.css";
import { createRouter, createWebHashHistory } from "vue-router";
import ShoppingCartPage from "./pages/ShoppingCartPage.vue";
import ProductsPage from "./pages/ProductsPage.vue";
import ProductDetailPage from "./pages/ProductDetailPage.vue";
import NotFoundPage from "./pages/NotFoundPage.vue";

createApp(App)
  .use(
    createRouter({
      history: createWebHashHistory(),
      routes: [
        { path: "/", component: ProductsPage },
        { path: "/cart", component: ShoppingCartPage },
        { path: "/products/:id", component: ProductDetailPage },
        { path: "/:pathMatch(.*)*", component: NotFoundPage },
      ],
    })
  )
  .mount("#app");
