import axios from "axios"

const GET_URL = "http://localhost:3030/fetch"
const POST_URL = "http://localhost:3030/save"

class AccountService {

    getAccount(){
        return axios.get(GET_URL);
    }

    createAccount(acct){
        return axios.post(POST_URL, acct);
    }

    getByID(id){
        return axios.get(`http://localhost:3030/fetch/${id}`);
    }

    updateAccount(id, account){
        return axios.put(`http://localhost:3030/update/${id}`, account);
    }

    deleteAccount(id){
        return axios.delete(`http://localhost:3030/del/${id}`);
    }

}

export default new AccountService();