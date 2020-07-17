import Vue from "vue";
import Vuex from "vuex";
import book from "./book";
import user from "./user"
import review from "./review"
import list from "./list"
Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        book,
        user,
        review,
        list
    }


})
export default store