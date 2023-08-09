

export function doLoggin(data){

    if(data.username && data.jwtToken){
        
        localStorage.setItem("user", JSON.stringify(data.username));
        localStorage.setItem("Token", JSON.stringify(data.jwtToken));
    }
}

// export const setAuthToken = Token =>{
//     if(Token){
//         axios.defaults.headers.common["Authorization"] = `Bearer ${Token}`;
//     }else{
//         delete axios.defaults.headers.common["Authorization"];
//     }
// }

