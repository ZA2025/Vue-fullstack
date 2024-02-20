const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === 'production'
    ? '/products/'
    : '/',
  transpileDependencies: true,
  devServer: {
    proxy: "http://localhost:8000",
  },
});