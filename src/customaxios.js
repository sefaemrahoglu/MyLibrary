import axios from "axios";

const instance = axios.create({
    baseURL : "https://mylibrary-56425.firebaseio.com"
})

export default instance;