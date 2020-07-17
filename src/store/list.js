import customaxios from "../customaxios";

const state = {
    readList: [],
    readLaterList: []

}
const getters = {
    getReadList(state) {
        return state.readList
    },
    getReadLaterList(state) {
        return state.readLaterList
    }

}
const mutations = {
    updateReadList(state, read) {
        state.readList.push(read)
    },
    updateReadLaterList(state, readlater) {
        state.readLaterList.push(readlater)
    }

}
const actions = {
    addReadList(vuexContext, payload) {
        console.log(payload);

        customaxios.post("/readlist.json", payload)
            .then(response => {
                setTimeout(() => {
                    customaxios.patch("/readlist/" + response.data.name + ".json", { key: response.data.name })
                }, 1000)
            })
    },
    deleteAtReadList(vuexContext, payload) {
        console.log(payload);
        customaxios.delete("/readlist/" + payload + ".json")

    },

    getReadInfoFromDatabase(vuexContext, payload) {
        console.log(payload);
        state.readList = []
        customaxios.get("/readlist.json")
            .then(response => {
                let data = response.data
                for (let key in data) {
                    data[key].key = key
                    let x = payload.bookId === data[key].bookId
                    let y = payload.userId === data[key].userId
                    if (x === true && y === true) {
                        vuexContext.commit("updateReadList", data[key])
                    }
                }
            })
    },
    getReadListFromDatabase(vuexContext, payload) {
        console.log(payload);
        state.readList = []
        customaxios.get("/readlist.json")
            .then(response => {
                let data = response.data
                for (let key in data) {
                    data[key].key = key
                    let x = payload === data[key].userId
                    if (x === true) {
                        vuexContext.commit("updateReadList", data[key])
                    }
                }
            })
    },
    addReadLaterList(vuexContext, payload) {
        console.log(payload);

        customaxios.post("/readlaterlist.json", payload)
            .then(response => {
                setTimeout(() => {
                    customaxios.patch("/readlaterlist/" + response.data.name + ".json", { key: response.data.name })

                }, 1000)
            })
    },
    deleteAtReadLaterList(vuexContext, payload) {
        console.log(payload);
        customaxios.delete("/readlaterlist/" + payload + ".json")

    },
    getReadLaterInfoFromDatabase(vuexContext, payload) {
        console.log(payload);
        state.readLaterList = []
        customaxios.get("/readlaterlist.json")
            .then(response => {


                let data = response.data
                for (let key in data) {
                    data[key].key = key
                    let x = payload.bookId === data[key].bookId
                    let y = payload.userId === data[key].userId
                    if (x === true && y === true) {
                        vuexContext.commit("updateReadLaterList", data[key])
                    }
                }
            })
    },
    getReadLaterListFromDatabase(vuexContext, payload) {
        console.log(payload);
        state.readLaterList = []
        customaxios.get("/readlaterlist.json")
            .then(response => {
                //console.log(response);
                let data = response.data
                for (let key in data) {
                    data[key].key = key
                    let x = payload === data[key].userId
                    if (x === true) {
                        vuexContext.commit("updateReadLaterList", data[key])
                    }
                }
            })
    },
}
export default {
    state,
    getters,
    mutations,
    actions
}