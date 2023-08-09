
import axios from "axios"
import { privateAxios } from "./AuthService";

const GET_URL = "http://localhost:3030/bank/fetch"
// const POST_URL = "http://localhost:3030/bank/save"

let name = JSON.parse(localStorage.getItem('user'));

class AccountService {

    getAccount(){
        return axios.get(GET_URL,{
            headers:{
                Authorization:JSON.parse(localStorage.getItem('token'))
            }
        });
    }

    // createAccount(acct){
    //     return axios.post(POST_URL ,acct,{
    //         headers:{
    //             Authorization:"Bearer "+ JSON.parse(localStorage.getItem('Token'))
    //         }
    //     });
    // }

    createAccount(acct){
        return privateAxios.post(`/save`,acct)
    }

    getByID(id){
        return axios.get(`http://localhost:3030/bank/fetch/${id}`,{
            headers:{
                Authorization:"Bearer "+ JSON.parse(localStorage.getItem('Token'))
            }
        });
    }

    updateAccount(id, account){
        return axios.put(`http://localhost:3030/bank/update/${id}`, account,{
            headers:{
                Authorization:"Bearer "+ JSON.parse(localStorage.getItem('Token'))
            }
        });
    }

    deleteAccount(id){
        return axios.delete(`http://localhost:3030/bank/del/${id}`,{
            headers:{
                Authorization:"Bearer "+ JSON.parse(localStorage.getItem('Token'))
            }
        });
    }

    getUsers(){
        return axios.get(`http://localhost:3030/bank/user/${name}`,{
            headers:{
                Authorization:"Bearer "+ JSON.parse(localStorage.getItem('Token'))
            }
        });
    }

    changePWD(id, password){
        return axios.put(`http://localhost:3030/bank/changepwd/${id}/${password}`,null,{
            headers:{
                Authorization:"Bearer "+ JSON.parse(localStorage.getItem('Token'))
            }
        });
    }

}

export default new AccountService();