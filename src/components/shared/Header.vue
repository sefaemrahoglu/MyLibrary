<template>
  <nav class="navbar navbar-expand-md navbar-dark text-right" style="background-color: #35495e">
    <router-link class="navbar-brand" tag="a" to="/">My Library</router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav mr-auto">
        <router-link class="nav-item" active-class="active" exact tag="li" to="/">
          <a class="nav-link">Books</a>
        </router-link>
        <router-link class="nav-item" active-class="active" tag="li" to="/add-book">
          <a class="nav-link">Add New Book</a>
        </router-link>
        <router-link class="nav-item" active-class="active" tag="li" to="/top-rated">
          <a class="nav-link">Top Rated Books</a>
        </router-link>
      </ul>
      <div class="float-right">
        <ul class="navbar-nav ml-auto nav-flex-icons">
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              id="navbarDropdownMenuLink-333"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <span class="glyphicon glyphicon-user"></span>
            </a>

            <div class="dropdown-menu dropdown-menu-right dropdown-default"  v-if="displayClass1">
              <a @click.prevent="userDetail" class="dropdown-item" href>Profile</a>
              
              <router-link class="dropdown-item" tag="a" to="/lists">Your Lists</router-link>
              <a @click.prevent="logout" class="dropdown-item" href>log Out</a>
            </div>
            <div class="dropdown-menu dropdown-menu-right dropdown-default" v-else>
              <router-link class="dropdown-item" tag="a" to="/sign-in">Sign in</router-link>
              <router-link class="dropdown-item" tag="a" to="/sign-up">Sign up</router-link>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { router } from "../../router";
export default {

  methods: {
    logout() {
      this.$store.dispatch("logOut");
    },
    userDetail(){
      
      router.push("/profile")
    }
  },
  computed : {
    displayClass1(){
      return this.$store.getters.getToken
      
    },
  },
  
};
</script>

<style>
</style>