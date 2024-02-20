export const doLogin=(userData,navigate)=>{
   localStorage.setItem("data",JSON.stringify(userData));
   navigate();
}

export const isLoggedIn=() =>{
    const userData=localStorage.getItem("data");
    if(userData!=null) return true
    else return false;
}

export const getCurrentUserDetails=() =>{
   if(isLoggedIn()) {
    return JSON.parse(localStorage.getItem("data")).user;
   }else {
    return undefined;
   }
}

export const doLogout=(navigate) =>{
    localStorage.removeItem("data");
    localStorage.clear();
    navigate();
}

export const getToken=() =>{
    if(isLoggedIn()) {
        return JSON.parse(localStorage.getItem("data")).token;
       }else {
        return undefined;
       }
}