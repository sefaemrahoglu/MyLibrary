import customaxios from "../customaxios";

const state = {
    books: [],
    bookDetails: [],
}
const getters = {
    getBooks(state) {
        return state.books;

    },
    getBookDetails(state) {
        return state.bookDetails
    },

}
const mutations = {
    updateBookList(state, book) {
        state.books.push(book);
    },
    setDetailBook(state, payload) {
        state.bookDetails = payload;
    },

}
const actions = {
    getBooksFromDatabase({ commit }) {
        state.books = []
        customaxios.get("/books.json")
            .then(response => {
                let data = response.data;
                for (let key in data) {
                    data[key].key = key;
                    commit("updateBookList", data[key]);
                }
            })

    },
    getBookWithKey(VuexContext, payload) {
        state.bookDetails = []
        customaxios.get("/books/" + payload + ".json")
            .then(response => {
                let data = response.data
                VuexContext.commit("setDetailBook", data)
            })
    },
    sendRating(vuexContext, payload) {
        console.log(payload);
        customaxios.get("/books.json")
            .then(response => {
                let data = response.data;


                for (let key in data) {
                    if (payload.bookId === response.data[key].title) {


                        let rating = response.data[key].rating
                        let count = response.data[key].votecounter
                        count = response.data[key].votecounter + 1
                        rating = (response.data[key].rating + payload.rating) / count
                        rating = rating.toFixed(1)
                        customaxios
                            .put("/books/" + response.data[key].key + "/rating.json", rating)
                        customaxios
                            .put("/books/" + response.data[key].key + "/votecounter.json", count)
                    }
                }
            })
    },
    updateRating(vuexContext, payload) {
        console.log("a", payload);
        customaxios.get("/books.json")
            .then(response => {
                let data = response.data;
                console.log(data);
                for (let key in data) {
                    if (payload.updatebookId === response.data[key].title) {
                        console.log(response.data[key].title);
                        let rating = response.data[key].rating
                        let count = response.data[key].votecounter
                        console.log(rating);
                        console.log(count);
                        console.log(((rating * count) + payload.newrating - payload.oldrating) / count);
                        rating = ((rating * count) + payload.newrating - payload.oldrating) / count


                        rating = rating.toFixed(1)
                        console.log(rating);
                        console.log(response.data[key].key);
                        customaxios
                            .put("/books/" + response.data[key].key + "/rating.json", rating)
                            .then(response=>{
                                console.log(response);
                            })

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
