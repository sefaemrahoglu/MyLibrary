import customaxios from "../customaxios";
import axios from "axios";
import { router } from "../router";

const state = {

    token: "",
    users: []
}
const getters = {
    getToken(state) {
        return state.token !== ''

    },
    getUser(state) {
        return state.users
    }
}
const mutations = {
    setToken(state, token) {
        state.token = token

    },
    clearToken(state) {
        state.token = ''
    },
    updateUser(state, user) {
        state.users.push(user)
    }
}
const actions = {

    userDetail(vuexContext, payload) {

        customaxios.get("/users.json")
            .then(response => {
                let data = response.data
                for (let key in data) {
                    if (payload === response.data[key].userEmail) {
                        data[key].key = key
                        vuexContext.commit("updateUser", data[key])
                        break

                    }
                }
            })
    },
    loginToken(vuexContext, userData) {
        axios.post(
            "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA5vGhLAqBRC9napyjSRwhYHRSf-0bFMiQ",
            {
                email: userData.email,
                password: userData.password,
                returnSecureToken: true
            }
        ).then(response => {
            vuexContext.commit("setToken", response.data.idToken)
            localStorage.setItem("token", response.data.idToken)
            localStorage.setItem("email", response.data.email)
            router.replace("/")
        })
    },
    logOut(vuexContext) {
        state.users = []
        vuexContext.commit("clearToken")
        localStorage.removeItem("token")
        localStorage.removeItem("email")
        router.replace("/sign-in")
    },
    tokenControl(vuexContext) {
        let token = localStorage.getItem("token")
        if (token) {
            vuexContext.commit("setToken", token)
        } else {
            router.push("/")
        }
    },
}

export default {
    state,
    getters,
    mutations,
    actions
}
