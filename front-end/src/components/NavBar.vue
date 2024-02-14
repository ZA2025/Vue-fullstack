<template>
  <div class="nav-bar">
    <router-link to="/products" class="product-link">
      <div class="logo-wrap">
        <img :src="logo" />
      </div>
    </router-link>
    <div class="cart-link-container">
      <router-link to="/cart" class="cart-link">
        <button class="cart-button" v-if="isLoggedIn">Cart</button>
      </router-link>
      <router-link to="/login" class="cart-link">
        <button class="cart-button" v-if="!isLoggedIn">Login</button>
      </router-link>
      <button class="cart-button" @click="logout" v-if="isLoggedIn">
        Logout
      </button>
      <span class="userName" v-if="email">Hi, {{ this.email }}</span>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import logo from "../assets/logo-hexagon.svg";
export default {
  name: "NavBar",
  data() {
    return {
      logo,
      isLoggedIn: !!localStorage.getItem("token"),
      email: localStorage.getItem("email"),
    };
  },
  components: {},
  methods: {
    async logout() {
      try {
        const response = await axios.post("/api/logout");
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        localStorage.removeItem("userId");
        this.isLoggedIn = false;
        this.$router.push("/login");
        console.log(response);
      } catch (error) {
        console.error("There was an error!", error);
      }
    },
    async login() {
      try {
        const response = await axios.post("/api/login", {
          email: this.email,
          password: this.password,
        });
        if (response.data.message === "Sign in successful") {
          console.log(response.data);
          // Save the token in local storage
          console.log(response.data);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("email", response.data.user.email);
          localStorage.setItem("userId", response.data.user.id);
          //how to use the token to decide the user is logged in or not
          this.$router.push("/products");
        } else {
          alert("Invalid email or password.");
        }
      } catch (error) {
        console.error("There was an error!", error);
      }
    },
  },
  watch: {
    $route: function () {
      this.isLoggedIn = !!localStorage.getItem("token");
      this.email = localStorage.getItem("email");
    },
  },
};
</script>
