import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import AccountService from "../service/AccountService";
// import AccountService from "../service/AccountService";

function AccountList() {
    var [acct, setAcct] = useState([])
    const navigate = useNavigate()

    // useEffect(() => {
    //     getAcct();
    // },[])

    // const getAcct = () =>{
    //     AccountService.getAccount().then((r) => {
    //         setAcct(r.data)
    //         console.log(r.data)
    //     });
    // };

    useEffect(() => {
        axios.get(`http://localhost:3030/fetch`)
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
            axios.get(`http://localhost:3030/fetch`)
                .then(r => {
                    console.log(r)
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
        // var Result = acct.filter((user)=>{
        //     return(
                
        //         user &&
        //         (user.name || user.lastname) &&
        //         (user.name.toLowerCase().includes(value) || user.lastname.toLowerCase().includes(value))
                
        //     );
            
        // });
        // console.log(Result)
        // setAcct(Result)
        fetch(`http://localhost:3030/fetch`).then(r => r.json())
        .then((json) => {
            const Result = json.filter((user)=>{
                return user && 
                (user.name || user.lastname) && 
                (user.name.toLowerCase().includes(value) || user.lastname.toLowerCase().includes(value));
            })
            setAcct(Result);
            console.log(Result);
        })



    }

    return (

        <div>
            <h2 className="text-center">Bank Accounts</h2>
            <br/>
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" onChange={e => searchHandler(e.target.value)}></input>
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

        </div>
    )
}

export default AccountList