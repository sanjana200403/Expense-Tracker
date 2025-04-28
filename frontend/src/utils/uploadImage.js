import { default as axios } from "axios";
import { API_PATHS, BASE_URL } from "./apiPath";

export const uploadImage = async (imageFile) => {
  const formData = new FormData(); // Corrected: FormData with capital 'F'
  
  // Append the image file to form data
  formData.append('image', imageFile);

  try {
    const response = await axios.post(BASE_URL+API_PATHS.IMAGE.UPLOAD_IMAGE, formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Corrected Content-Type header
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading the image', error);
    throw error;
  }
};
