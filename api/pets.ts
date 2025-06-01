import axios from "axios";

const BASE_URL = "https://pets-react-query-backend.eapi.joincoded.com";

export const fetchAllPets = async () => {
  const response = await axios.get(`${BASE_URL}/pets`);
  return response.data;
};

export const fetchPetById = async (id: string) => {
  const response = await axios.get(`${BASE_URL}/pets/${id}`);
  return response.data;
};
