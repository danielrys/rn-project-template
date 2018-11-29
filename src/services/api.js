// @flow
import axiosLib from "axios"

export const axios = axiosLib.create({
  baseURL: "@TODO",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
})

export const sendToken = (token: string) => axios.post("/@TODO", { token })
