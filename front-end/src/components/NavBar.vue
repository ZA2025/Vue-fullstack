<template>
  <div class="nav-bar">
    <router-link to="/" class="product-link">
      <div class="logo-wrap">
        <img :src="logo" />
      </div>
    </router-link>
    <router-link to="/cart" class="cart-link">
      <button class="cart-button">Cart</button>
    </router-link>
  </div>
</template>

<script>
import logo from "../assets/logo-hexagon.svg";
export default {
  name: "NavBar",
  data() {
    return {
      logo,
    };
  },
  components: {},
};
</script>
