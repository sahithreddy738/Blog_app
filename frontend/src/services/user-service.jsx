import { API } from "."

export const registerUser= async (user) =>{
    try {
        const response=await API.post("/api/auth/register",user);
        return response.data;
    } catch (error) {
       throw error;
    }
}

export const loginUser=async(loginDetails) =>{
    try {
        const response=await API.post("/api/auth/login",loginDetails);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getUser= async(userId) =>{
    try {
        const response=await API.get(`api/users/${userId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}