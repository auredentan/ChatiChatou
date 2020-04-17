import axios from "axios"

const client = axios.create({
    baseURL: process.env.NODE_ENV === "development" ? "http://localhost:8080" : window.location.origin
})

client.interceptors.response.use((response: any) => response, (error: any) => error?.response || {data: null, status: null})

export default client