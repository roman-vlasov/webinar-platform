import axios from 'axios'

const instance = process.env.VUE_APP_API_BASE_URL
    ? axios.create({
      baseURL: process.env.VUE_APP_API_BASE_URL,
      withCredentials: true,
      headers: { 'Access-Control-Allow-Credentials': true }
    })
    : axios.create({ withCredentials: true })

export default instance