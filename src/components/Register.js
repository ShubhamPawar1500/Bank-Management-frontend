import axios from "axios";
import React, { useState } from "react";
import { loginUser } from "../service/AuthService";
import { doLoggin } from "../Auth/Index";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Register(){

    const history = useNavigate();

    const [userDetails, setuserDetails] = useState({
        name:'',
        passcode:'',
        email:''
    })

    const logDetail = {
        username:userDetails.name,
        password:userDetails.passcode
    }

    const RegisterHandler = (event, field) =>{
        let value = event.target.value;
        setuserDetails({
            ...userDetails, 
            [field]:value
        })

    }

    

    const submitHandler = (e) =>{
        e.preventDefault();

        if(userDetails.name.trim()==='' || userDetails.email.trim()==='' || userDetails.passcode.trim===''){
            toast.error('please fill all fields')
            //should add constants 
            //write logics into small functions
            //should use proper naming conventions
        }else if(!userDetails.name.match("^[a-zA-Z]+$")){
            toast.error('Invalid username')
        }else if(!userDetails.email.match("[A-Za-z0-9]{1,}@[a-z]{1,}\\.[a-z]{1,}")){
            toast.error('Invaid Email')
        }
        else{
        
        axios.post(`http://localhost:3030/auth/register`,userDetails)
        .then(r => {
            console.log(r)
            toast.success(r.data)
            loginUser(logDetail).then(data =>{
                doLoggin(data)
                history('/home')
            })
        })
        .catch(e =>{
            console.log(e)
        })
        }
    }


    return(
        <>

                    <form
                            className="form-horizontal"
                            onSubmit={e => submitHandler(e)}
                    >
                        <div className="form-group mb-3">
                            <label className="control-label" > Username</label>
                            <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter username"
                                    value={userDetails.name}
                                    onChange={e => RegisterHandler(e, 'name')}
                            />
                        </div>

                        <div className="form-group mb-3">
                            <label className="control-label"> Email</label>
                            <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Enter Email"
                                    value={userDetails.email}
                                    onChange={e => RegisterHandler(e, 'email')}
                            />
                        </div>
                        
                        <div className="form-group mb-3">
                            <label className="control-label"> Password</label>
                            <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Enter password"
                                    value={userDetails.passcode}
                                    onChange={e => RegisterHandler(e, 'passcode')}
                            />
                        </div>

                        <div className="form-group mb-3">
                            <button type="submit" className="btn btn-primary" >Submit</button>
                            
                        </div>
                    </form>


        </>
    )
}

export default Register