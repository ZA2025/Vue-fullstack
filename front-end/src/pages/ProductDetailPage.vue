<template>
  <div v-if="product">
    <div class="img-wrap">
      <img :src="product.imageName" />
    </div>
    <div class="product-details">
      <h1>{{ product.name }}</h1>
      <h3 class="price">{{ product.price }}</h3>
      <button @click="addToCart" class="add-to-cart" v-if="!itemIsInCart">
        Add to Cart
      </button>
      <button class="grey-button" v-if="itemIsInCart">
        Item already in card
      </button>
    </div>
    <div class="notificationMsg" v-if="message.length > 0">{{ message }}</div>
  </div>
  <div v-else>
    <NotFoundPage />
  </div>
</template>

<script>
import NotFoundPage from "./NotFoundPage.vue";
//import axios from "axios";
import api from "../api.js";
export default {
  name: "productDetailPage",
  data() {
    return {
      product: {},
      cartItems: [],
      userId: localStorage.getItem("userId"),
      message: "",
    };
  },
  methods: {
    async addToCart() {
      if (!this.isLoggedIn) {
        alert("You must be logged in to add items to the cart!");
        return;
      } else {
        try {
          await api.post(`/api/users/${this.userId}/cart`, {
            id: this.$route.params.id,
          });
          //alert("Added to cart!");
          this.message = "Added to cart!";
          // push to cartIems
          this.cartItems.push({ id: this.$route.params.id });
        } catch (error) {
          console.error("There was an error!", error);
        }
      }
    },
  },
  computed: {
    isLoggedIn() {
      return !!localStorage.getItem("token");
    },
    itemIsInCart() {
      console.log(this.cartItems);
      console.log(this.$route.params.id);
      const result = this.cartItems.some(
        (item) => item !== null && item.id === this.$route.params.id
      );
      console.log(result);
      return result;
    },
  },
  components: {
    NotFoundPage,
  },
  async created() {
    try {
      const response = await api.get(`/api/products/${this.$route.params.id}`);
      this.product = response.data;
      const cartResponse = await api.get(`/api/users/${this.userId}/cart`);
      this.cartItems = cartResponse.data;
    } catch (error) {
      console.error("There was an error!", error);
    }
  },
};
</script>
