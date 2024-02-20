<template>
  <div class="formContainer">
    <h1>Register here:</h1>
    <form @submit.prevent="register" class="registerForm">
      <div class="form-group">
        <label for="email">Email address</label>
        <input
          for="email1"
          type="email"
          v-model="email"
          placeholder="Email"
          class="form-control"
        />
        <div v-if="emailError" class="error">{{ emailError }}</div>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          v-model="password"
          placeholder="Password"
          class="form-control"
        />
        <div v-if="passwordError" class="error">{{ passwordError }}</div>
      </div>
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "RegisterPage",
  data() {
    return {
      email: "",
      password: "",
      emailError: "",
      passwordError: "",
    };
  },
  methods: {
    async register() {
      let hasError = false;
      this.emailError = "";
      this.passwordError = "";
      if (!this.email.includes("@")) {
        //alert("Please enter a valid email address.");
        this.emailError = "Please enter a valid email address.";
        hasError = true;
      }
      // Check if password is of sufficient length
      if (this.password.length < 8 || this.password === "") {
        //alert("Password must be at least 8 characters long.");
        this.passwordError = "Password must be at least 8 characters long.";
        hasError = true;
      }
      if (hasError) {
        return;
      }
      try {
        const response = await axios.get(`/api/users`);
        const users = response.data;
        const matchingUsers = users.filter((user) => user.email === this.email);
        if (matchingUsers.length > 0) {
          // If there are matching users, the email already exists
          this.emailError = "Email already registered.";
          return;
        } else {
          await axios.post("/api/users", {
            email: this.email,
            password: this.password,
          });
          alert("Registered!");
          // Clear the form
          this.email = "";
          this.password = "";
          // redirect to login page
          this.$router.push("/login");
        }
      } catch (error) {
        console.error("There was an error!", error);
      }
    },
  },
};
</script>
