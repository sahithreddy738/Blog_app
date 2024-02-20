import { API, SECURE_API } from ".";

export const savePost = async (postData) => {
  try {
    const response = await SECURE_API.post(
      `api/posts/?userId=${postData.userId}&categoryId=${parseInt(
        postData.categoryId
      )}`,
      postData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllPosts = async (pageNumber, pageSize) => {
  try {
    const response = await API.get(
      `api/posts/?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=addedDate&sortDir=desc`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getPostById = async (id) => {
  try {
    const response = await API.get(`api/posts/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const saveComment = async (comment, userId, postId) => {
  try {
    const response = await SECURE_API.post(
      `api/comments/?userId=${userId}&postId=${postId}`,
      comment
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const uploadImage = async (image, postId) => {
  const formData = new FormData();
  formData.append("image", image);
  try {
    const response = await SECURE_API.post(
      `api/posts/uploadImage/${postId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPostsByCategoryId= async(categoryId) =>{
  try {
     const response=await SECURE_API.get(`api/posts/category/${categoryId}`);
     return response.data;
  } catch (error) {
     throw error;
  }
}

export const getPostsByUserId= async (userId) =>{
  try {
     const response=await SECURE_API.get(`api/posts/user/${userId}`);
     return response.data;
  } catch (error) {
     throw error;
  }
}

export const deletePostById = async (postId) =>{
  try {
    const response=await SECURE_API.delete(`api/posts/${postId}`);
    return response.data;
  } catch (error) {
    throw error
  }
}

export const updatePost=async(post,postId) =>{
  try {
    const response=await SECURE_API.put(`api/posts/${postId}`,post);
    return response.data;
  } catch (error) {
    throw error
  }
} 