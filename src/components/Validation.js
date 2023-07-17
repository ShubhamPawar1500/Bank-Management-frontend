export default function Validation(values) {
    const errors = {}

    if(values.accountNo === ''){
        errors.accountNo = "Account No Required"
    }

    if(values.name === ''){
        errors.name = "Name Required"
    } 

    if(values.lastname === ''){
        errors.lastname = "lastname Required"
    }

    if(values.email === ''){
        errors.email = "Email Required"
    }

    if(values.phone === ''){
        errors.phone = "Phone number Required"
    }

}