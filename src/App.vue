<template>
  <div>
    <app-Header></app-Header>
    <router-view></router-view>
    <app-Footer></app-Footer>
  </div>
</template>

<script>
import Header from "./components/shared/Header";
import Footer from "./components/shared/Footer";

export default {
  components: {
    appHeader: Header,
    appFooter: Footer
  },
  created() {
    this.$store.dispatch("tokenControl");
  }
};
</script>

<style>
body {
  background-color: #e8e4e1;
}
</style>