import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AccountService from "../service/AccountService";
// import Validation from "./Validation";

function AddAcct() {

    const [accountNo, setaccountNo] = useState('')
    const [name, setname] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const history = useNavigate();
    const { id } = useParams()

    const [error, seterror] = useState({
        accountNo:false,
        firstname:'',
        lastname:'',
        email:false,
        phoneno:''
    })

    function accountNohandler(){
        if(accountNo.match("^[0-9]{4,6}$")){
           seterror({...error,accountNo:true})
        }else if(accountNo.length <3 || accountNo.length >6){
            seterror({...error, accountNo:true})
        }else{
            seterror({...error, accountNo:false})
        }
        
        console.log(error)
    }

    function firstnamehandler(){
        
        if(!name.match("^[a-zA-Z]+$")){
            seterror({...error, firstname:"Invalid name"})
        }
        else{
            seterror({...error, firstname:''})
        }
        
    }

    function lastnamehandler(){
        
        if(!lastname.match("^[a-zA-Z]+$")){
            seterror({...error, lastname:"Invalid name"})
        }
        else{
            seterror({...error, lastname:''})
        }
        
    }

    function emailhandler(){
        if(!email.match("[A-Za-z0-9]{1,}@[a-z]{1,}\\.[a-z]{1,}")){
            seterror({...error, email:true})
        }else{
            seterror({...error, email:false})
        }
        console.log(error)
    }

    function phonehandler(){
        if(!phone.match("(0/91)?[7-9][0-9]{8}")){
            seterror({...error, phoneno:"invalid"})
        }else{
            seterror({...error, phoneno:''})
        }
    }

    const saveAcct = (e) => {
        e.preventDefault();

        const account = { accountNo, name, lastname, email, phone }

        if(accountNo ==='' || name === '' || lastname === '' || email === '' || phone===''){
            alert("please fill all fields!")
        }


        if (id) {

            AccountService.updateAccount(id, account).then(r => {
                history('/')

            }).catch(e => {
                console.log(e)
            })

        } else {
            AccountService.createAccount(account).then(r => {
                console.log(r.data)
                history('/')

            }).catch(err => {
                console.log(err)
            });

        }
    }

    useEffect(() => {

        AccountService.getByID(id).then(r => {
            setaccountNo(r.data.accountNo)
            setname(r.data.name)
            setLastname(r.data.lastname)
            setEmail(r.data.email)
            setPhone(r.data.phone)
        }).catch(e => {
            console.log(e)
        })

    }, [id])

    return (
        <div>
            <div>
                <form>
                    <div className="form-row">
                    <div className="col">
                            <input type="text" className="form-control" placeholder="Enter Account No" name="AccountNo" value={accountNo} onChange={e => {setaccountNo(e.target.value);accountNohandler()}} />
                            {/* {error.accountNo && <p style={{color:"red"}}>{error.accountNo}</p>} */}
                            {error.accountNo ? <p style={{color:"red"}}>invalid</p> : null}
                        </div>
                        <div className="col">
                            <input type="text" className="form-control" placeholder="Enter first name" name="firstname" value={name} onChange={e => {setname(e.target.value);firstnamehandler()}} />
                            {error.firstname && <p style={{color:"red"}}>{error.firstname}</p>}
                            {/* {error.firstname ? <p style={{color:"red"}}>Required</p> : null} */}
                        </div>
                        <div className="col">
                            <input type="text" className="form-control" placeholder="Enter lastname" name="lastname" value={lastname} onChange={e => {setLastname(e.target.value);lastnamehandler()}} />
                            {error.lastname && <p style={{color:"red"}}>{error.lastname}</p>}
                        </div>
                        <div className="col">
                            <input type="text" className="form-control" placeholder="Enter email" name="email" value={email} onChange={e => {setEmail(e.target.value);emailhandler()}} />
                            {/* {error.email && <p style={{color:"red"}}>{error.email}</p>} */}
                            {error.email ? <p style={{color:"red"}}>Invalid</p> : null}
                        </div>
                        <div className="col">
                            <input type="text" className="form-control" placeholder="Enter Phone no" name="phoneNo" value={phone} onChange={e => {setPhone(e.target.value);phonehandler()}} />
                            {error.phoneno && <p style={{color:"red"}}>{error.phoneno}</p>}
                        </div>
                        <button type="submit" onClick={e => {saveAcct(e)}} className="btn btn-success">Submit</button>
                        <Link to={'/'} className="btn btn-danger">Cancel</Link>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default AddAcct;