<template>
  <div>
    <h1>Products</h1>
    <div class="grid-wrap">
      <products-list :products="products" />
    </div>
  </div>
</template>

<script>
//import { products } from "../temp-data";
import ProductsList from "@/components/ProductsList.vue";
import axios from "axios";
export default {
  name: "ProductsPage",
  data() {
    return {
      products: [],
      email: localStorage.getItem("email"),
    };
  },
  components: {
    ProductsList,
  },
  async created() {
    try {
      const response = await axios.get(
        "https://vue-project-b2kl.onrender.com/api/products"
      );
      this.products = response.data;
    } catch (error) {
      console.error("There was an error!", error);
    }
  },
};
</script>
