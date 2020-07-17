import customaxios from "../customaxios";
import { router } from "../router";

const state = {
    reviews: [],

}
const getters = {
    getReview(state) {
        return state.reviews
    }
}
const mutations = {
    updateReviews(state, review) {
        state.reviews.push(review);
    }
}
const actions = {
    sendReview(vuexContext, payload) {
        customaxios.post("/reviews.json", payload)
        setTimeout(()=>{
            router.go(0)
        },300)
    },
    updateReview(vuexContext, payload) {
        customaxios.put("/reviews/" +payload.key+ ".json", payload)
        //router.go(0)

    },
    getReviewsFromDatabase(vuexContext, payload) {
        state.reviews = []
        customaxios.get("/reviews.json")
            .then(response => {
                
                let data = response.data
                for (let key in data) {
                    if (payload === response.data[key].bookId) {
                        data[key].key = key
                        vuexContext.commit("updateReviews", data[key])
                    }
                }


            })
    }
}
export default {
    state,
    getters,
    mutations,
    actions
}