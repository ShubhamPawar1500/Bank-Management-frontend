import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import AccountService from "../service/AccountService";
import { isLoggedin } from "../service/AuthService";
import HeaderComponenet from "./HeaderComponenet";
import { toast } from "react-toastify";

function AccountList() {
    var [acct, setAcct] = useState([])



    useEffect(() => {
        axios.get(`http://localhost:3030/bank/fetch`,{
            headers:{
                Authorization:"Bearer "+ JSON.parse(localStorage.getItem('Token')),
                "Content-Type":'application/json'      
            }
        })
            .then(r => {
                console.log(r)
                setAcct(r.data)
                
            })
            .catch(e => {
                console.log(e)
                
            })
    }, [])

    const deleteAcct = (acctNo) => {
        AccountService.deleteAccount(acctNo).then(r => {
            axios.get(`http://localhost:3030/bank/fetch`,{
                headers:{
                    Authorization:"Bearer " + JSON.parse(localStorage.getItem('Token'))
                }
            })
                .then(r => {
                    console.log(r)
                    toast.success('account deleted')
                    setAcct(r.data)
                })
                .catch(e => {
                    console.log(e)
                })
        }).catch(e => {
            console.log(e)
        })
    }

    const searchHandler = (value) =>{
        
        fetch(`http://localhost:3030/bank/fetch`,{
            headers:{
                Authorization:"Bearer "+JSON.parse(localStorage.getItem('Token'))
            }
        }).then(r => r.json())
        .then((json) => {
            const Result = json.filter((user)=>{
                return user && 
                (user.name || user.lastname) && 
                (user.name.toLowerCase().includes(value) || user.lastname.toLowerCase().includes(value));
            })
            setAcct(Result);
        })

    }
    

    return (


        isLoggedin() ?
        
        <div> 
            <HeaderComponenet search={searchHandler} />
            <h2 className="text-center">Bank Accounts</h2>
            <br/>
            {/* <form className="d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={e => searchHandler(e.target.value)} />
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form> */}
            <Link to={"/add-acct"} className="btn btn-primary">Add Acccount</Link>
            <br/>
            <div className="row">
                <table className="table-table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Account No</th>
                            <th>First_Name</th>
                            <th>Last_Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            acct.map(
                                account =>
                                    <tr key={account.id}>
                                        <td>{account.accountNo}</td>
                                        <td>{account.name}</td>
                                        <td>{account.lastname}</td>
                                        <td>{account.email}</td>
                                        <td>{account.phone}</td>
                                        <td>
                                            <Link to={`/update-acct/${account.id}`} className="btn btn-primary">update</Link>
                                            <button className="btn btn-danger" onClick={() => deleteAcct(account.id)}>Delete</button>
                                        </td>

                                    </tr>

                            )
                        }
                    </tbody>
                </table>
            </div>

        </div> :

        <Navigate to={'/'} />
    )
}

export default AccountList