<template>
  <div>
    <h1>Shopping Cart</h1>
    <div v-if="cartItems.length > 0">
      <shopping-cart-list
        :cartItems="cartItems"
        @remove-from-cart="removeFromCart($event)"
      />
      <button v-if="cartItems.length != 0" class="checkout-button">
        Checkout
      </button>
    </div>
    <div v-if="cartItems.length === 0">
      You current have no items in your cart!
    </div>
  </div>
</template>

<script>
import ShoppingCartList from "@/components/ShoppingCartList.vue";
//import axios from "axios";
import api from "../api.js";
export default {
  name: "ShoppingCartPage",
  data() {
    return {
      cartItems: [],
      userId: localStorage.getItem("userId"),
    };
  },
  methods: {
    async removeFromCart(id) {
      try {
        const response = await api.delete(
          `/api/users/${this.userId}/cart/${id}`
        );
        const cartItems = response.data;
        this.cartItems = cartItems.filter((item) => item !== null);
      } catch (error) {
        console.error("There was an error!", error);
      }
    },
  },
  components: {
    ShoppingCartList,
  },
  async created() {
    // check cart items
    const response = await api.get(`/api/users/${this.userId}/cart`);
    const cartItems = response.data;
    if (cartItems !== null) {
      this.cartItems = cartItems.filter((item) => item !== null);
      console.log(this.cartItems);
    }
  },
};
</script>
