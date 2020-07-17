import VueRouter from "vue-router"
import Vue from 'vue'
import AddBook from "./components/pages/AddBook";
import BookDetails from "./components/pages/BookDetails";
import Books from "./components/pages/Books";
import EditBook from "./components/pages/EditBook";
import SignUp from "./components/pages/SignUp";
import SignIn from "./components/pages/SignIn";
import TopRatedBooks from "./components/pages/TopRatedBooks";
import Profile from "./components/pages/Profile";
import Lists from "./components/pages/Lists";
import store from "./store/store";

Vue.use(VueRouter);


export const router = new VueRouter({
  routes : [
    { path : "/", component : Books, name: "books"},
    { path : "/add-book", component : AddBook, name: "addBook",
    beforeEnter(to,from,next) {
      if (store.getters.getToken) {
          next()
      } else {
          next("/sign-in")
      }
  }
  },
    { path : "/book-details/:key/:title", component :BookDetails, name: "bookDetails"},
    { path : "/edit-book/:key/:title", component :EditBook, name:"editBook",
    beforeEnter(to,from,next) {
      if (store.getters.getToken) {
          next()
      } else {
          next("/")
      }
  }},
    { path : "/sign-in", component :SignIn, name:"signin"},
    { path : "/sign-up", component :SignUp, name:"signup"},
    { path : "/top-rated", component :TopRatedBooks, name : "topRated"},
    { path : "/profile", component :Profile, name:"profile"},
    { path : "/lists", component :Lists, name:"lists"},
    { path : "*", redirect : "/"}
  ],
  mode: "hash"
})