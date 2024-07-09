import axios from 'axios';

export const getAllCars = async () => {
  try {
    const response = await axios.get('https://test.tspb.su/test-task/vehicles');
    const result = await response.data;
    return result;
  } catch (error: any) {
    console.log(error.toJSON());
  }
};
