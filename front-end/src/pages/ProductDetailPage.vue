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
  </div>
  <div v-else>
    <NotFoundPage />
  </div>
</template>

<script>
import NotFoundPage from "./NotFoundPage.vue";
import axios from "axios";

export default {
  name: "productDetailPage",
  data() {
    return {
      product: {},
      cartItems: [],
    };
  },
  computed: {
    itemIsInCart() {
      return this.cartItems.some(
        (item) => item !== null && item.id === this.$route.params.id
      );
    },
  },
  methods: {
    async addToCart() {
      try {
        await axios.post(`/api/users/12345/cart`, {
          id: this.$route.params.id,
        });
        alert("Added to cart!");
      } catch (error) {
        console.error("There was an error!", error);
      }
    },
  },
  components: {
    NotFoundPage,
  },
  async created() {
    try {
      const response = await axios.get(
        `/api/products/${this.$route.params.id}`
      );
      this.product = response.data;

      // cart items
      const cartResponse = await axios.get("/api/users/12345/cart");
      this.cartItems = cartResponse.data;
    } catch (error) {
      console.error("There was an error!", error);
    }
  },
};
</script>
