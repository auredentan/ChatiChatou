import axios from "axios"

const client = axios.create({
    baseURL: process.env.NODE_ENV === "development" ? "http://localhost:8889" : window.location.origin
})

export default client