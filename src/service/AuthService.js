import axios from "axios";


export const loginUser = (loginDetail) =>{
    return axios.post(`http://localhost:3030/auth/login`, loginDetail)
            .then(r => r.data)
}

export const isLoggedin = () =>{
    var login = localStorage.getItem('Token')
    if(login){
        return true
    }else{
        return false
    }
}

export const getToken = () =>{
    return JSON.parse(localStorage.getItem('Token'))
}

export const privateAxios = axios.create({
    baseURL:'http://localhost:3030/bank'
})

privateAxios.interceptors.request.use(config =>{
    const token = getToken()
    console.log(token)
    if(token){
        config.headers.Authorization = `Bearer ${token}`
        return config
    }
})