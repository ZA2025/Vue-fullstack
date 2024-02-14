<template>
  <div class="nav-bar">
    <router-link to="/products" class="product-link">
      <div class="logo-wrap">
        <img :src="logo" />
      </div>
    </router-link>
    <div class="cart-link-container">
      <router-link to="/cart" class="cart-link">
        <button class="cart-button">Cart</button>
      </router-link>
      <router-link to="/login" class="cart-link">
        <button class="cart-button" v-if="!isLoggedIn">Login</button>
      </router-link>
      <button class="cart-button" @click="logout" v-if="isLoggedIn">
        Logout
      </button>
    </div>
  </div>
</template>

<script>
import logo from "../assets/logo-hexagon.svg";
export default {
  name: "NavBar",
  data() {
    return {
      logo,
      isLoggedIn: !!localStorage.getItem("token"),
    };
  },
  components: {},
  methods: {
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      localStorage.removeItem("userId");
      this.isLoggedIn = false;
      this.$router.push("/login");
    },
    login() {
      // Your login logic here
      // After successful login, set isLoggedIn to true
      this.isLoggedIn = true;
      this.$router.push("/proqucts");
    },
  },
  watch: {
    $route: function () {
      this.isLoggedIn = !!localStorage.getItem("token");
    },
  },
};
</script>
