"use client"
import axios from "axios"


axios.defaults.baseURL = `http://localhost:4080`
axios.defaults.withCredentials = true


const strictEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,63}$/;


export const fullNameValidation = (fullname: string): boolean => {
    if (!fullname || typeof fullname !== "string" || fullname.length < 3) 
        return false;
    return true;
}

export const emailValidation = (email: string): boolean => {
    if (!email || typeof email !== "string" || !strictEmailRegex.test(email)) 
        return false;
    return true;
}

export const passwordValidation = (password: string): boolean => {
    if (!password || typeof password !== "string" || password.length < 5 )
        return false;
    return true;
}

export const categories = [
    "All",
    "Unread",
    "Favorites",
    "Groups",
]

export default axios