// api/pets.ts
import axios from "axios";

const BASE_URL = "https://pets-react-query-backend.eapi.joincoded.com/pets";

export const getPets = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

export const getOnePet = async (id: string) => {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data;
};
