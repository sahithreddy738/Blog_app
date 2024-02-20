import { API, SECURE_API } from "."


export const loadAllCategories=async() =>{
     try {
        const response=await API.get(`api/categories/`);
        return response.data;
     } catch (error) {
        throw error;
     }
}

export const getCategoryById=async(categoryId)=>{
   try {
      const response=await SECURE_API.get(`api/categories/${categoryId}`);
      return response.data;
   } catch (error) {
      throw error;
   }
}