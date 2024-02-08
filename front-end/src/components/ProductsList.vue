<template>
  <div class="grid-wrap">
    <div class="product-item" v-for="product in products" :key="product.id">
      <img :src="product.imageName" />
      <h3>{{ product.name }}</h3>
      <p>{{ product.price }}</p>
      <router-link :to="`/products/${product.id}`">
        <button>View Details</button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductsList",
  props: {
    products: {
      type: Array,
      required: true,
    },
  },
};
</script>
