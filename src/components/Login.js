import React, { useState } from "react";
import { loginUser } from "../service/AuthService";
import {  useNavigate } from "react-router-dom";
import { doLoggin } from "../Auth/Index";
import { toast } from "react-toastify";

function Login(){

    const [LoginDetail, setLoginDetail] = useState({
        username:'',
        password:''
    })

    const history = useNavigate();

    const LoginHandler = (event, field) =>{
        let value = event.target.value;
        setLoginDetail({
            ...LoginDetail, 
            [field]:value
        })

    }

    const resetHandler = () =>{
        setLoginDetail({
            username:'',
            password:''
        })
    }

    const submitHandler = (event) =>{
        event.preventDefault();

        if(LoginDetail.username.trim()==='' || LoginDetail.password.trim()===''){
            toast.warn('username and password required')
        }else{        

        loginUser(LoginDetail)
        .then(data =>{
            console.log("user Login: ")
            console.log(data)
            doLoggin(data)
            toast.success('login successful')
            history('/home')
        })
            
        .catch(e => {
            console.log(e)
            if(e.code === "ERR_BAD_REQUEST"){
                toast.error('Invalid username and password')
            }
            else{
                toast.warn('Something went wrong !!')
            }
        })
        }
    }


    return(

        <>
            <div className="card">
                <div className="card-header">
                    <h2 className="text-center">Login Form</h2>
                </div>
                <div className="card-body">
                    <form
                            className="form-horizontal"
                            onSubmit={e => submitHandler(e)}
                    >
                        <div className="form-group mb-3">
                            <label className="control-label"> Username</label>
                            <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter username"
                                    value={LoginDetail.username}
                                    onChange={e => LoginHandler(e, 'username')}
                            />
                        </div>

                        <div className="form-group mb-3">
                            <label className="control-label"> Password</label>
                            <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Enter password"
                                    value={LoginDetail.password}
                                    onChange={e => LoginHandler(e, 'password')}
                            />
                        </div>
                        <div className="form-group mb-3">
                            <button type="submit" className="btn btn-primary" >Submit</button>
                            <button onClick={resetHandler} type="button" className="btn btn-primary">Reset</button>
                            
                        </div>
                    </form>
                    <div>
                        <p>Register <a href="/register">here</a></p>
                    </div>
                </div>
            </div>
        
        </> 
    )
}

export default Login;