<template>
  <div>
    <div
      class="product-container"
      v-for="product in cartItems"
      :key="product.id"
    >
      <img class="product-image" :src="product.imageName" />
      <div class="details-wrap">
        <h3>{{ product.name }}</h3>
        <p>{{ product.price }}</p>
      </div>
      <button
        @click="$emit('remove-from-cart', product.id)"
        class="remove-button"
      >
        Remove from Cart
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShoppingCartList",
  props: {
    cartItems: {
      type: Array,
      required: true,
    },
  },
};
</script>
