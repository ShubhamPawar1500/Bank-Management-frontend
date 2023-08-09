import React, { useEffect, useState } from "react";
import AccountService from "../service/AccountService";
import HeaderComponenet from "./HeaderComponenet";
import { isLoggedin } from "../service/AuthService";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Users(){

    const [userDetail, setuserDetail] = useState({})
    const [pwd, setpwd] = useState(false)
    const [password, setpassword] = useState('')
    const redirect = useNavigate()

    const pwdHandler = () =>{
        setpwd(true)
    }

    const pwdChangeHandler = (event) =>{
        event.preventDefault();
        console.log(password)
        
        AccountService.changePWD(userDetail.id, password).then(r => {
            console.log(r)
            toast.success(r.data)
            redirect('/home')
        })
        .catch(e => {
            console.log(e)
        })

    }

    useEffect(() =>{
        AccountService.getUsers().then(r =>{
            setuserDetail(r.data)
            console.log(r)
        })
        .catch(e => {
            console.log(e)
        })
    },[])



    return(

        isLoggedin() ?

        <div>
            <HeaderComponenet />
            <h2>Name : {userDetail.name}</h2>
            <h2>Email : {userDetail.email}</h2>
            <h2>Role : {userDetail.role}</h2>
            <div>
                <button className="btn btn-primary" onClick={() => pwdHandler()}>change password</button>

            </div>
            <br></br>
            <div>
                {pwd ? 
                <div className="form-group mb-3">
                    <form onSubmit={e => pwdChangeHandler(e)}>
                <label className="control-label"> New Password</label>
                <input
                        type="password"
                        className="form-control"
                        placeholder="Enter new password here.."
                        value={password}
                        onChange={e => setpassword(e.target.value)}
                />
                <button type="submit">OK</button>
                </form>
            </div>
                : null }
            </div>
        </div> 
        
        :

        <Navigate to={'/'} />
    )

}

export default Users;