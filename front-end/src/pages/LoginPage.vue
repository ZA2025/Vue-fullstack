<template>
  <div class="formContainer">
    <h1>Login here:</h1>
    <form @submit.prevent="login" class="loginForm">
      <span>test@test.com</span>
      <input type="text" v-model="email" placeholder="email" required />
      <span>test1234</span>
      <input
        type="password"
        v-model="password"
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
      <router-link to="/register" class="cart-link">
        <a href="/login" class="login-link">Register</a>
      </router-link>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "LoginPage",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
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
};
</script>
